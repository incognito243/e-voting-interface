import React from 'react';
import { Button, Typography } from 'antd';
import { useAccount } from 'wagmi';
import { useCheckConnectWallet } from '@/hook/useCheckConnectWallet';

const { Text } = Typography;

const WalletConnector: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { checkConnectWallet, disconnectWallet } = useCheckConnectWallet();

  if (isConnected) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text type="secondary">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </Text>
        <Button size="small" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="primary"
      onClick={checkConnectWallet}
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnector;