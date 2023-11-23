import React from "react";
import { useUser } from "../../services/useUserContext";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../services/useTokenContext";

export const Header = () => {
  const { user } = useUser();
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signup");
  };
  return (
    <>
      <div>
        <div>サイト名</div>
        <div>
          {user && <Link to="/profile">{user.name}</Link>}
          {token && <button onClick={handleLogout}>ログアウト</button>}
          {!user && <Link to="/signin">ログイン</Link>}
        </div>
      </div>
    </>
  );
};
