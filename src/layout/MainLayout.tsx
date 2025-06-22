import { Avatar, Button, Dropdown, Flex, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/styles.css";
import { useState } from "react";
const { Header, Content } = Layout;

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useScreens } from "../hooks/useScreens";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase.init";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";

import avatarImg from "../assets/user.png";

const MainLayout: React.FC = () => {
  const [signOut] = useSignOut(auth);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useScreens();

  const user = useAppSelector(selectCurrentUser);

  const [googleUser] = useAuthState(auth);

  const dispatch = useAppDispatch();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: "0" }}>
          <Flex justify="space-between" align="center">
            <Button
              type="text"
              size="middle"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />

            <div style={{ marginRight: screens.xs ? "20px" : "50px" }}>
              <Dropdown
                trigger={["click"]}
                menu={{
                  style: { marginTop: "10px" },
                  items: [
                    {
                      style: {
                        textAlign: "center",
                        backgroundColor: "",
                        color: "",
                        padding: "10px 50px",
                      },
                      label: (
                        <div>
                          <span className="text-white">
                            {user?.fullName ? user?.fullName : "User"}
                          </span>
                          <br />
                          <span className="text-white">
                            {user?.email ? user?.email : "Email"}
                          </span>
                        </div>
                      ),
                      key: "1",
                    },
                    {
                      style: {
                        textAlign: "center",
                        backgroundColor: "slategray",
                        color: "white",
                        padding: "10px 50px",
                      },

                      label: "Logout",
                      key: "0",
                      onClick: () => {
                        dispatch(logout());
                        signOut();
                      },
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar
                    src={
                      <img
                        src={googleUser?.photoURL ?? avatarImg}
                        alt="avatar"
                      />
                    }
                  />
                </a>
              </Dropdown>
            </div>
          </Flex>
        </Header>
        <Content style={{ margin: "", overflowY: "scroll" }}>
          <div
            style={{
              padding: screens.xs ? 10 : 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
