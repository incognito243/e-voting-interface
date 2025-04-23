import {axiosInstance} from "@/constant/axios";
import {InfoUser} from "@/api/e-voting-service/types";

export async function getByCitizenId(citizenId: string): Promise<InfoUser> {
  return await axiosInstance
    .get(`/user/citizen_id`, {
      params: {
        citizen_id: citizenId,
      },
    })
    .then((res) => res?.data?.data as InfoUser);
}
