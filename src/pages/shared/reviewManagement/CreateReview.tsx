import { Button, Col, Form, Row, Space } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ContextForm from "../../../component/form/ContextForm";
import ContextInput from "../../../component/form/ContextInput";
import ContextTextArea from "../../../component/form/ContextTextArea";
import ContextSelectInput from "../../../component/form/ContextSelectInput";
import { useAddReviewMutation } from "../../../redux/features/review/reviewApi";
import { toast } from "sonner";

const CreateReview = () => {
  const [form] = Form.useForm();

  const [handleAddReivew] = useAddReviewMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      review: data.review,
      ratings: data.ratings,
      name: data.name,
      designation: data.designation,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await handleAddReivew(payload);
    if (result?.data?.success) {
      toast.success("Blog successfully published.");
      form.resetFields();
    } else {
      toast.error("Blog publishing failed. Please try again!");
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
              Add Review
            </h4>
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextTextArea
              style={{ height: "120px" }}
              name="review"
              placeholder="Share your thought about our services."
              label="Review"
              rules={[{ required: true, message: "Review is required!" }]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
          >
            <ContextSelectInput
              name="ratings"
              label="Ratings"
              placeholder="Provide Ratings"
              rules={[{ required: true, message: "Ratings is required!" }]}
              options={[
                {
                  label: "5",
                  value: 5,
                },
                {
                  label: "4",
                  value: 4,
                },
                {
                  label: "3",
                  value: 3,
                },
                {
                  label: "2",
                  value: 2,
                },
                {
                  label: "1",
                  value: 1,
                },
              ]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 12 }}
            md={{ span: 12 }}
          >
            <ContextInput
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name"
              rules={[{ required: true, message: "Name is required!" }]}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            xl={{ span: 12 }}
            md={{ span: 12 }}
          >
            <ContextInput
              type="text"
              name="designation"
              label="Designation"
              placeholder="Enter your designation"
              rules={[{ required: true, message: "Designation is required!" }]}
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
                    Submit Review
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

export default CreateReview;
