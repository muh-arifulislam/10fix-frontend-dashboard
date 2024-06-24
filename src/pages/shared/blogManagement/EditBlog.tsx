import { Button, Col, Form, Row, Space } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ContextForm from "../../../component/form/ContextForm";
import ContextInput from "../../../component/form/ContextInput";
import ContextTextArea from "../../../component/form/ContextTextArea";
import ContextSelectInput from "../../../component/form/ContextSelectInput";
import { useEffect } from "react";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blog/blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(blogId as string, {
    refetchOnMountOrArgChange: true,
  });
  const [handleUpdateBlog] = useUpdateBlogMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        title: data?.data?.title,
        description: data?.data?.description,
        category: data?.data?.category,
        tags: data?.data?.tags.toString(", "),
      });
    }
  }, [form, isLoading, data]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Blog is updating");
    data.tags = (data.tags as string).split(",").map((item) => item.trim());

    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await handleUpdateBlog({
      payload,
      id: blogId as string,
    });
    if (result?.data?.success) {
      form.resetFields();
      toast.success("Blog successfully updated!!", { id: toastId });
      navigate("/dashboard/blogs");
    } else {
      toast.error("Blog update failed!!!", { id: toastId });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        maxWidth: "670px",
        margin: "auto auto",
      }}
    >
      <ContextForm
        onSubmit={onSubmit}
        variant="filled"
        layout="horizontal"
        form={form}
        defaultValues={{
          title: data?.data?.title,
          description: data?.data?.description,
          category: data?.data?.category,
          tags: data?.data?.tags.toString(", "),
        }}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
          style={{ padding: "20px 20px 0px 20px" }}
        >
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <h4 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
              Create New Blog
            </h4>
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextInput
              type="text"
              name="title"
              label="Post Title"
              placeholder="Enter a title"
              rules={[{ required: true, message: "Post title is required!" }]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextTextArea
              name="description"
              placeholder="Enter a description"
              label="Blog Content"
              rules={[
                { required: true, message: "Post description is required!" },
              ]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextSelectInput
              name="category"
              label="Post Category"
              placeholder="Select a Blog Category"
              rules={[{ required: true, message: "Book Format is required!" }]}
              options={[
                {
                  label: "Technology",
                  value: "technology",
                },
                {
                  label: "Business",
                  value: "business",
                },
                {
                  label: "Lifestyle",
                  value: "lifestyle",
                },
                {
                  label: "Travel",
                  value: "travel",
                },
                {
                  label: "Creativity",
                  value: "creativity",
                },
                {
                  label: "Fashion",
                  value: "fashion",
                },
                {
                  label: "Health",
                  value: "health",
                },
                {
                  label: "Other",
                  value: "other",
                },
              ]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextInput
              type="text"
              name="tags"
              label="Post Tags"
              placeholder="Enter post tags (seperated by commas)"
              rules={[{ required: true, message: "Post tag is required!" }]}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
          style={{ padding: "20px 20px 0px 20px" }}
        >
          <Col className="gutter-row" span={24}>
            <div>
              <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                <Space>
                  <Button size="middle" type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Space>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </ContextForm>
    </div>
  );
};

export default EditBlog;
