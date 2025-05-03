import { Button, Modal, Progress, Steps } from "antd";
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { LoadingOutlined } from "@ant-design/icons";
import { SuccessIcon } from "@/constant/icon";
import Title from "antd/es/typography/Title";

interface SignOpenVotingModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onSign: (signature: string) => void;
  adminId: string;
  serverId: string;
  serverName: string;
}

function getIconByStep(targetStep: number, currentStep: number) {
  if (currentStep === targetStep) {
    return <LoadingOutlined />;
  }
  if (currentStep > targetStep) {
    return <SuccessIcon size={32} />;
  }
  return undefined;
}

const SignOpenVotingModal = (props: SignOpenVotingModalProps) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const sign = async () => {
    if (!address) return;

    setIsLoading(true);
    setCurrentStep(0);

    try {
      const messageToSign = `Admin: ${props.adminId} is acting in server ${props.serverName}`;
      const signature = await signMessageAsync({ message: messageToSign });

      setCurrentStep(1);
      props.onSign(signature);
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setIsLoading(false);
      setCurrentStep(-1);
      props.onCancel();
    }
  };

  return (
    <Modal open={props.isVisible} footer={null} onCancel={props.onCancel} maskClosable={false}>
      <div className="flex flex-col gap-6">
        <Title level={3}>Open Voting Server</Title>

        <Progress percent={((currentStep + 1) / 2) * 100} />

        <div className="flex flex-col gap-2" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Steps current={currentStep} direction="vertical">
            <Steps.Step title="Sign authorization message" icon={getIconByStep(0, currentStep)} />
            <Steps.Step title="Open voting server" icon={getIconByStep(1, currentStep)} />
          </Steps>
        </div>

        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={sign}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>Sign and Open</Title>
        </Button>
      </div>
    </Modal>
  );
};

export default SignOpenVotingModal;