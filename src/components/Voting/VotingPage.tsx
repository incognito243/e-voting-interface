import {useState} from "react";
import {Row, Col, Typography, Avatar, Button, Divider} from "antd";
import {Candidate, ExtendedVotingServer} from "@/api/e-voting-service/types";
import {useAccount} from "wagmi";
import {useCheckConnectWallet} from "@/hook/useCheckConnectWallet";
import {useUser} from "@/context/UserContext";
import {CheckCircleOutlined} from "@ant-design/icons";
import {SignMessageModal} from "@/components/Modal/SignMessageModal";

const {Title, Text} = Typography;

interface VotingPageProps {
  server: ExtendedVotingServer | undefined
  selectedCandidate: Candidate | null;
  setSignatureVerify: (signature: string) => void;
  setSignatureVote: (signature: string) => void;
  disable: boolean
}

export default function VotingPage({
                                     server,
                                     selectedCandidate,
                                     setSignatureVerify,
                                     setSignatureVote,
                                     disable,
                                   }: VotingPageProps) {
  const {address} = useAccount()
  const {checkConnectWallet, disconnectWallet} = useCheckConnectWallet();
  const {user} = useUser()
  const [openSignModal, setOpenSignModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-white">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Title level={5} style={{marginTop: "0px"}}>Candidate Details</Title>
          <div
            className="space-y-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {selectedCandidate ? (
              <div
                className="p-4 border rounded bg-gray-50"
                style={{textAlign: "center"}}
              >
                <Avatar src={selectedCandidate.avatar_url} size={64}/>
                <div className="mt-4">
                  <Text strong>Name:</Text>{" "}
                  <Text>{selectedCandidate.candidate_name}</Text>
                </div>
                <div className="mt-2">
                  <Text strong>Citizen ID:</Text>{" "}
                  <Text>{selectedCandidate.citizen_id}</Text>
                </div>
              </div>
            ) : (
              <Text className="text-gray-500" style={{textAlign: "center"}}>
                No candidate selected.
              </Text>
            )}
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Title level={5} style={{marginTop: "0px"}}>User Information</Title>
          <div
            className="space-y-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "",
              justifyContent: "center",
              height: "80%",
            }}
          >
            {user ? (
              <div className="p-4 border rounded bg-gray-50">
                <div className="mt-2">
                  <Text strong>Username:</Text> <Text>{user.username}</Text>
                  {user.verified && (
                    <CheckCircleOutlined
                      style={{color: "green", marginLeft: "8px"}}
                      title="Verified User"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <Text strong>Citizen ID:</Text> <Text>{user.citizen_id}</Text>
                </div>
                <div className="mt-2">
                  <Text strong>Citizen Name:</Text> <Text>{user.citizen_name}</Text>
                </div>
                <div className="mt-2">
                  <Text strong>Email:</Text> <Text>{user.email}</Text>
                </div>
                <div className="mt-2">
                  <Text strong>Public key:</Text> <Text>{user.compressed_key}</Text>
                </div>
              </div>
            ) : (
              <Text className="text-gray-500" style={{textAlign: "center"}}>
                No user information available.
              </Text>
            )}
          </div>
          <Divider style={{marginTop: "-10px"}}/>
          <div
            style={{
              marginTop: "-10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {address ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <Text strong>Address:</Text>
                  <Text>{`${address.slice(0, 6)}...${address.slice(-4)}`}</Text>
                  <Text onClick={async () => {
                    await disconnectWallet();
                  }}>
                    (disconnect)
                  </Text>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpenSignModal(true);
                    }}
                    disabled={disable}
                  >
                    Sign Message
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <Text strong>Click Connect Wallet to sign message</Text>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={async () => {
                      await checkConnectWallet();
                    }}
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <div>
        {openSignModal && (
          <SignMessageModal
            server={server}
            setOpenSignModal={setOpenSignModal}
            selectedCandidate={selectedCandidate}
            setSignatureVerify={setSignatureVerify}
            setSignatureVote={setSignatureVote}
          />
        )}
      </div>
    </div>
  );
}