import React, { useEffect, useState } from "react";
import { useToken } from "../../services/useTokenContext";
import { getBooks, getPublickBooks } from "../../services/bookService";
import "./BookList.scss";
import { Link } from "react-router-dom";

const BOOKS_PER_PAGE = 10;

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useToken();

  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * BOOKS_PER_PAGE;
    if (token) {
      getBooks(token, offset)
        .then((data) => {
          setBooks(data);
          setHasMore(data.length === BOOKS_PER_PAGE);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      getPublickBooks(offset)
        .then((data) => {
          setBooks(data);
          setHasMore(data.length === BOOKS_PER_PAGE);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [currentPage, token]);

  const goToNextPage = () => {
    if (hasMore) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleClick = () => {
    console.log("send log");
  };

  return (
    <>
      <div>
        <Link to="/book/new">新規書籍レビュー作成</Link>
      </div>
      <div className="book-list">
        <h2 className="book-list__header">一覧</h2>
        {loading && <p className="book-list__loading">Loading books...</p>}
        {error && <p className="book-list__error">Error: {error}</p>}
        <ul className="book-list__items">
          {books.map((book) => (
            <li key={book.id} className="book-list__item">
              <Link
                onClick={handleClick}
                to={book.isMine ? `/book/${book.id}/edit` : `/book/${book.id}`}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="book-list__pagination">
          {currentPage > 1 && (
            <button
              onClick={goToPreviousPage}
              className="book-list__pagination-btn"
            >
              前
            </button>
          )}
          <span className="book-list__current-page">ページ {currentPage}</span>
          {hasMore && (
            <button
              onClick={goToNextPage}
              className="book-list__pagination-btn"
            >
              次
            </button>
          )}
        </div>
      </div>
    </>
  );
};
