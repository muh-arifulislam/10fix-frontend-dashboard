import { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import type { PaginationProps, TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllBlogsQuery,
  useRemoveBlogMutation,
} from "../../../redux/features/blog/blogApi";
import dayjs from "dayjs";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

interface DataType {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  tags: string[];
}

const ManageBlogs = () => {
  const [current, setCurrent] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, refetch, isFetching } = useGetAllBlogsQuery(
    `page=${current}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );

  const onChange: PaginationProps["onChange"] = async (page, pageSize) => {
    if (pageSize) {
      setLimit(pageSize);
    }
    if (page) {
      setCurrent(page);
    }
    refetch();
  };

  const [handleRemoveBlog, { isLoading: removeBlogIsLoading }] =
    useRemoveBlogMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      key: "x",
      width: "40%",
      render: (render: DataType) => (
        <>
          <a
            className={"text-link"}
            target="_blank"
            href={`https://10fix.com.bd/blogs/${render._id}`}
          >
            {render.title}
          </a>
        </>
      ),
    },

    {
      title: "Published At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (date) => <span>{dayjs(date).format("MMM D, YYYY h:mm A")}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (data) => (
        <Space>
          <Button size="small">{data}</Button>
        </Space>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <Space>
          {tags.map((tag: string, idx: number) => (
            <Button key={idx} size="small">
              {tag}
            </Button>
          ))}
        </Space>
      ),
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
                  const result = await handleRemoveBlog(render._id);
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
            type="primary"
            size="small"
            onClick={async () => {
              navigate(`/dashboard/blogs/edit/${render?._id}`);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleChange = (value: string) => {
    console.log(value);
    setSortBy(value);
    refetch();
  };

  const screens = Grid.useBreakpoint();
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Flex justify="space-between" align="center">
          <h4 style={{ fontSize: "21px" }}>Blogs</h4>
          <Space>
            <Button
              size="middle"
              type="primary"
              onClick={() => navigate("/dashboard/blogs/create-new")}
            >
              Add new Blog
            </Button>
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
          </Space>
        </Flex>
      </div>
      <Flex
        vertical={screens.xs}
        gap={16}
        justify="space-between"
        align="center"
        style={{ marginBottom: 16 }}
      >
        <Space>
          <Select
            defaultValue="Sorting by"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "title", label: "Name" },
              { value: "createdAt", label: "Date" },
            ]}
          />
        </Space>
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
      <Table
        loading={isLoading || isFetching || removeBlogIsLoading}
        scroll={{ x: true }}
        columns={columns}
        rowKey={"_id"}
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
          showSizeChanger
        />
      </Flex>
    </div>
  );
};

export default ManageBlogs;
