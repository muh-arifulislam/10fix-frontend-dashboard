import { Row } from "antd";
import GoogleLogin from "../../component/button/GoogleLogin";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import {
  useLoginWithEmailPasswordMutation,
  useLoginWithGmailMutation,
} from "../../redux/features/auth/authApi";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [loginWithEmailPassword] = useLoginWithEmailPasswordMutation();
  const [loginWithGmail] = useLoginWithGmailMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailPasswordLogin = async (data: {
    email: string;
    password: string;
  }) => {
    const toastId = toast.loading("Authentication is ongoing, Please wait!");
    try {
      const res = await loginWithEmailPassword(data);

      if ("data" in res && res.data?.data?.accessToken) {
        const userData = verifyToken(res.data.data.accessToken);
        if (!userData) {
          throw new Error("Invalid token");
        }

        dispatch(setUser({ user: userData, token: res.data.data.accessToken }));
        toast.success("Login successful", { id: toastId });
        navigate("/dashboard/orders");
      } else if ("error" in res) {
        throw new Error("Login failed");
      } else {
        throw new Error("Login failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message ?? "Login failed", { id: toastId });
    }
  };

  const handleGmailLogin = async () => {
    const toastId = toast.loading("Authentication is ongoing, Please wait!");

    try {
      const result = await signInWithGoogle();
      if (!result) {
        throw new Error("Google sign-in failed");
      }

      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await loginWithGmail({ token: idToken });

      if ("data" in res && res.data?.data?.accessToken) {
        const userData = verifyToken(res.data.data.accessToken);
        if (!userData) {
          throw new Error("Invalid token");
        }

        dispatch(setUser({ user: userData, token: res.data.data.accessToken }));
        toast.success("Login successful", { id: toastId });
        navigate("/dashboard/orders");
      } else if ("error" in res) {
        throw new Error("Login failed");
      } else {
        throw new Error("Login failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message ?? "Login failed", { id: toastId });
    }
  };

  return (
    <Row
      className="login-section"
      justify={"center"}
      align={"middle"}
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      <div className="color"></div>
      <div className="color"></div>
      <div style={{ margin: "15px" }}>
        <div className="container">
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "40px" }}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
            />
          </div>
          <h3 style={{ margin: "30px" }}>Login to Your Account</h3>
          <div>
            <GoogleLogin onSignIn={handleGmailLogin} />
            <Divider>Or</Divider>

            <div>
              <Form
                name="login"
                layout="vertical"
                style={{ maxWidth: 300, margin: "0 auto", marginTop: 24 }}
                onFinish={(values) => {
                  handleEmailPasswordLogin(values);
                }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    Log in
                  </Button>
                  Or <small>Don't have Account? talk to Admin</small>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default Login;
