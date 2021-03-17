import React, { useState, useContext } from "react";
import {
  EditOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../App";
import { message } from "antd";
import { authApi } from "../../utils/api/api";

export const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [fullName, setFullName] = useState<string>(
    currentUser ? currentUser.fullName : ""
  );
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const handleUpdateProfileClick = () => {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    if (currentUser) {
      authApi
        .updateProfileData(currentUser.email, fullName)
        .then((response) => {
          if (response.status === 200) {
            message.success({ content: "Profile Data Updated!", key });
            setCurrentUser(response.data);
          }
        })
        .catch((error) => {
          message.error({ content: "Error!", key });
          setFullName(currentUser.fullName);
        });
    } else {
      message.error({ content: "You Are Not Authenticated!", key });
    }
  };

  const handleUpdatePasswordClick = () => {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    if (currentUser) {
      authApi
        .updatePassword(currentUser.email, oldPassword, newPassword)
        .then((response) => {
          if (response.status === 200) {
            message.success({ content: "Password Updated!", key });
          }
        })
        .catch((error) => {
          message.error({ content: "Error!", key });
        });
    } else {
      message.error({ content: "You Are Not Authenticated!", key });
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="flex flex-col w-9/12 mb-16">
        <div className="w-full text-xl border-l-4 pl-4 border-red-400 mb-8">
          Update Profile Data
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <MailOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="email"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Email"
            value={currentUser?.email}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <UserOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="text"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Full Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div className="w-full flex justify-end mb-24">
          <button
            className="px-4 py-2 uppercase text-white bg-blue-600 flex items-center"
            disabled={
              fullName === currentUser?.fullName || fullName.length === 0
            }
            onClick={handleUpdateProfileClick}
          >
            <span className="mr-2">update profile</span>
            <EditOutlined />
          </button>
        </div>

        <div className="w-full text-xl border-l-4 pl-4 border-red-400 mb-8">
          Update Password
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <LockOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="password"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <LockOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="password"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <LockOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="password"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Repeat new Password"
            value={repeatNewPassword}
            onChange={(event) => setRepeatNewPassword(event.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            className="px-4 py-2 uppercase text-white bg-blue-600 flex items-center"
            disabled={
              oldPassword.length === 0 ||
              newPassword.length === 0 ||
              repeatNewPassword.length === 0 ||
              newPassword !== repeatNewPassword
            }
            onClick={handleUpdatePasswordClick}
          >
            <span className="mr-2">update password</span>
            <EditOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
