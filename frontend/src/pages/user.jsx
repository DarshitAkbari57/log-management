import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { GetUsers } from "../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  // Columns for the User Table
  const userColumns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const user = useSelector((state) => state?.User?.users);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">User Table</h1>
      <Table
        columns={userColumns}
        dataSource={user?.data}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default User;
