import React, { useEffect, useState } from "react";
import { getBook } from "../../services/bookService";
import { useToken } from "../../services/useTokenContext";
import { Link, useParams } from "react-router-dom";
import "./Book.scss";

export const Book = () => {
  const { id } = useParams();
  const { token } = useToken();
  const [book, setBook] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBook(token, id)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => setLoading(false)); // setLoading を関数として渡す
  }, [id, token]);

  return (
    <div className="book">
      <Link to="/">戻る</Link>
      {loading && <p className="book__loading">Loading...</p>}
      {apiError && <p className="book__error">Error: {apiError}</p>}
      {book && (
        <>
          <div className="book__section">
            <p className="book__label">タイトル</p>
            <p className="book__title">{book.title}</p>
          </div>
          <div className="book__section">
            <p className="book__label">URL</p>
            <p className="book__url">{book.url ? book.url : "記載なし"}</p>
          </div>
          <div className="book__section">
            <p className="book__label">説明</p>
            <p className="book__detail">
              {book.detail ? book.detail : "記載なし"}
            </p>
          </div>
          <div className="book__section">
            <p className="book__label">レビュー</p>
            <p className="book__review">
              {book.reveiw ? book.reveiw : "記載なし"}
            </p>
          </div>
          <div className="book__section">
            <p className="book__reviewer">
              レビュー者: {book.isMine ? "自分" : book.reviewer}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
