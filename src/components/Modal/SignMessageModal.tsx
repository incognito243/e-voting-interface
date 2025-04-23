import {Button, Modal, Progress, Steps} from "antd";
import { useState } from "react";
import {useAccount, useSignMessage} from "wagmi";
import {useUser} from "@/context/UserContext";
import {Candidate, ExtendedVotingServer} from "@/api/e-voting-service/types";
import Title from "antd/es/typography/Title";
import {LoadingOutlined} from "@ant-design/icons";
import {SuccessIcon} from "@/constant/icon";

interface SignMessageModalProps {
  server: ExtendedVotingServer
  selectedCandidate: Candidate;
  setOpenSignModal: (open: boolean) => void;
  setSignatureVerify: (signature: string) => void;
  setSignatureVote: (signature: string) => void;
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
export const SignMessageModal = (props: SignMessageModalProps) => {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const {address} = useAccount()
  const { signMessageAsync } = useSignMessage();
  const {user} = useUser()

  const onClose = () => {
    setIsLoading(false);
    setCurrentStep(-1);
    setVisible(false);
    props.setOpenSignModal(false)
  };

  const sign = async () => {
    if (!address) return;
    setIsLoading(true);
    setCurrentStep(0);
    try {
      const messageVerify = `Vote From: ${user?.username} is voting in server ${props.server.voting_server.server_id}`;
      const signatureVerify = await signMessageAsync({message: messageVerify});
      props.setSignatureVerify(signatureVerify)
      setCurrentStep(1);
      const messageVote = `Vote For: user is voting for ${props.selectedCandidate.index}`
      const signatureVote = await signMessageAsync({message: messageVote});
      props.setSignatureVote(signatureVote)
      setCurrentStep(2);
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <Modal open={visible} footer={null} onCancel={() => onClose()} maskClosable={false}>
      <div className="flex flex-col gap-6">
        <Title level={3}>Sign message</Title>

        <Progress percent={((currentStep) / 2) * 100} />

        <div className="flex flex-col gap-2" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Steps current={currentStep} direction="vertical">
            <Steps.Step title="Sign verify message" icon={getIconByStep(0, currentStep)} />
            <Steps.Step title="Sign vote message" icon={getIconByStep(1, currentStep)} />
          </Steps>
        </div>

        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={async () => {
            await sign();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>Sign</Title>
        </Button>
      </div>
    </Modal>
  );
}