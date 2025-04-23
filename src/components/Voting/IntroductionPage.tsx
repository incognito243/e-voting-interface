import {Typography} from 'antd';
import Title from "antd/es/typography/Title";
import {useUser} from "@/context/UserContext";
import {getFormattedExpirationTime} from "@/utils/time";
import {useEffect} from "react";

const {Paragraph, Text} = Typography;

interface IntroductionPageProps {
  votingName: string;
  numberOfCandidates: number;
  expirationTime: number;
  setDisableButton: (bool: boolean) => void;
}

export default function IntroductionPage({
                                           votingName,
                                           numberOfCandidates,
                                           expirationTime,
                                           setDisableButton,
                                         }: IntroductionPageProps) {
  const {user} = useUser()

  useEffect(() => {
    setDisableButton(false)
  })

  const formattedExpirationTime = getFormattedExpirationTime(expirationTime);
  const containerStyle = {
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
      {/* LEFT */}
      <div style={sectionStyle}>
        <Title level={4}>Introduction</Title>
        <Paragraph style={{fontSize: '18px'}}>
          You are e-voting in the {votingName}.
        </Paragraph>
        <Paragraph style={{fontSize: '18px'}}>
          You&#39;ve already voted! The last choice is taken into account. Next, make a choice.
        </Paragraph>
      </div>

      {/* MIDDLE */}
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

      {/* RIGHT */}
      <div style={sectionStyle}>
        <Title level={4}>My Information</Title>
        <div>
          <Text style={labelStyle}>Name: </Text>
          <Text style={valueStyle}>{user?.username}</Text>
        </div>
        <div>
          <Text style={labelStyle}>Citizen Id: </Text>
          <Text style={valueStyle}>{user?.personalCode}</Text>
        </div>
      </div>
    </div>
  );
}