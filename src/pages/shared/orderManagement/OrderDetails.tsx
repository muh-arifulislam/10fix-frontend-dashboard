import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  Row,
  Space,
  Timeline,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Table } from "antd";
import type { TableProps, TimelineItemProps } from "antd";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetSingleOrderQuery,
  useSentInvoiceMutation,
  useSoftDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { TOrder } from "../../../types";
import { toast } from "sonner";
import dayjs from "dayjs";

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<undefined | TOrder>(undefined);

  const {
    data: orderData,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetSingleOrderQuery(id as string);

  const [handleUpdateOrderStatus] = useUpdateOrderStatusMutation();

  const [hanldeSoftDeleteOrder] = useSoftDeleteOrderMutation();

  const [handleSentInvoice] = useSentInvoiceMutation();

  useEffect(() => {
    if (orderData?.data) {
      setData(orderData.data);
    }
  }, [isSuccess, isLoading, isFetching, orderData]);

  const style: React.CSSProperties = {
    background: "#fff",
    padding: "20px 15px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  const items: MenuProps["items"] = [
    {
      label: "Update Status",
      disabled:
        data?.status === "completed" || data?.isDeleted === true ? true : false,
      key: "1",
      onClick: async () => {
        const toastId = toast.loading("updating order status");
        if (data?.orderId) {
          const res = await handleUpdateOrderStatus(data.orderId);
          if ("data" in res) {
            if (res?.data?.success) {
              toast.success("Order status successfully updated", {
                id: toastId,
              });
              refetch();
            }
          } else {
            toast.error("Updating order status failed.", { id: toastId });
          }
        } else {
          toast.error("Updating order status failed.", { id: toastId });
        }
      },
    },
    {
      label: "Sent Invoice",
      disabled: data?.isDeleted || data?.status !== "completed",
      key: "3",
      onClick: async () => {
        if (data?.orderId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res: any = await handleSentInvoice(data?.orderId);
          if (res?.data?.success) {
            toast.success("Invoice sent successfully.");
          } else {
            toast.error("Invoice sent failed.");
          }
        }
      },
    },
    {
      label: "Delete Order",
      danger: true,
      key: "2",
      disabled: data?.status === "completed" || data?.isDeleted,
      onClick: async () => {
        if (data?.orderId) {
          Modal.confirm({
            title: "Confirm!!",
            content: "Are you sure??",
            onOk: async () => {
              const res = await hanldeSoftDeleteOrder(data.orderId);
              if ("data" in res) {
                if (res?.data?.success) {
                  refetch();
                }
              } else {
                toast.error("Updating order status failed.");
              }
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
  ];

  const menuProps = {
    items,
  };
  interface DataType {
    name: string;
    id: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Service",
      dataIndex: "name",
      key: "name",
      width: "80%",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "20%",
    },
  ];

  const copyEmail = (email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast("Email Copied.");
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  if (!data?.customer) {
    return <div>There is No Data to show</div>;
  }

  const timeLineItems: TimelineItemProps[] = [
    {
      children: `Order placed at ${dayjs(data?.createdAt).format(
        "DD-MM-YYYY, h:mm A"
      )}`,
    },
  ];

  if (data?.status == "received") {
    timeLineItems.push({
      children: `Order received at ${dayjs(
        data?.ordersTimeLine?.receivedAt
      ).format("DD-MM-YYYY, h:mm A")}`,
    });
  }
  if (data?.status == "completed") {
    timeLineItems.push({
      children: `Order received at ${dayjs(
        data?.ordersTimeLine?.receivedAt
      ).format("DD-MM-YYYY, h:mm A")}`,
    });
    timeLineItems.push({
      children: `Order completed at ${dayjs(
        data?.ordersTimeLine?.completedAt
      ).format("DD-MM-YYYY, h:mm A")}`,
    });
  }
  if (data?.isDeleted) {
    timeLineItems.push({
      style: { color: "red" },
      children: `Order deleted at ${dayjs(data?.deletedAt).format(
        "DD-MM-YYYY, h:mm A"
      )}`,
    });
  }
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Breadcrumb
          items={[
            {
              title: "Dashboard",
            },
            {
              title: <NavLink to="/dashboard/orders">Orders</NavLink>,
            },
            {
              title: (
                <NavLink to={`/dashboard/customers/${data.customerId}`}>
                  {data?.customer?.fullName}
                </NavLink>
              ),
            },
          ]}
        />
      </div>
      <Flex
        justify="space-between"
        align="start"
        style={{ marginBottom: "50px" }}
      >
        <Flex gap={10} align="start">
          <div>
            <h4 style={{ fontSize: "20px" }}>#{data?.orderId}</h4>
            <p>
              {data?.shippingAddress?.street}, {data?.shippingAddress?.thana}
            </p>
          </div>
        </Flex>
        <div>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                More Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Flex>
      <Flex align="center" gap={"20px"} style={{ marginBottom: "12px" }}>
        <h5 style={{ fontSize: "16px" }}>Order Status:</h5>
        {data?.isDeleted ? (
          <Button size="middle" danger={true} type="primary">
            Deleted
          </Button>
        ) : (
          <Button size="middle">{data?.status}</Button>
        )}
      </Flex>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "15px" }}
          xs={{ span: 24 }}
          sm={{ span: 16 }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ padding: "14px" }}>
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h6 style={{ fontSize: "16px" }}>Services</h6>
              </div>
              <Table
                loading={isLoading}
                columns={columns}
                rowKey={"id"}
                dataSource={data?.orderedServices}
                pagination={false}
              />
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <div style={{ padding: "14px" }}>
              <h6 style={{ fontSize: "16px", marginBottom: "20px" }}>
                Payment
              </h6>
              <div
                style={{
                  border: "1px solid #bbb",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <Row>
                  <Col span={8}>
                    <span>Subtotal</span>
                  </Col>
                  <Col span={8}>
                    <span>
                      {orderData?.data?.orderedServices.length ?? "N/A"}
                    </span>
                  </Col>
                  <Col
                    span={8}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <span>N/A</span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 8 }}>
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
                <p>{data?.customer?.email}</p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 5px",
                    border: "1px solid gray",
                    borderRadius: "2px",
                    cursor: "pointer",
                    font: "semi-bold",
                  }}
                  onClick={() => {
                    copyEmail(data.customer!.email);
                  }}
                >
                  copy
                </span>
              </div>
              <p>+880 {data.customer.contactNo.slice(1)}</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "12px", fontWeight: "500" }}>
                Shipping Address
              </p>
              <p> {data?.shippingAddress?.street},</p>
              <p> {data?.shippingAddress?.thana}</p>
            </div>
          </div>
          <div style={style}>
            <Timeline items={timeLineItems}></Timeline>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;
