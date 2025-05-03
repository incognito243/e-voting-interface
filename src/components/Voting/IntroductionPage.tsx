import { Typography, Tag } from 'antd';
import Title from "antd/es/typography/Title";
import { useUser } from "@/context/UserContext";
import { getFormattedExpirationTime } from "@/utils/time";
import React, { useEffect } from "react";

const { Paragraph, Text } = Typography;

interface IntroductionPageProps {
  votingName: string;
  numberOfCandidates: number;
  expirationTime: number;
  hasVoted: boolean | null;
  loading: boolean;
  setDisableButton: (bool: boolean) => void;
}

export default function IntroductionPage({
                                           votingName,
                                           numberOfCandidates,
                                           expirationTime,
                                           hasVoted,
                                           loading,
                                           setDisableButton,
                                         }: IntroductionPageProps) {
  const { user } = useUser();

  useEffect(() => {
    setDisableButton(hasVoted === true);
  }, [hasVoted, setDisableButton]);

  const formattedExpirationTime = getFormattedExpirationTime(expirationTime);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '32px',
    borderRadius: '8px',
    gap: '24px',
  };

  const sectionStyle = {
    flex: 1,
    padding: '24px',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    fontSize: '18px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '18px'
  };

  const valueStyle = {
    marginBottom: '16px',
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <Title level={4}>Introduction</Title>
        <Paragraph style={{fontSize: '18px'}}>
          You are e-voting in the {votingName}.
        </Paragraph>

        {loading ? (
          <Paragraph style={{fontSize: '18px'}}>
            Checking your voting status...
          </Paragraph>
        ) : hasVoted ? (
          <div>
            <Paragraph style={{fontSize: '18px'}}>
              You have already cast your vote in this election. You cannot vote again.
            </Paragraph>
          </div>
        ) : (
          <Paragraph style={{fontSize: '18px'}}>
            You haven&#39;t voted in this election yet. Please continue to make your selection.
          </Paragraph>
        )}
      </div>

      <div style={sectionStyle}>
        <Title level={4}>Voting Information</Title>
        <div>
          <Text style={labelStyle}>Voting Name: </Text>
          <Text style={valueStyle}>{votingName}</Text>
        </div>
        <div>
          <Text style={labelStyle}>Number of Candidates: </Text>
          <Text style={valueStyle}>{numberOfCandidates}</Text>
        </div>
        <div>
          <Text style={labelStyle}>Expiration Time: </Text>
          <Text style={valueStyle}>{formattedExpirationTime}</Text>
        </div>
      </div>

      <div style={sectionStyle}>
        <Title level={4}>My Information</Title>
        <div>
          <Text style={labelStyle}>Name: </Text>
          <Text style={valueStyle}>{user?.username}</Text>
        </div>
        <div>
          <Text style={labelStyle}>Citizen Id: </Text>
          <Text style={valueStyle}>{user?.citizen_id}</Text>
        </div>
        <div>
          <Text style={labelStyle}>Voting Status: </Text>
          {loading ? (
            <Text style={valueStyle}>Checking...</Text>
          ) : (
            <Text style={valueStyle}>
              {hasVoted ?
                <Tag color="blue">Already voted</Tag> :
                <Tag color="green">Not voted yet</Tag>
              }
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}