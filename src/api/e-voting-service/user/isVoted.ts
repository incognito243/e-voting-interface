import {axiosInstance} from "@/constant/axios";

export async function isVoted(username: string, server_id: string): Promise<boolean> {
  return await axiosInstance
    .get(`/user/is-voted`, {
      params: {
        username: username,
        server_id: server_id,
      }
    })
    .then((res) => res?.data?.data as boolean);
}
