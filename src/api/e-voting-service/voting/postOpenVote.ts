import {axiosInstanceAdmin} from "@/constant/axios";
import {OpenVoteRequest} from "@/api/e-voting-service/types";

export async function postOpenVote(params: OpenVoteRequest): Promise<Map<string, number>> {
  return await axiosInstanceAdmin
    .post(`/voting/open`, params)
    .then((res) => {
      return res?.data?.data as Map<string, number>;
    });
}