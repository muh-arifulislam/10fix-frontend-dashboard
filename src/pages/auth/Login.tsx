import { Row } from "antd";
import GoogleLogin from "../../component/button/GoogleLogin";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";

const Login = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading) {
      if (user) {
        const toastId = toast.loading(
          "Authentication is ongoing, Please wait!"
        );
        fetch("https://server.10fix.com.bd/api/v1/auth/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.success) {
              toast.success("Login successful", { id: toastId });
              const user = verifyToken(data.data.accessToken);
              dispatch(setUser({ user: user, token: data.data.accessToken }));
              navigate("/dashboard/orders");
            } else {
              await signOut();
              toast.error("You are not authorized!!!", { id: toastId });
            }
          });
      }
    }
  }, [user, loading]);

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
            <GoogleLogin />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <small>Don't have Account? talk to Admin</small>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default Login;
