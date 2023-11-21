import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp, uploadIcon } from "../../services/userService";
import { useToken } from "../../services/tokenService";
import Compressor from "compressorjs";

const schema = yup
  .object({
    username: yup.string().required("ユーザー名は必須です"),
    email: yup
      .string()
      .email("無効なメールアドレスです")
      .required("メールアドレスは必須です"),
    password: yup.string().required("パスワードは必須です"),
  })
  .required();

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState("");
  const [image, setImage] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const { setToken } = useToken();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      new Compressor(file, {
        quality: 0.6,
        success: (compressedResult) => {
          setImage(compressedResult);
        },
      });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const signUpResponse = await signUp(
        data.username,
        data.email,
        data.password
      );
      setToken(signUpResponse.token);

      if (image) {
        await uploadIcon(image, signUpResponse.token);
      }
    } catch (error) {
      setApiError(error.message || "アカウント作成中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>アカウント新規作成</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        {isLoding && <p>Loading...</p>}
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
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
        <div>
          <label htmlFor="icon">アイコン画像（PNG/JPGのみ）</label>
          <input
            type="file"
            id="icon"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">アカウント作成</button>
      </form>
    </div>
  );
};
