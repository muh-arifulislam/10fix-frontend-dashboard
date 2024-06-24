import { useState } from "react";
import { Button, Flex, Modal, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllReviewsQuery,
  useRemoveReviewMutation,
  useUpdateReviewMutation,
} from "../../../redux/features/review/reviewApi";
import dayjs from "dayjs";

interface DataType {
  _id: string;
  review: string;
  ratings: string;
  createdAt: string;
  name: string;
  designation?: string;
  isDisabled: boolean;
}

function ManageReviews() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, refetch, isFetching } =
    useGetAllReviewsQuery(undefined);

  const [handleRemoveReview, { isLoading: removeReviewLoading }] =
    useRemoveReviewMutation();

  const [handleUpdateReview, { isLoading: updateReviewLoading }] =
    useUpdateReviewMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Review",
      key: "x",
      width: "40%",
      render: (render: DataType) => (
        <>
          <p>{render.review}</p>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      render: (ratings) => <p>{ratings}</p>,
    },
    {
      title: "Status",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (status) => (
        <Button size="small" type="primary">
          {status === true ? "Disabled" : "Enabled"}
        </Button>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span>{dayjs(date).format("MMM D, YYYY h:mm A")}</span>,
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (render: DataType) => (
        <Space>
          <Button
            type="primary"
            size="small"
            danger
            onClick={async () => {
              Modal.confirm({
                title: "Confirm!!",
                content: "Are you sure??",
                onOk: async () => {
                  const result = await handleRemoveReview(render._id);
                  console.log(result);
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Remove
          </Button>
          <Button
            type="default"
            size="small"
            onClick={async () => {
              Modal.confirm({
                title: "Confirm!!",
                content: "Are you sure??",
                onOk: async () => {
                  await handleUpdateReview({
                    id: render._id,
                    data: { isDisabled: !render.isDisabled },
                  });
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            {render.isDisabled ? "Enable" : "Disable"}
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Flex justify="space-between" align="center">
          <h4 style={{ fontSize: "21px" }}>Reviews</h4>
          <Button
            size="middle"
            type="primary"
            onClick={() => navigate("/dashboard/reviews/create-review")}
          >
            Add new Review
          </Button>
        </Flex>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            refetch();
            setLoading(false);
          }}
        >
          Reload
        </Button>
      </div>
      <Table
        loading={
          isLoading || isFetching || removeReviewLoading || updateReviewLoading
        }
        scroll={{ x: true }}
        columns={columns}
        rowKey={"_id"}
        dataSource={data?.data}
      />
    </div>
  );
}

export default ManageReviews;
