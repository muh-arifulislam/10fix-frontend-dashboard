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

const MainLayout: React.FC = () => {
  const [signOut] = useSignOut(auth);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useScreens();

  const [user] = useAuthState(auth);

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
                        backgroundColor: "slategray",
                        color: "white",
                        padding: "10px 50px",
                      },

                      label: "Logout",
                      key: "0",
                      onClick: () => {
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
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
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
