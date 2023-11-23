import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToken } from "../../services/useTokenContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBook, postBook, deleteBook } from "../../services/bookService";
import { useFlashMessage } from "../../services/useFlashMessageContext";

const schema = yup
  .object({
    title: yup.string().required("タイトルは必須です"),
    url: yup.string().required("URLは必須です"),
    detail: yup.string(),
    review: yup.string(),
  })
  .required();

export const EditBook = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [apiError, setApiError] = useState("");
  const { token } = useToken();
  const { setMessage } = useFlashMessage();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBook(token, id)
      .then((data) => {
        setValue("title", data.title);
        setValue("url", data.url);
        setValue("detail", data.detail);
        setValue("review", data.review);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  }, [token, id, setValue]);

  const onSubmit = (data) => {
    postBook(token, data)
      .then(() => {
        setMessage("レビューを更新しました");
        navigate("/");
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  const handleDelete = () => {
    deleteBook(token, id)
      .then(() => {
        setMessage("書籍レビューを削除しました");
        navigate("/");
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  return (
    <div>
      <Link to="/">戻る</Link>
      <h2>書籍レビュー編集</h2>
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
        <button type="submit">更新する</button>
      </form>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};
