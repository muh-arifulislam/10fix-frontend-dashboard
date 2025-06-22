import {
  Button,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  Pagination,
  PaginationProps,
  Row,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { DownOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetCustomerOrdersQuery,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "../../../redux/features/customer/customerApi";
import CopyToClipboard from "../../../component/ui/CopyToClipboard";
import { useState } from "react";
import { TCustomerStatus } from "../../../types";
import dayjs from "dayjs";

export type TFullName = {
  firstName: string;
  lastName?: string;
};

export type TAddress = {
  thana: string;
  street: string;
};

interface DataType {
  _id: string;
  orderId: string;
  fullName: TFullName;
  email: string;
  contactNo: string;
  address: TAddress;
  orders: string[];
  status: string;
  isDeleted: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    render: (orderId: string) => (
      <NavLink className={"text-link"} to={`/dashboard/orders/${orderId}`}>
        #{orderId}
      </NavLink>
    ),
  },
  {
    title: "Service Date",
    dataIndex: "dateOfService",
    render: (data) => <>{dayjs(data).format("YYYY-MM-DD")}</>,
  },
  {
    title: "Order Amount",
    dataIndex: "orderAmount",
    render: () => <>N/A</>,
  },
  {
    title: "Status",
    dataIndex: "",
    key: "status",
    width: 120,

    render: (record: DataType) => (
      <Button size="small" type="default" danger={record.isDeleted}>
        {record.isDeleted ? "Drafted" : record.status}
      </Button>
    ),
  },
];

const CustomerDetails = () => {
  const { id } = useParams();
  const { data, refetch } = useGetSingleCustomerQuery(id!);

  const [handleUpdateCustomer] = useUpdateCustomerMutation();

  //pagination
  const [current, setCurrent] = useState(1);
  const [limit] = useState(10);
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const { data: customerOrdersData } = useGetCustomerOrdersQuery(
    `${id}?limit=${limit}&page=${current}`
  );

  const style: React.CSSProperties = {
    background: "#fff",
    padding: "20px 15px",
    borderRadius: "10px",
  };

  const items: MenuProps["items"] = [
    {
      label:
        data?.data?.status === "DISABLED"
          ? "Enable Customer"
          : "Disable Customer",
      disabled: data?.data?.status === "DELETED",
      key: "1",
      onClick: async () => {
        let status: TCustomerStatus = "ACTIVE";
        if (data?.data?.status === "ACTIVE") {
          status = "DISABLED";
        }

        const result = await handleUpdateCustomer({
          id: data.data._id,
          data: {
            status,
          },
        });
        if ("data" in result) {
          if (result.data.success) {
            refetch();
          }
        }
      },
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div>
      <Flex
        justify="space-between"
        align="start"
        style={{ marginBottom: "50px" }}
      >
        <Flex gap={10} align="start">
          <NavLink to={"/dashboard/customers"}>
            <Button type="text">
              <ArrowLeftOutlined />
            </Button>
          </NavLink>
          <div>
            <h4 style={{ fontSize: "20px" }}>
              {data?.data?.fullName?.firstName} {data?.data?.fullName?.lastName}
            </h4>
            <p>
              {data?.data?.address?.street}, {data?.data?.address?.thana}
            </p>
          </div>
        </Flex>
        <div>
          <Dropdown trigger={["click"]} menu={menuProps}>
            <Button>
              <Space>
                More Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Flex>
      {data?.data?.status === "DELETED" && (
        <Flex justify="center" style={{ margin: "10px 0" }}>
          <h6 style={{ fontSize: "24px", color: "red" }}>
            Customer has been deleted!
          </h6>
        </Flex>
      )}
      {data?.data?.status === "DISABLED" && (
        <Flex justify="center" style={{ margin: "10px 0" }}>
          <h6 style={{ fontSize: "24px", color: "red" }}>
            Customer has been disaled!
          </h6>
        </Flex>
      )}
      <Row gutter={[20, 20]}>
        <Col className="gutter-row" xs={{ span: 24 }} xl={{ span: 16 }}>
          <div style={style}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary">Reload</Button>
            </div>
            <Table
              columns={columns}
              rowKey={"_id"}
              dataSource={customerOrdersData?.data}
              scroll={{ x: true }}
              pagination={false}
            />
            <Flex justify="end">
              <Pagination
                style={{ display: "block", margin: "10px 0" }}
                total={customerOrdersData?.meta?.total}
                pageSize={customerOrdersData?.meta?.limit}
                onChange={onChange}
                current={current}
              />
            </Flex>
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} xl={{ span: 8 }}>
          <div style={style}>
            <h5 style={{ marginBottom: "20px" }}>Customer</h5>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "12px" }}>Contact Information</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p>{data?.data?.email}</p>
                <CopyToClipboard value={data?.data?.email} />
              </div>
              <p>+880 {data?.data?.contactNo}</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "12px" }}>Default Address</p>

              <p>
                {data?.data?.fullName?.firstName}{" "}
                {data?.data?.fullName?.lastName}
              </p>
              <p>{data?.data?.address?.street}</p>
              <p>{data?.data?.address?.thana}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDetails;
