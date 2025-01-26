/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "../config/axois.config";
import secureLocalStorage from "react-secure-storage";

const accessToken = () => {
  try {
    return secureLocalStorage.getItem("accessToken");
  } catch (e) {
    console.log(e);
  }
};

interface GetdataProps<T> {
  url: string;
  keyID: string;
  options?: UseQueryOptions<T, Error>; // Accept dynamic options
}

export interface ApiResponse {
  data: any;
  message: string;
  status: "success" | "error"; // Assuming "status" can have these values
}

export const Getdata = <T = unknown>({
  url,
  keyID,
  options,
}: GetdataProps<T>) => {
  return useQuery<T, Error>({
    queryKey: [keyID],
    queryFn: async () => {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    },
    ...options,
  });
};

export const SendData = ({
  url,
  keyID,
  data,
}: {
  url: string;
  keyID: string;
  data: { [key: string]: any };
}) => {
  return useQuery({
    queryKey: [keyID],
    queryFn: async () =>
      await axiosInstance.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
};
