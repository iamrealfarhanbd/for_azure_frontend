import axios from "axios";

export const PostAxiosWithFile = async (url: string, formData: FormData) => {
  return await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
