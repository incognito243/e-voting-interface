import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";

export async function getByUsername(username: string): Promise<InfoUser> {
  return await axiosInstance
    .get(`/user`, {
      params: {
        username: username,
      },
    })
    .then((res) => res?.data?.data as InfoUser);
}
