import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);

  // if (loading) {
  //   return (
  //     <>
  //       <Flex style={{ height: "100vh" }} justify="center" align="center">
  //         <Spin size="large" />
  //       </Flex>
  //     </>
  //   );
  // }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
