import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";

import {
  UserOutlined,
  PieChartOutlined,
  RiseOutlined,
  CommentOutlined,
  ReadOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const user = useAppSelector(selectCurrentUser);
  const userRole = {
    ADMIN: "admin",
    MODERATE: "moderate",
    SUPERADMIN: "superAdmin",
  };
  let sidebarItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
    },
    {
      key: "reports",
      icon: <RiseOutlined />,
      label: <NavLink to={"/dashboard/statistics"}>Reports</NavLink>,
    },
    {
      key: "1",
      icon: <FileDoneOutlined />,
      label: "Orders",
      children: [
        {
          key: "Orders",
          label: <NavLink to={"/dashboard/orders"}>Orders</NavLink>,
        },
        {
          key: "Drafts",
          label: <NavLink to={"/dashboard/orders/drafts"}>Drafts</NavLink>,
        },
      ],
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <NavLink to={"/dashboard/customers"}>Customers</NavLink>,
    },
    {
      key: "Reviews",
      icon: <CommentOutlined />,
      label: "Reviews",
      children: [
        {
          key: "create-review",
          label: (
            <NavLink to={"/dashboard/reviews/create-review"}>
              Add Review
            </NavLink>
          ),
        },
        {
          key: "manage-reviews",
          label: <NavLink to={"/dashboard/reviews"}>Manage Reviews</NavLink>,
        },
      ],
    },
    {
      key: "Blogs",
      icon: <ReadOutlined />,
      label: "Blogs",
      children: [
        {
          key: "create-blogs",
          label: (
            <NavLink to={"/dashboard/blogs/create-new"}>Create Blog</NavLink>
          ),
        },
        {
          key: "manage-blogs",
          label: <NavLink to={"/dashboard/blogs"}>Manage Blogs</NavLink>,
        },
      ],
    },
  ];
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItems.concat(
        ...[
          {
            key: "Users",
            icon: <UserOutlined />,
            label: <NavLink to={"/dashboard/users"}>Users</NavLink>,
          },
        ]
      );
      break;
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItems.concat(
        ...[
          {
            key: "Users",
            icon: <UserOutlined />,
            label: <NavLink to={"/dashboard/users"}>Users</NavLink>,
          },
        ]
      );
      break;
    case userRole.MODERATE:
      break;
    default:
      break;
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="50"
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4
          style={{
            overflow: "hidden",
            transition: "ease all 0.5s",
            scale: collapsed ? 0 : "1",
          }}
        >
          10fix.com.bd
        </h4>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
