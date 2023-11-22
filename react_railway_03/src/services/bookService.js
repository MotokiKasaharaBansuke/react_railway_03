import { fetchHandler } from "./utils";

const ENDPOINT = "https://railway.bookreview.techtrain.dev";

const createOptions = (method, token, body = null) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) options.body = JSON.stringify(body);

  return options;
};

export const getBooks = (token, offset) => {
  const url = offset
    ? `${ENDPOINT}/books?offset=${offset}`
    : `${ENDPOINT}/books`;
  return fetchHandler(url, createOptions("GET", token));
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
