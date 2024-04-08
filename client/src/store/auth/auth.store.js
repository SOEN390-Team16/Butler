import { create } from "zustand";
import AuthService from "../../service/auth/auth.service.js";
import { toast } from "react-toastify";

const TOKEN = "token"

const useAuthStore = create((set, get) => ({
  setToken: (token) => {
    localStorage.setItem(TOKEN, token);
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN);
  },
  login: async (email, password) => {
    try {
      const res = await AuthService.login(email, password);
      if (res.data && res.data.token) {
        get().setToken(res.data.token);
        return res.data;
      }
    } catch (err) {
      toast.error(`Login Failed: ${err.message}`);
    }
  },
  registerPublicUser: async (userInfo) => {
    try {
      return await AuthService.registerPublicUser(userInfo);
    } catch (err) {
      return err.response;
    }
  }

}))

export default useAuthStore