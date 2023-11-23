import React from "react";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().required("ユーザー名は必須です"),
    email: yup
      .string()
      .email("無効なメールアドレスです")
      .required("メールアドレスは必須です"),
    password: yup.string().required("パスワードは必須です"),
  })
  .required();

export const SignUpTest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {};

  return (
    <div>
      <h2>アカウント新規作成</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="emailError" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">アカウント作成</button>
      </form>
    </div>
  );
};
