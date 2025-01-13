import { create } from "zustand";
import axios from "axios";

type AuthState = {
  accessToken: string | null;
  email: string | null;
  userInfo: {
    id: string;
    email: string;
    userType: string;
  };
  needPasswordChange: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  searchTerm: string | null;
  setSearchTerm: (x: string) => void;
  page: number;
  setPageNumber: (x: number) => void;
  feed: [];
  setFeed: () => void;
};

// const handleFeed = async (searchTerm: string, page: string) => {
//   const { data } = await axios.get(
//     `https://backserver-bnb5f3exhpa8gte6.uksouth-01.azurewebsites.net/api/v1/video?limit=5&page=${page || 1}&searchTerm=${
//       searchTerm || ""
//     }`
//   );
//   return data;
// };
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  needPasswordChange: false,
  email: localStorage.getItem("email"),
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  isLoggedIn: !!localStorage.getItem("accessToken"),
  searchTerm: "",
  feed: [],
  page: 1,

  setFeed: async () => {
    const { searchTerm, page, feed } = useAuthStore.getState(); // Access current state
    try {
      const { data } = await axios.get(
        `https://backserver-bnb5f3exhpa8gte6.uksouth-01.azurewebsites.net/api/v1/video?limit=5&page=${page}&searchTerm=${
          searchTerm || ""
        }`
      );

      set({
        feed: page === 1 ? data.data : [...feed, ...data.data], // Append or reset feed
      });
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  },

  setSearchTerm: (x) => {
    set({
      searchTerm: x,
      page: 1, // Reset to the first page on a new search
    });
  },

  setPageNumber: (x) => {
    set({
      page: x,
    });
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        "https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/auth/login",
        { email, password }
      );

      const { accessToken, needPasswordChange, id, userType } =
        response.data.data;
      const userData = {
        id,
        userType,
        email,
      };
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", email);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      set({
        accessToken,
        needPasswordChange,
        isLoggedIn: true,
        email,
        userInfo: userData,
      });
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      accessToken: null,
      needPasswordChange: false,
      isLoggedIn: false,
    });
  },
}));
