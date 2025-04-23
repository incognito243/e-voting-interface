import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {getAll} from "@/api/e-voting-service/voting/getAll";
import {ExtendedVotingServer} from "@/api/e-voting-service/types";

export function useVotingServerList() {
  const { data: serverList, isLoading } = useQuery<ExtendedVotingServer[]>({
    queryKey: ["votingServerList"],
    queryFn: async () => {
      return getAll();
    },
  });

  return useMemo(() => {
    return {
      data: serverList,
      isLoading,
    };
  }, [serverList, isLoading]);
}