export async function fetchHandler(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new Error(`Error ${error.ErrorCode}: ${error.ErrorMessageEN}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred!");
    }
  }
}
