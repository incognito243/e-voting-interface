import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";
import {NEXT_PUBLIC_SERVICE_API} from "@/constant/api";

export async function getByUsername(username: string): Promise<InfoUser> {
  console.log(axiosInstance.getUri())
  console.log(NEXT_PUBLIC_SERVICE_API)
  return await axiosInstance
    .get(`/user`, {
      params: {
        username: username,
      },
    })
    .then((res) => res?.data?.data as InfoUser);
}
