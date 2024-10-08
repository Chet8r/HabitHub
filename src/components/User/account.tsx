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
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
