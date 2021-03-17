import React, { useState } from "react";
import { Checkbox, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { authApi } from "../../utils/api/api";

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleRegisterClick = () => {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    if (password === repeatPassword) {
      authApi
        .register(fullName, email, password)
        .then((response) => {
          if (response.status === 200) {
            message.success({
              content: "New Account created successfully!",
              key,
            });
          }
        })
        .catch((reason) => {
          message.error({ content: "Email is already in use", key });
        });
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="flex flex-col w-9/12">
        <div className="w-full text-xl border-l-4 pl-4 border-red-400 mb-8">
          Create new account
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
        <div className="w-full flex text-white items-center mb-8">
          <MailOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="email"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <LockOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="password"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <LockOutlined className="bg-blue-600 text-lg p-1 mr-4 rounded-full" />
          <input
            type="password"
            className="w-full border-b-2 focus:outline-none focus:border-green-500 text-black"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
          />
        </div>
        <div className="w-full flex text-white items-center mb-8">
          <span className="mr-4">
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </span>
          <span className="text-gray-400">
            I have read and accepted the terms and conditions
          </span>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="px-4 py-2 uppercase text-white bg-blue-600 flex items-center"
            disabled={
              fullName.length === 0 ||
              email.length === 0 ||
              password.length === 0 ||
              repeatPassword.length === 0 ||
              !checked
            }
            onClick={handleRegisterClick}
          >
            <span className="mr-2">register</span>
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
