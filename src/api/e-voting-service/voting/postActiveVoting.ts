import {axiosInstanceAdmin} from "@/constant/axios";
import {ActiveVotingServerRequest} from "@/api/e-voting-service/types";

export async function postOpenVote(params: ActiveVotingServerRequest): Promise<Map<string, number>> {
  return await axiosInstanceAdmin
    .post(`/voting/active`, params)
    .then((res) => {
      return res?.data?.data as Map<string, number>;
    });
}