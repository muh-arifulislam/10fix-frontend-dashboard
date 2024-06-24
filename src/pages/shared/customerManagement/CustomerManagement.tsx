import {
  Button,
  Flex,
  Grid,
  Input,
  Pagination,
  Segmented,
  Space,
  Table,
} from "antd";
import type { PaginationProps, TableColumnsType } from "antd";
import { NavLink } from "react-router-dom";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customerApi";
import { useState } from "react";
import { TCustomer } from "../../../types";
const { Search } = Input;
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";

const columns: TableColumnsType<TCustomer> = [
  {
    title: "Name",
    dataIndex: "",
    key: "x",
    render: (record: TCustomer) => (
      <NavLink
        to={`/dashboard/customers/${record._id}`}
        className={"text-link"}
      >
        {record.fullName.firstName} {record.fullName.lastName}
      </NavLink>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile",
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Location",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <p>
        {address.street}, {address.thana}
      </p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <Button type="primary" size="small" danger={value === "DISABLED"}>
        {value}
      </Button>
    ),
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
    render: (orders) => <p>{orders.length}</p>,
  },
];

const CustomerManagement = () => {
  const [current, setCurrent] = useState(1);
  const [value, setValue] = useState<string | number>("ACTIVE");
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading, isFetching, refetch } = useGetAllCustomersQuery(
    `limit=${limit}&page=${current}&status=${value}&sortBy=${"fullName.firstName"}&sortOrder=${sortOrder}&searchTerm=${searchValue}`
  );
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    if (page) {
      setCurrent(page);
    }
    if (pageSize) {
      setLimit(pageSize);
    }
    refetch();
  };
  const screens = Grid.useBreakpoint();
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
    refetch();
  };
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Flex
          vertical={screens.xs}
          justify="space-between"
          align="center"
          gap="10px"
        >
          <Space>
            <h4 style={{ fontSize: "21px" }}>Customers</h4>
            <Space>
              <div>
                <Segmented
                  options={[
                    { label: "Active", value: "ACTIVE" },
                    { label: "Disabled", value: "DISABLED" },
                  ]}
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    setCurrent(1);
                  }}
                />
              </div>
            </Space>
          </Space>
          <Button
            type="primary"
            onClick={() => {
              refetch();
            }}
          >
            Reload
          </Button>
        </Flex>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <Flex
          vertical={screens.xs}
          justify="space-between"
          align="center"
          gap={"10px"}
        >
          <Search
            size="middle"
            style={{ width: screens.xs ? 260 : 360 }}
            allowClear
            placeholder="input search text"
            onSearch={onSearch}
            enterButton="Search"
          />
          <Space>
            <Button
              onClick={() => {
                setSortOrder("asc");
                refetch();
              }}
              icon={<SortAscendingOutlined />}
            >
              <span
                style={{
                  display: screens.xs ? "none" : "inline",
                }}
              >
                Sort by Ascending
              </span>
            </Button>
            <Button
              onClick={() => {
                setSortOrder("desc");
                refetch();
              }}
              icon={<SortDescendingOutlined />}
            >
              <span
                style={{
                  display: screens.xs ? "none" : "inline",
                }}
              >
                Sort by Descending
              </span>
            </Button>
          </Space>
        </Flex>
      </div>
      <Table
        loading={isLoading || isFetching}
        scroll={{ x: true }}
        rowKey={"_id"}
        columns={columns}
        dataSource={data?.data}
        pagination={false}
      />
      <Flex justify="end">
        <Pagination
          style={{ display: searchValue ? "none" : "block", margin: "10px 0" }}
          total={data?.meta?.total}
          pageSize={data?.meta?.limit}
          onChange={onChange}
          current={current}
          showSizeChanger
        />
      </Flex>
    </div>
  );
};

export default CustomerManagement;
