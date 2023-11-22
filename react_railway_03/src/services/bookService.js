import { fetchHandler, createOptions } from "./utils";

const ENDPOINT = "https://railway.bookreview.techtrain.dev";

export const getBooks = (token, offset) => {
  const url = offset
    ? `${ENDPOINT}/books?offset=${offset}`
    : `${ENDPOINT}/books`;
  return fetchHandler(url, createOptions("GET", token));
};

export const getPublickBooks = (offset) => {
  const url = offset
    ? `${ENDPOINT}/public/books?offset=${offset}`
    : `${ENDPOINT}/public/books`;
  return fetchHandler(url, createOptions("GET"));
};

export const getBook = (token, id) => {
  return fetchHandler(`${ENDPOINT}/books/${id}`, createOptions("GET", token));
};

export const postBook = (token, book) => {
  return fetchHandler(`${ENDPOINT}/users`, createOptions("POST", token, book));
};

export const updateBook = (token, id, book) => {
  return fetchHandler(
    `${ENDPOINT}/books/${id}`,
    createOptions("PUT", token, book)
  );
};

export const deleteBook = (token, id) => {
  return fetchHandler(
    `${ENDPOINT}/books/${id}`,
    createOptions("DELETE", token)
  );
};
