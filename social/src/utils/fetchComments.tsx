import axios from "axios";

export const fetchComments = async (userInfo: string) => {
  const response = await axios.get(`/comment/${userInfo}`);

  return response.data.commentsContent.sort(
    (p1: { createdAt: Date }, p2: { createdAt: Date }) => {
      return (
        new Date(p1.createdAt).valueOf() - new Date(p2.createdAt).valueOf()
      );
    }
  );
};
