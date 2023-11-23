export async function fetchHandler(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      try {
        const errorData = JSON.parse(errorBody);
        throw new Error(
          `Error ${errorData.ErrorCode}: ${errorData.ErrorMessageEN}`
        );
      } catch (parseError) {
        throw new Error(`Error: status ${response.status}`);
      }
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred!");
    }
  }
}

export const createOptions = (method, token = null, body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options = {
    method: method,
    headers: headers,
  };

  if (body) options.body = JSON.stringify(body);

  return options;
};
