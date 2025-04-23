import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useCallback } from "react";

export function useCheckConnectWallet() {
  const { setShowAuthFlow, primaryWallet, handleLogOut } = useDynamicContext();

  const checkConnectWallet = useCallback(async () => {
    if (!(await primaryWallet?.isConnected())) {
      setShowAuthFlow(true);
      return true;
    }
    return false;
  }, [primaryWallet, setShowAuthFlow]);

  const disconnectWallet = useCallback(async () => {
    if (await primaryWallet?.isConnected()) {
      await handleLogOut();
    }
  })

  return { checkConnectWallet, disconnectWallet };
}