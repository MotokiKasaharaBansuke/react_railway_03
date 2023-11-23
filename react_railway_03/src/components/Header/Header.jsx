import React, { useEffect, useState } from "react";
import { useUser } from "../../services/useUserContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useUser();
  return (
    <>
      <div>
        <div>サイト名</div>
        <div>
          {user && <Link to="/profile">{user.name}</Link>}
          {!user && <Link to="/signin">ログイン</Link>}
        </div>
      </div>
    </>
  );
};
