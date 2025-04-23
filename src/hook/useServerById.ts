import { useQuery } from "@tanstack/react-query";
import { getVotingByIds } from "@/api/e-voting-service/voting/getVotingById";
import { ExtendedVotingServer, GetVotingServerByIdRequest } from "@/api/e-voting-service/types";

export function useServerById(serverId: string) {
  const { data, isLoading, isError } = useQuery<ExtendedVotingServer>({
    queryKey: ["serverById", serverId],
    queryFn: async () => {
      const params: GetVotingServerByIdRequest = { server_id: serverId };
      return getVotingByIds(params);
    },
    enabled: !!serverId,
  });

  return {
    data,
    isLoading,
    isError,
  };
}