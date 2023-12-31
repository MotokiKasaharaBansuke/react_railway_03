import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/userService";
import { useToken } from "../../services/useTokenContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .email("無効なメールアドレスです")
      .required("メールアドレスは必須です"),
    password: yup.string().required("パスワードは必須です"),
  })
  .required();

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState("");
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const signUpResponse = await signIn(data);
      setToken(signUpResponse.token);
      navigate("/");
    } catch (error) {
      setApiError(error.message || "ログイン中にエラーが発生しました");
    }
  };

  if (token) return <Navigate to="/" />;

  return (
    <div>
      <Link to="/signup">アカウント作成ページ</Link>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};
