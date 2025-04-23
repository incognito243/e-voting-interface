import {axiosInstance} from "@/constant/axios";
import {VotingRequest} from "@/api/e-voting-service/types";

export async function postCastVote(body: VotingRequest): Promise<number> {
  return await axiosInstance
    .post(`/user/voting`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")?.replaceAll('"', "")}`,
      },
    })
    .then((res) => {
      return res?.data?.code as number
    });
}
