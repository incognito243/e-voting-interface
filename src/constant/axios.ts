import axios from "axios";
import {
  NEXT_PUBLIC_SERVICE_API, NEXT_PUBLIC_SERVICE_API_ADMIN,
  NEXT_PUBLIC_SERVICE_API_KEY
} from "@/constant/api";

export const axiosInstance = axios.create(
  {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: NEXT_PUBLIC_SERVICE_API,
  })

export const axiosInstanceAdmin = axios.create(
  {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": NEXT_PUBLIC_SERVICE_API_KEY,
    },
    baseURL: NEXT_PUBLIC_SERVICE_API_ADMIN,
  })

