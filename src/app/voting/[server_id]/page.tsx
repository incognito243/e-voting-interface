"use client";

import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {Typography, Button, Spin, Alert, Steps} from "antd";
import {useParams} from "next/navigation";
import {useServerById} from "@/hook/useServerById";
import {useRouter} from "next/navigation";
import Login from "@/components/Voting/LoginForm";
import IntroductionPage from "@/components/Voting/IntroductionPage";
import BallotSelection from "@/components/Voting/BallotSelection";
import {Candidate} from "@/api/e-voting-service/types";
import VotingPage from "@/components/Voting/VotingPage";
import {postCastVote} from "@/api/e-voting-service/user/postCastVote";
import {useUser} from "@/context/UserContext";
import Result from "@/components/Exception/Result";
import {isVoted} from "@/api/e-voting-service/user/isVoted";
import VotingResults from "@/components/VotingResult";

const {Title} = Typography;
const {Step} = Steps;

const VotingAction: NextPage = () => {
  const params = useParams<{ server_id: string }>();
  const {data: server, isLoading, isError} = useServerById(params?.server_id ?? "");
  const loginFormRef = useRef<{ submit: () => void }>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [disableButton, setDisableButton] = useState(true);
  const [signatureVerify, setSignatureVerify] = useState<string>("");
  const [signatureVote, setSignatureVote] = useState<string>("");
  const {user} = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasVoted, setHasVoted] = useState<boolean | null>(null);
  const [checkingVoteStatus, setCheckingVoteStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkVotingStatus = async () => {
      if (user?.username && params?.server_id) {
        try {
          setCheckingVoteStatus(true);
          const voted = await isVoted(user.username, params.server_id);
          setHasVoted(voted);

          if (voted) {
            setDisableButton(true);
          }
        } catch (error) {
          console.error("Error checking if user voted:", error);
        } finally {
          setCheckingVoteStatus(false);
        }
      }
    };

    if (currentStep === 1) {
      checkVotingStatus();
    }
  }, [user?.username, params?.server_id, currentStep]);

  const castVote = async () => {
    if (!user?.username || !server?.voting_server.server_id) {
      console.error("Missing required data for casting vote.");
      setCurrentStep(5);
      return;
    }

    try {
      const res = await postCastVote({
        username: user.username,
        server_id: server.voting_server.server_id,
        signature_hex: signatureVerify,
        voting_hex: signatureVote,
      });

      if (res === 0) {
        setCurrentStep(4);
      } else {
        setCurrentStep(5);
      }
    } catch (error) {
      console.error("Error casting vote:", error);
      setCurrentStep(5);
    }
  };

  useEffect(() => {
    setDisableButton(!(signatureVote && signatureVerify));
  }, [signatureVote, signatureVerify]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{justifySelf: "center", width: "35%"}}>
            <Title level={3} style={{padding: "20px 0"}}>Login With Account</Title>
            <Login ref={loginFormRef} setCurrentStep={setCurrentStep} setDisableButton={setDisableButton}/>
          </div>
        );
      case 1:
        return (
          <div style={{justifySelf: "center", width: "70%"}}>
            <Title level={3} style={{padding: "20px 0"}}>Introduction</Title>
            {server ? (
              <IntroductionPage
                votingName={server.voting_server.server_name}
                numberOfCandidates={server.voting_server.number_of_candidates}
                expirationTime={server.voting_server.exp_time}
                hasVoted={hasVoted}
                loading={checkingVoteStatus}
                setDisableButton={setDisableButton}
              />
            ) : (
              <Alert message="No introduction available" type="info"/>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <Title level={3} style={{padding: "20px 0"}}>Candidates</Title>
            {server ? (
              <BallotSelection
                data={server.candidates}
                selected={selectedCandidate}
                setSelected={setSelectedCandidate}
                setDisableButton={setDisableButton}
              />
            ) : (
              <Alert message="No candidates available" type="info"/>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <Title level={3} style={{padding: "20px 0"}}>E-Voting</Title>
            <VotingPage
              server={server}
              selectedCandidate={selectedCandidate}
              setSignatureVote={setSignatureVote}
              setSignatureVerify={setSignatureVerify}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <Title level={3} style={{padding: "20px 0"}}>Vote Successful</Title>
            <Result status="success"/>
          </div>
        );
      case 5:
        return (
          <div>
            <Title level={3} style={{padding: "20px 0"}}>Vote Failed</Title>
            <Result status="error"/>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  if (isLoading) {
    return <Spin tip="Loading server details..."/>;
  }

  if (isError || !server) {
    return <Alert message="Error" description="Failed to load server details." type="error"/>;
  }

  return (
    <div style={{padding: "24px"}}>
      <Title level={3}>Voting Action</Title>
      {server.voting_server.active ? (
        server.voting_server.opened_vote ? (
          <VotingResults server={server} />
        ) : (
          <div>
            <Steps current={currentStep} className="w-full max-w-md mb-8">
              <Step title="Login"/>
              <Step title="Introduction"/>
              <Step title="Selection"/>
              <Step title="E-Voting"/>
            </Steps>
            <div>{renderStepContent()}</div>
            <div style={{display: "flex", justifyContent: "space-between", padding: "150px 0"}}>
              <Button
                style={{marginRight: "auto"}}
                onClick={() => {
                  if (currentStep === 5) {
                    setCurrentStep(3);
                  } else if (currentStep === 0) {
                    router.push("/voting");
                  } else if (currentStep == 4) {
                    window.location.reload()
                  } else if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                  }
                }}
              >
                {currentStep === 0 ? "Cancel" : currentStep === 4 ? "New Vote" : "Back"}
              </Button>
              <Button
                type="primary"
                style={{marginLeft: "auto"}}
                disabled={disableButton}
                title={currentStep === 1 && hasVoted ? "You have already voted in this election" : ""}
                onClick={async () => {
                  if (currentStep === 0 && loginFormRef.current) {
                    loginFormRef.current.submit();
                  } else if (currentStep === 1) {
                    setCurrentStep(2);
                  } else if (currentStep === 2) {
                    setCurrentStep(3);
                  } else if (currentStep === 3) {
                    await castVote();
                    setSignatureVerify("");
                    setSignatureVote("");
                  }
                  setDisableButton(true);
                }}
              >
                {currentStep === 0 ? "Login" : currentStep === 3 ? "Vote" : "Next"}
              </Button>
            </div>
          </div>
        )
      ) : (
        <div style={{padding: "20px 0"}}>
          <Title level={4} className="text-red-700 mt-4">Voting is not active</Title>
          <Typography.Paragraph className="text-gray-700">
            The voting process is currently inactive. Please check back later.
          </Typography.Paragraph>

          <Button
            style={{marginRight: "auto"}}
            onClick={() => {
              router.push("/voting");
            }}
          >
            Back to Voting List
          </Button>
        </div>
      )}
    </div>
  );
};

export default VotingAction;