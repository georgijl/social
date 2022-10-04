import axios from "axios";

export const fetchPosts = async (userInfo: string, isOwn: boolean) => {
  const res = await axios.get(
    `${!isOwn ? "/user/post/" : "/post/"}${userInfo}`
  );
  return res.data.sort((p1: { createdAt: Date }, p2: { createdAt: Date }) => {
    return new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf();
  });
};
