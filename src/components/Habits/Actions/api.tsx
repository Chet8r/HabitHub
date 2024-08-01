import { handleFetchWithAuth } from "../../User/handleFetchWithAuth";

export const fetchUser: any = async (userId: number) => {
  return handleFetchWithAuth(`/users/${userId}`);
};
