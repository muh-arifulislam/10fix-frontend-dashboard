import React, { useState } from "react";
import { Button, Flex, Modal, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import ModalAddUser from "../../component/modal/ModalAddUser";
import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
} from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

interface DataType {
  key: React.Key;
  _id: string;
  email: string;
  role: "admin" | "moderate" | "superAdmin";
  createdAt: string;
}

const UserManagement = () => {
  const user = useAppSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const { data, isLoading, refetch } = useGetAllUsersQuery(undefined);

  const [handleRemoveUser, { isLoading: isMutationLoading }] =
    useRemoveUserMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (render: DataType) => {
        let isDisabled = false;
        if (user?.role === "admin" && render.role === "admin") {
          isDisabled = true;
        }
        if (user?.role === "superAdmin") {
          isDisabled = false;
        }
        return (
          <Space>
            <Button
              disabled={render.role === "superAdmin" || isDisabled}
              type="primary"
              size="small"
              danger
              onClick={async () => {
                Modal.confirm({
                  title: "Confirm!!",
                  content: "Are you sure??",
                  onOk: async () => {
                    await handleRemoveUser(render._id);
                  },
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Remove
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Flex justify="space-between" align="center">
          <h4 style={{ fontSize: "21px" }}>Users</h4>
          <Button size="middle" type="primary" onClick={showModal}>
            Add new User
          </Button>
        </Flex>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await refetch();
            setLoading(false);
          }}
        >
          Reload
        </Button>
      </div>
      <Table
        loading={isLoading || isMutationLoading}
        scroll={{ x: true }}
        columns={columns}
        rowKey={"_id"}
        dataSource={data?.data}
      />
      <ModalAddUser open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserManagement;
