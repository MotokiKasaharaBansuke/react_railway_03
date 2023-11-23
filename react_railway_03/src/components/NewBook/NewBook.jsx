import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToken } from "../../services/useTokenContext";
import { useNavigate } from "react-router-dom";
import { postBook } from "../../services/bookService";
import { useFlashMessage } from "../../services/useFlashMessageContext";

const schema = yup
  .object({
    title: yup.string().required("タイトルは必須です"),
    url: yup.string().required("URLは必須です"),
    detail: yup.string(),
    review: yup.string(),
  })
  .required();

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState("");
  const { token } = useToken();
  const { setMessage } = useFlashMessage();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    postBook(token, data)
      .then((data) => {
        setMessage("レビューを新規追加しました");
        navigate("/");
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  return (
    <div>
      <h2>新規書籍レビュー作成</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        <div>
          <label htmlFor="title">タイトル</label>
          <input id="title" type="text" {...register("title")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input id="url" type="text" {...register("url")} />
          {errors.email && <p style={{ color: "red" }}>{errors.url.message}</p>}
        </div>
        <div>
          <label htmlFor="detail">説明</label>
          <input id="detail" type="text" {...register("detail")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.detail.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="review">レビュー</label>
          <input id="review" type="text" {...register("review")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.review.message}</p>
          )}
        </div>
        <button type="submit">新規作成</button>
      </form>
    </div>
  );
};
