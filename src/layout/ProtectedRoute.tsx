import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase.init";
import { Flex, Spin } from "antd";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <>
        <Flex style={{ height: "100vh" }} justify="center" align="center">
          <Spin size="large" />
        </Flex>
      </>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
