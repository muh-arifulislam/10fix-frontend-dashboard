import { Button, Col, Form, Input, Row, Space } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import ContextForm from "../../../component/form/ContextForm";
import ContextInput from "../../../component/form/ContextInput";
import ContextTextArea from "../../../component/form/ContextTextArea";
import ContextSelectInput from "../../../component/form/ContextSelectInput";
import { useAddBlogMutation } from "../../../redux/features/blog/blogApi";
import { toast } from "sonner";

const CreateBlog = () => {
  const [handleAddBlog] = useAddBlogMutation(undefined);
  const [form] = Form.useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Blog is posting");
    data.tags = (data.tags as string).split(",").map((item) => item.trim());

    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      image: null,
    };
    const formData = new FormData();
    formData.append("image", data.image);
    // https://server.10fix.com.bd/upload

    const res = await fetch("https://server.10fix.com.bd/upload", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (result?.success) {
      payload.image = result?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blogResult: any = await handleAddBlog(payload);
      if (blogResult?.data?.success) {
        toast.success("Blog successfully published.", { id: toastId });
        form.resetFields();
      } else {
        toast.error("Blog publishing failed. Please try again!", {
          id: toastId,
        });
      }
    } else {
      toast.error("Blog publishing failed. Please try again!", { id: toastId });
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
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <Controller
              name="image"
              render={({ field: { onChange, value, ...fields } }) => (
                <Form.Item
                  labelCol={{ span: 24, style: { textAlign: "start" } }}
                  wrapperCol={{ span: 24 }}
                  label="Blog Image (1024*536)"
                  name="image"
                  rules={[{ required: true, message: "Image is required!" }]}
                >
                  <Input
                    value={value?.fileName}
                    {...fields}
                    onChange={(e) => onChange(e.target.files?.[0])}
                    style={{ borderRadius: "0" }}
                    type="file"
                  />
                </Form.Item>
              )}
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
                  <Button htmlType="reset">Reset</Button>
                  <Button size="middle" type="primary" htmlType="submit">
                    Publish Blog
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

export default CreateBlog;
