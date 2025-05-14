import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";

export async function getAllUser(): Promise<Array<InfoUser>> {
  return await axiosInstance
    .get(`/user/all`, {})
    .then((res) => res?.data?.data as Array<InfoUser>);
}
