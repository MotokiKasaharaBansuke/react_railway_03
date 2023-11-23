import React from "react";
import { useUser } from "../../services/useUserContext";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../services/useTokenContext";
import "./Header.scss";

export const Header = () => {
  const { user } = useUser();
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signin");
  };
  return (
    <div className="header">
      <div className="header__logo">サイト名</div>
      {token && (
        <div className="header__nav">
          {user && (
            <div className="header__user">
              <img
                src={user.iconUrl}
                alt="User"
                className="header__user-icon"
              />
              <Link to="/profile" className="header__user-name">
                {user.name}
              </Link>
            </div>
          )}
          {token && (
            <button onClick={handleLogout} className="header__logout-btn">
              ログアウト
            </button>
          )}
          {!user && (
            <Link to="/signin" className="header__signin-link">
              ログイン
            </Link>
          )}
        </div>
      )}
      {!token && (
        <>
          <Link to="/signin" className="header__signin-link">
            ログイン
          </Link>
        </>
      )}
    </div>
  );
};
