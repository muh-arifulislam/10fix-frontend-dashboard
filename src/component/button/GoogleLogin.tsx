import { GoogleOutlined, LoginOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { FC } from "react";

type GoogleLoginProps = {
  onSignIn: () => Promise<void> | void;
};

const GoogleLogin: FC<GoogleLoginProps> = ({ onSignIn }) => {
  return (
    <a
      href=""
      onClick={async (e) => {
        e.preventDefault();
        await onSignIn();
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 8px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
        }}
      >
        <Flex align="center" gap={10}>
          <span>
            <GoogleOutlined />
          </span>
          <span>Login with Google</span>
        </Flex>
        <span>
          <LoginOutlined />
        </span>
      </div>
    </a>
  );
};

export default GoogleLogin;
