/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../config/axois.config";
import toast from "react-hot-toast";

export const logout = async () => {
  try {
    await axiosInstance.post("/users/logout");
    secureLocalStorage.removeItem("accessToken");
    toast.success(
      "User logged out successfully you will be redirected to the login page"
    );
    setTimeout(() => {
      window.location.href = "/signin";
    }, 3000);
  } catch (error: any) {
    toast.error("Error logging out. Please try again later.");
    return;
  }
};
