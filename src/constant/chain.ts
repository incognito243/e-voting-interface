import { fallback } from "viem";
import { base } from "viem/chains";
import { createConfig, http } from "wagmi";

export const chains: any = [base];

const transports: Record<number, any> = {
  [base.id]: fallback([http("https://base-mainnet.public.blastapi.io"), http("https://base.drpc.org")]),
};

export const clientConfig = createConfig({
  chains: chains,
  transports: transports,
  multiInjectedProviderDiscovery: false,
  ssr: true,
});
