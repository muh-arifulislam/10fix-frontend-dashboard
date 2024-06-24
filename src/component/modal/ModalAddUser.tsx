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

type FieldType = {
  email: string;
  role: "admin" | "moderate";
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
    console.log(values);

    const result = await handleAdduser(values);
    console.log(result);
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
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <Form.Item<FieldType>
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input type="text" name="email" placeholder="enter a email" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 8 }}>
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
