import {PublishVoteRequest} from "@/api/e-voting-service/types";
import {axiosInstance} from "@/constant/axios";

export async function getPublishResults(params: PublishVoteRequest): Promise<Map<string, number>> {
  return await axiosInstance
    .get(`/voting/publish_vote`, {
      params: {
        ...params,
      },
    })
    .then((res) => {
      return res?.data?.data as Map<string, number>;
    });
}