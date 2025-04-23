import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";


export interface LoginRequest {
  username: string;
  personal_code: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: InfoUser;
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  return await axiosInstance
    .post(`/user/login`, body)
    .then((res) => res?.data?.data as LoginResponse);
}
