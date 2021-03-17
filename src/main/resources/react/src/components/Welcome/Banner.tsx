import React from "react";
import { useHistory } from "react-router-dom";
import welcomeHeader from "../../assets/welcome-header.jpg";

export const Banner: React.FC = () => {
  const history = useHistory();

  return (
    <div
      className="w-full h-48 flex flex-col items-center justify-evenly mb-4"
      style={{
        backgroundImage: `url(${welcomeHeader})`,
        backgroundSize: "100%",
      }}
    >
      <div className="bg-blue-600 text-white px-4 py-2 font-bold text-2xl">
        Manage with your tasks
      </div>
      <button
        className="px-4 py-2 uppercase border shadow-sm bg-white"
        onClick={() => history.push("/register")}
      >
        register now
      </button>
    </div>
  );
};
