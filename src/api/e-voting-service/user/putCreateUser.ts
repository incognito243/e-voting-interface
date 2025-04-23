import {axiosInstanceAdmin} from "@/constant/axios";
import {CreateUserRequest} from "@/api/e-voting-service/types";

export async function putCreateUser(body: CreateUserRequest): Promise<number> {
  return await axiosInstanceAdmin
    .put(`/user/create`, body)
    .then((res) => {
      return res?.data?.code as number
    });
}
