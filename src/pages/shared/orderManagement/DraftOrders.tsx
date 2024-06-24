import { Button, Flex, Pagination, Table } from "antd";
import type { PaginationProps, TableColumnsType } from "antd";
import { NavLink } from "react-router-dom";
import { useGetDraftOrdersQuery } from "../../../redux/features/order/orderApi";
import { TOrder } from "../../../types";
import dayjs from "dayjs";
import { useState } from "react";

export type TFullName = {
  firstName: string;
  lastName?: string;
};

export type TAddress = {
  thana: string;
  street: string;
};

export interface ICustomer {
  _id: string;
  fullName: TFullName;
  email: string;
  contactNo: string;
  address: TAddress;
  orders: string[];
}

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
    render: (value) => {
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
    title: "Actions",
    dataIndex: "isDeleted",
    render: () => (
      <Button size="small" type="default">
        Deleted
      </Button>
    ),
  },
];

const DraftOrders = () => {
  const [current, setCurrent] = useState(1);
  const { data } = useGetDraftOrdersQuery(`limit=${10}&page=${current}`);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Flex justify="space-between" align="center">
          <h4 style={{ fontSize: "21px" }}>Draft Orders</h4>
        </Flex>
      </div>
      <div style={{ marginBottom: 16 }}></div>
      <Table
        scroll={{ x: true }}
        rowKey={"_id"}
        columns={columns}
        dataSource={data?.data}
        pagination={false}
      />
      <Flex justify="end">
        <Pagination
          style={{ display: "block", margin: "10px 0" }}
          total={data?.meta?.total}
          pageSize={data?.meta?.limit}
          onChange={onChange}
          current={current}
        />
      </Flex>
    </div>
  );
};

export default DraftOrders;
