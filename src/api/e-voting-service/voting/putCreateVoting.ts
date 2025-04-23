import {CreateVotingServerRequest} from "@/api/e-voting-service/types";
import {axiosInstanceAdmin} from "@/constant/axios";

export async function putCreateVoting(body: CreateVotingServerRequest): Promise<number> {
  return await axiosInstanceAdmin
    .put(`/voting/create`, body)
    .then((res) => {
      return res?.data?.code as number;
    });
}