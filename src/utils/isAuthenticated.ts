/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

export const isAuthenticated = () => {
  try {
    const token = secureLocalStorage.getItem("accessToken");
    const decoded = jwtDecode(String(token));
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp != undefined && decoded.exp < currentTime) {
      return false;
    }
    return true;
  } catch (e: any) {
    return false;
  }
};
