import { fetchHandler, createOptions } from "./utils";

const ENDPOINT = "https://railway.bookreview.techtrain.dev";

export const signIn = (data) => {
  return fetchHandler(`${ENDPOINT}/signin`, createOptions("POST", null, data));
};

export const signUp = (data) => {
  return fetchHandler(`${ENDPOINT}/users`, createOptions("POST", null, data));
};

export const uploadIcon = (token, file) => {
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

export const getUser = (token) => {
  return fetchHandler(`${ENDPOINT}/users`, createOptions("GET", token));
};
