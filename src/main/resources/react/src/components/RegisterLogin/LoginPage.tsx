import React, { useState, useContext } from "react";
import { Checkbox, message } from "antd";
import { LockOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { authApi } from "../../utils/api/api";
import { AuthContext } from "../../App";

export const LoginPage: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginClick = () => {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    authApi
      .authenticate(email, password)
      .then((response) => {
        if (response.status === 200) {
          message.success({ content: "You Signed In!", key });
          window.localStorage.setItem("jwt_token", response.data.jwtToken);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        message.error({ content: "Your credentials are invalid!", key });
      });
  };

  return (
    <div className="w-full flex items-center justify-center mt-8">
      <div className="flex flex-col w-9/12">
        <div className="w-full text-xl border-l-4 pl-4 border-red-400 mb-8">
          Sign In
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
          <span className="mr-4">
            <Checkbox />
          </span>
          <span className="text-gray-400">Remember Me</span>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="px-4 py-2 uppercase text-white bg-blue-600 flex items-center"
            disabled={email.length === 0 || password.length === 0}
            onClick={handleLoginClick}
          >
            <span className="mr-2">login</span>
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
