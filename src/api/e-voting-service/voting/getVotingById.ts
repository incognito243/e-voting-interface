import {ExtendedVotingServer, GetVotingServerByIdRequest} from "@/api/e-voting-service/types";
import {axiosInstance} from "@/constant/axios";

export async function getVotingByIds(params: GetVotingServerByIdRequest): Promise<ExtendedVotingServer> {
  return await axiosInstance
    .get(`/voting/info`, {
      params: {
        ...params,
      },
    })
    .then((res) => {
      return res?.data?.data as ExtendedVotingServer;
    });
}