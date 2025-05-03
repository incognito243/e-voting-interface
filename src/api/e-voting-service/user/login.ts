import {axiosInstance} from "@/constant/axios";
import {LoginRequest, LoginResponse} from "@/api/e-voting-service/types";


export async function login(body: LoginRequest): Promise<LoginResponse> {
  return await axiosInstance
    .post(`/user/login`, body)
    .then((res) => res?.data?.data as LoginResponse);
}
