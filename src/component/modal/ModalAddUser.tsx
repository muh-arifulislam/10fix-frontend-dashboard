import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import { useAddUserMutation } from "../../redux/features/user/userApi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

type FieldType = {
  email: string;
  role: "admin" | "moderate";
  authType: "gmail" | "email-password";
  password?: string;
  fullName: string;
};

const ModalAddUser = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [handleAdduser] = useAddUserMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await handleAdduser(values);

    setOpen(false);
  };

  return (
    <Modal
      title="Add New User"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div>
        <Form onFinish={onFinish} autoComplete="off">
          <Row gutter={[15, 15]}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Form.Item<FieldType>
                name="role"
                initialValue="moderate"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { label: "Moderate", value: "moderate" },
                    { label: "Admin", value: "admin" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Form.Item<FieldType>
                name="authType"
                initialValue="email-password"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { label: "Email & Password", value: "email-password" },
                    { label: "Gmail", value: "gmail" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Form.Item<FieldType>
                name="fullName"
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter an full name"
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Form.Item<FieldType>
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="text"
                  name="email"
                  placeholder="Enter an email"
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Form.Item<FieldType>
                shouldUpdate={(prev, curr) => prev.authType !== curr.authType}
                noStyle
              >
                {({ getFieldValue }) => (
                  <Form.Item<FieldType>
                    name="password"
                    rules={[
                      {
                        required:
                          getFieldValue("authType") === "email-password",
                        message: "Password is required",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      name="password"
                      placeholder="Enter a password"
                      disabled={getFieldValue("authType") === "gmail"}
                      visibilityToggle
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }}>
              <Flex justify="end">
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAddUser;

<>
  <Col xs={{ span: 24 }} sm={{ span: 24 }}>
    <Form.Item<FieldType>
      name="email"
      rules={[{ required: true, type: "email" }]}
    >
      <Input type="text" name="email" placeholder="enter a email" />
    </Form.Item>
  </Col>
  <Col xs={{ span: 24 }} sm={{ span: 24 }}>
    <Form.Item<FieldType>
      name="password"
      rules={[{ required: true, type: "string" }]}
    >
      <Input type="password" name="password" placeholder="enter a password" />
    </Form.Item>
  </Col>
  <Col xs={{ span: 24 }} sm={{ span: 24 }}>
    <Form.Item<FieldType>
      name="role"
      initialValue={"moderate"}
      rules={[{ required: true }]}
    >
      <Select
        style={{ width: "100%" }}
        options={[
          { label: "Moderate", value: "moderate" },
          { label: "Admin", value: "admin" },
        ]}
      />
    </Form.Item>
  </Col>
</>;
