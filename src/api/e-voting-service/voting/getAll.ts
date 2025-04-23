import {ExtendedVotingServer} from "@/api/e-voting-service/types";
import {axiosInstance} from "@/constant/axios";

export async function getAll(): Promise<Array<ExtendedVotingServer>> {
  return await axiosInstance
    .get(`/voting`)
    .then((res) => {
      return res?.data?.data as Array<ExtendedVotingServer>
    });
}