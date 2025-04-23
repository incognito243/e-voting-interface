"use client";
import React from 'react';
import {Card, Col, Row, Spin, Typography} from 'antd';
import {useVotingServerList} from "@/hook/useVotingServerList";
import {useRouter} from "next/navigation";
import {ExtendedVotingServer} from "@/api/e-voting-service/types";
import {VotingIcon} from "@/constant/icon";

const { Title } = Typography;
const VotingServerList: React.FC = () => {
  const router = useRouter();
  const {data, isLoading} = useVotingServerList();

  if (isLoading) {
    return (
      <div
        style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {data && data.map((server: ExtendedVotingServer) => (
          <Col key={server.voting_server.server_id} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable onClick={() => router.push(`/voting/${server.voting_server.server_id}`)}>
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div><VotingIcon/></div>
                <Title level={3}>{server.voting_server.server_name}</Title>
                <p>{server.voting_server.number_of_candidates} Candidates</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VotingServerList;
