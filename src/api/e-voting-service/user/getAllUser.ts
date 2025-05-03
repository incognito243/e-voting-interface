import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";
import {NEXT_PUBLIC_SERVICE_API} from "@/constant/api";

export async function getAllUser(): Promise<Array<InfoUser>> {
  console.log(axiosInstance.getUri())
  console.log(NEXT_PUBLIC_SERVICE_API)
  return await axiosInstance
    .get(`/user/all`, {})
    .then((res) => res?.data?.data as Array<InfoUser>);
}
