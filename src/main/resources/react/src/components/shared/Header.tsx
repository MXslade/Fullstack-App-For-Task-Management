import React from "react";
import { Link } from "react-router-dom";
import { blue } from "@ant-design/colors";

export const Header: React.FC = () => {
  return (
    <div
      className="px-96"
      style={{
        backgroundColor: blue[6],
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: "x-large", fontWeight: 500 }}>
        <Link to="/" style={{ color: "white" }}>
          ITrello
        </Link>
      </div>
      <div>
        <Link to="/all-cards" style={{ color: "white", marginRight: "1rem" }}>
          All Cards
        </Link>
        <Link to="/register" style={{ color: "white", marginRight: "1rem" }}>
          Register
        </Link>
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      </div>
    </div>
  );
};
