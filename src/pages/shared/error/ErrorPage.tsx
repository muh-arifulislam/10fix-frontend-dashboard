import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <h1>Oops!</h1>
        <p>Page not found</p>
        <p></p>
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="default"
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
