import { fetchHandler } from "./utils";

const ENDPOINT = "https://railway.bookreview.techtrain.dev";

export const signIn = (email, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  return fetchHandler(`${ENDPOINT}/signin`, options);
};

export const signUp = (name, email, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  };
  return fetchHandler(`${ENDPOINT}/users`, options);
};

export const uploadIcon = (file, token) => {
  const formData = new FormData();
  formData.append("icon", file);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  return fetchHandler(`${ENDPOINT}/uploads`, options);
};
