import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Flex,
  Grid,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import type { PaginationProps, TableColumnsType } from "antd";
import { Segmented } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { TOrder, TOrderStatus } from "../../../types";
import dayjs from "dayjs";
import {
  useGetOrdersQuery,
  useSoftDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/orderApi";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

const ManageOrders = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const [value, setValue] = useState<string | number>("pending");

  const [handleUpdateOrderStatus, { isLoading: isUpdateStatusLoading }] =
    useUpdateOrderStatusMutation();

  const [hanldeSoftDeleteOrder] = useSoftDeleteOrderMutation();

  const columns: TableColumnsType<TOrder> = [
    {
      title: "Order ID",
      dataIndex: "orderId",

      render: (value: string) => (
        <>
          <NavLink className={"text-link"} to={`/dashboard/orders/${value}`}>
            #{value}
          </NavLink>
        </>
      ),
    },
    {
      title: "Customer",
      dataIndex: "",
      render: (record: TOrder) => (
        <>
          <NavLink
            className={"text-link"}
            to={`/dashboard/customers/${record.customerId}`}
          >
            {record.customerFullName}
          </NavLink>
        </>
      ),
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD")}</>,
    },
    {
      title: "Sevice Date",
      dataIndex: "dateOfService",
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD")}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: TOrderStatus) => {
        let style: React.CSSProperties = {
          borderColor: "orange",
          color: "orange",
        };
        if (value === "received") {
          style = { borderColor: "blue", color: "blue" };
        } else if (value === "completed") {
          style = { borderColor: "green", color: "green" };
        }

        return (
          <>
            <Button size="small" type="default" style={style}>
              {value}
            </Button>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      render: (order: TOrder) => (
        <>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: "Update Status",
                  disabled: order.status === "completed" ? true : false,
                  key: "1",
                  onClick: () => {
                    handleUpdateOrderStatus(order.orderId);
                  },
                },
                {
                  style: { textAlign: "center" },
                  label: "Delete",
                  disabled: order.status === "completed",
                  danger: true,
                  key: "2",
                  onClick: async () => {
                    if (order?.orderId) {
                      Modal.confirm({
                        title: "Confirm!!",
                        content: "Are you sure??",
                        onOk: async () => {
                          await hanldeSoftDeleteOrder(order.orderId);
                        },
                        footer: (_, { OkBtn, CancelBtn }) => (
                          <>
                            <CancelBtn />
                            <OkBtn />
                          </>
                        ),
                      });
                    }
                  },
                },
              ],
            }}
          >
            <Button>
              <Space>
                More
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  const screens = Grid.useBreakpoint();
  const [current, setCurrent] = useState(1);
  const [limit] = useState(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    data: orderData,
    isLoading,
    isFetching,
    refetch,
  } = useGetOrdersQuery(
    `status=${value}&limit=${limit}&page=${current}&searchTerm=${searchValue}`
  );

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
    refetch();
  };
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Segmented
          style={{ display: screens.xs ? "none" : "block" }}
          options={[
            { label: "All Orders", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Received", value: "received" },
            { label: "Completed", value: "completed" },
          ]}
          value={value}
          onChange={(value) => {
            setValue(value);
            setCurrent(1);
          }}
        />
        <div>
          <Select
            defaultValue="pending"
            style={{ width: 120, display: screens.xs ? "block" : "none" }}
            options={[
              { label: "All Orders", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Received", value: "received" },
              { label: "Completed", value: "completed" },
            ]}
          />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Flex justify="space-between" align="center" gap={"10px"}>
          <Search
            // addonBefore={
            //   <Select
            //     defaultValue="orderId"
            //     style={{ width: screens.xs ? 60 : 120 }}
            //     size="large"
            //     onChange={(value) => {
            //       setSearchTerm(value);
            //     }}
            //     options={[
            //       { value: "orderId", label: "Order ID" },
            //       { value: "contactNo", label: "Contact No." },
            //       { value: "email", label: "Email" },
            //     ]}
            //   />
            // }
            size="middle"
            style={{ width: screens.xs ? 260 : 360 }}
            allowClear
            placeholder="input search text"
            onSearch={onSearch}
            enterButton="Search"
          />

          {/* <Input
            prefix={<SearchOutlined />}
            addonBefore="https://"
            allowClear
            name="search"
            style={{ maxWidth: "160px" }}
          /> */}
          <div>
            <div>
              <span
                style={{
                  marginRight: 8,
                  display: screens.xs ? "none" : "inline",
                }}
              >
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span>
              <Button type="primary" disabled={!hasSelected} danger>
                Delete
              </Button>
            </div>
          </div>
        </Flex>
        <div style={{ margin: "5px auto" }}>
          <span
            style={{
              marginRight: 8,
              display: screens.xs ? "inline" : "none",
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            refetch();
          }}
        >
          Reload
        </Button>
      </div>
      <Table
        loading={isLoading || isFetching || isUpdateStatusLoading}
        scroll={{ x: true }}
        rowKey={"orderId"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={orderData?.data}
        pagination={false}
      />
      <Flex justify="end">
        <Pagination
          style={{ display: searchValue ? "none" : "block", margin: "10px 0" }}
          total={orderData?.meta?.total}
          pageSize={orderData?.meta?.limit}
          onChange={onChange}
          current={current}
        />
      </Flex>
    </div>
  );
};

export default ManageOrders;
