import React from "react";
import {
  CheckOutlined,
  ClockCircleOutlined,
  CloudUploadOutlined,
  FolderOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

export const SellingPoints: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between border p-2">
        <div className="flex items-center text-white">
          <ClockCircleOutlined className="bg-blue-400 p-3 rounded-full mr-2" />
          <div className="flex flex-col text-black">
            <span>Quick Access</span>
            <span className="text-sm">Fast and easy</span>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <CheckOutlined />
        </div>
      </div>
      <div className="flex items-center justify-between border p-2">
        <div className="flex items-center text-white">
          <FolderOutlined className="bg-purple-500 p-3 rounded-full mr-2" />
          <div className="flex flex-col text-black">
            <span>Great Management</span>
            <span className="text-sm">Grouping your tasks</span>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <CheckOutlined />
        </div>
      </div>
      <div className="flex items-center justify-between border p-2">
        <div className="flex items-center text-white">
          <LineChartOutlined className="bg-green-400 p-3 rounded-full mr-2" />
          <div className="flex flex-col text-black">
            <span>Statistics</span>
            <span className="text-sm">Monitoring with your success</span>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <CheckOutlined />
        </div>
      </div>
      <div className="flex items-center justify-between border p-2">
        <div className="flex items-center text-white">
          <CloudUploadOutlined className="bg-red-400 p-3 rounded-full mr-2" />
          <div className="flex flex-col text-black">
            <span>Cloud Service</span>
            <span className="text-sm">Store your data in cloud</span>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <CheckOutlined />
        </div>
      </div>
    </div>
  );
};
