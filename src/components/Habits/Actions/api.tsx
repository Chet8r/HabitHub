// src/api.ts
export const API_URL = "https://habithub-server-ac53ab369ec1.herokuapp.com/api";

// Function to make API requests
export const fetchUser = async (userId: number, token: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
