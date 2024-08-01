import axios, { AxiosResponse } from "axios";

// const API_URL = "https://habithub-server-ac53ab369ec1.herokuapp.com/api";

export const handleFetchWithAuth = async (
  url: string,
  options: object = {}
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(url, {
      ...options,
      withCredentials: true,
    });

    if (response.status === 401 || response.status === 403) {
      // Handle token expiration or invalidation
      window.location.href = "/login"; // Redirect to login
    }

    return response;
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/login"; // Redirect to login
    }
    throw error;
  }
};
