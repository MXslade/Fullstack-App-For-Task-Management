import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

export const Header: React.FC = () => {
  const history = useHistory();

  const { isAuthenticated, currentUser, setIsAuthenticated } = useContext(
    AuthContext
  );

  const handleLogoutClick = () => {
    window.localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    history.push("/welcome-page");
  };

  return (
    <div
      style={{
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-blue-600"
    >
      <div className="flex w-9/12 items-center justify-between">
        <div style={{ fontSize: "x-large", fontWeight: 500 }}>
          <Link to="/" style={{ color: "white" }}>
            ITrello
          </Link>
        </div>
        {isAuthenticated ? (
          <div>
            <Link
              to="/all-cards"
              style={{ color: "white", marginRight: "1rem" }}
            >
              All Cards
            </Link>
            <Link to="/profile" style={{ color: "white", marginRight: "1rem" }}>
              {currentUser?.fullName}
            </Link>
            <Link
              to="/logout"
              style={{ color: "white" }}
              onClick={handleLogoutClick}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/register"
              style={{ color: "white", marginRight: "1rem" }}
            >
              Register
            </Link>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
