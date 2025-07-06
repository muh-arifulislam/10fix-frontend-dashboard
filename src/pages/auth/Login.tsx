/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Flex, Form, Input, Button, Divider } from "antd";
import GoogleLogin from "../../component/button/GoogleLogin";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import {
  useLoginWithEmailPasswordMutation,
  useLoginWithGmailMutation,
} from "../../redux/features/auth/authApi";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

const demoCredentials = {
  admin: {
    email: "admin@gmail.com",
    password: "admin",
  },
  moderate: {
    email: "moderate@gmail.com",
    password: "moderate",
  },
};

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
        if (!userData) throw new Error("Invalid token");
        dispatch(setUser({ user: userData, token: res.data.data.accessToken }));
        toast.success("Login successful", { id: toastId });
        navigate("/dashboard/orders");
      } else throw new Error("Login failed");
    } catch (error: any) {
      toast.error(error?.message ?? "Login failed", { id: toastId });
    }
  };

  const handleGmailLogin = async () => {
    const toastId = toast.loading("Authentication is ongoing, Please wait!");
    try {
      const result = await signInWithGoogle();
      if (!result) throw new Error("Google sign-in failed");

      const idToken = await result.user.getIdToken();
      const res = await loginWithGmail({ token: idToken });

      if ("data" in res && res.data?.data?.accessToken) {
        const userData = verifyToken(res.data.data.accessToken);
        if (!userData) throw new Error("Invalid token");

        dispatch(setUser({ user: userData, token: res.data.data.accessToken }));
        toast.success("Login successful", { id: toastId });
        navigate("/dashboard/orders");
      } else throw new Error("Login failed");
    } catch (error: any) {
      toast.error(error?.message ?? "Login failed", { id: toastId });
    }
  };

  return (
    <div className="login-section">
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          padding: "2rem 1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Col xs={24} sm={18} md={12} lg={8} xl={6}>
          <div className="login-card">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100%", maxWidth: "120px" }}
              />
            </div>

            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Login to Your Account
            </h3>

            <GoogleLogin onSignIn={handleGmailLogin} />

            <Divider style={{ margin: "1rem 0" }}>Or</Divider>

            <Form
              name="login"
              layout="vertical"
              onFinish={handleEmailPasswordLogin}
              style={{ marginTop: 16 }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Email" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Log in
                </Button>
                <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
                  <small>
                    Don’t have an account?{" "}
                    <span className="text-link">Talk to Admin</span>
                  </small>
                </div>
              </Form.Item>
            </Form>

            <Divider>
              <small>Try with Demo Credentials</small>
            </Divider>

            <Flex gap={10} vertical>
              <Button
                block
                onClick={() => handleEmailPasswordLogin(demoCredentials.admin)}
              >
                Demo Admin Login
              </Button>
              <Button
                block
                onClick={() =>
                  handleEmailPasswordLogin(demoCredentials.moderate)
                }
              >
                Demo Moderate Login
              </Button>
            </Flex>
          </div>
        </Col>
      </Row>

      {/* Background Blur Bubbles */}
      <div className="color color-1"></div>
      <div className="color color-2"></div>
    </div>
  );
};

export default Login;
