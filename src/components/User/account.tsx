import axios, { AxiosResponse } from "axios";

const API_URL = "https://habithub-server-ac53ab369ec1.herokuapp.com/api"; // Replace with your backend API URL

interface UserData {
  firstname?: string;
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: any; // Define more specific type based on your backend response
}

export const registerUser = async (
  userData: UserData
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const loginUser = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_URL}/auth/login`,
      userData
    );

    if (response.data.token && response.data.refreshToken) {
      localStorage.setItem("token", response.data.token);
      document.cookie = `refreshToken=${response.data.refreshToken}; HttpOnly; SameSite=Strict; Path=/`;
    }

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_URL}/auth/refresh-token`,
      {}, // No need to send the token here as it’s handled server-side
      { withCredentials: true } // Important to include cookies with requests
    );

    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      return token;
    }

    return null;
  } catch (error: any) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
