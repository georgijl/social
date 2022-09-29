import axios from "axios";

export const getUserInfo = async (userId: string, url: string) => {
  if (!userId) return;

  const response = await axios.get(`${url}${userId}`);
  const data = response.data[0];
  return data;
};
