import React, { useEffect, useState } from "react";
import { useToken } from "../../services/tokenService";
import { getUser } from "../../services/userService";
import { Link } from "react-router-dom";

export const Header = () => {
  const { token } = useToken();
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((data) => {
          console.log(data);
          setName(data.name);
        })
        .catch((error) => {
          setError(error);
        });
    }
  });

  return (
    <>
      <div>
        {error && <p>Error: {error}</p>}
        <div>サイト名</div>
        <div>
          {token && <p>{name}</p>}
          {!token && <Link to="/signin">ログイン</Link>}
        </div>
      </div>
    </>
  );
};
