import React, { useMemo } from 'react';
import { Modal, Button, Descriptions, Tag, Typography, Table, Alert } from 'antd';
import { ExtendedVotingServer } from '@/api/e-voting-service/types';
import { tsToDateString } from "@/utils/strings";

interface ServerDetailsModalProps {
  isVisible: boolean;
  onCancel: () => void;
  server: ExtendedVotingServer | null;
}

const ServerDetailsModal: React.FC<ServerDetailsModalProps> = ({
                                                                 isVisible,
                                                                 onCancel,
                                                                 server
                                                               }) => {
  if (!server) return null;

  const { voting_server, candidates } = server;

  let resultsMap: Record<number, number> = {};
  if (voting_server.results && voting_server.results !== "Not available yet") {
    try {
      resultsMap = JSON.parse(voting_server.results);
    } catch (e) {
      console.error("Failed to parse results:", e);
    }
  }

  const winningCandidate = useMemo(() => {
    if (Object.keys(resultsMap).length === 0) return null;

    let maxVotes = -1;
    let winnerIndex = -1;

    Object.entries(resultsMap).forEach(([indexStr, votes]) => {
      const index = parseInt(indexStr, 10);
      if (votes > maxVotes) {
        maxVotes = votes;
        winnerIndex = index;
      }
    });

    const isTie = Object.values(resultsMap).filter(votes => votes === maxVotes).length > 1;

    if (winnerIndex >= 0 && !isTie) {
      return candidates.find(c => c.index === winnerIndex);
    }
    return null;
  }, [resultsMap, candidates]);

  const hasTie = useMemo(() => {
    if (Object.keys(resultsMap).length === 0) return false;

    const voteValues = Object.values(resultsMap);
    const maxVotes = Math.max(...voteValues);
    return voteValues.filter(votes => votes === maxVotes).length > 1;
  }, [resultsMap]);

  return (
    <Modal
      title={`Voting Server Details: ${voting_server.server_name}`}
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>
      ]}
      width={800}
    >
      <Descriptions title="Server Information" bordered column={2}>
        <Descriptions.Item label="Server ID">{voting_server.server_id}</Descriptions.Item>
        <Descriptions.Item label="Server Name">{voting_server.server_name}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {voting_server.active ?
            <Tag color="green">Active</Tag> :
            <Tag color="red">Inactive</Tag>
          }
        </Descriptions.Item>
        <Descriptions.Item label="Voting Status">
          {voting_server.opened_vote ?
            <Tag color="blue">Opened</Tag> :
            <Tag color="processing">Voting</Tag>
          }
        </Descriptions.Item>
        <Descriptions.Item label="Number of Candidates">{voting_server.number_of_candidates}</Descriptions.Item>
        <Descriptions.Item label="Maximum Voters">{voting_server.maximum_number_of_voters}</Descriptions.Item>
        <Descriptions.Item label="Expiration Time" span={2}>
          {tsToDateString(voting_server.exp_time)}
        </Descriptions.Item>
        <Descriptions.Item label="Results Available" span={2}>
          {Object.keys(resultsMap).length > 0 ?
            <Tag color="green">Yes</Tag> :
            <Tag color="orange">No</Tag>}
        </Descriptions.Item>
        {Object.keys(resultsMap).length > 0 && (
          <Descriptions.Item label="Winning Candidate" span={2}>
            {hasTie ? (
              <Alert
                type="warning"
                message="Tie detected"
                description="Multiple candidates have the same number of votes"
                showIcon
              />
            ) : winningCandidate ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {winningCandidate.avatar_url && (
                  <img
                    src={winningCandidate.avatar_url}
                    alt="Winner"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                  />
                )}
                <div>
                  <div><strong>{winningCandidate.candidate_name}</strong></div>
                  <div>
                    <Tag color="gold">
                      {resultsMap[winningCandidate.index]} votes
                    </Tag>
                  </div>
                </div>
              </div>
            ) : (
              <span>No winner determined</span>
            )}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Typography.Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
        Candidates ({candidates.length})
      </Typography.Title>

      <Table
        dataSource={candidates}
        rowKey="citizen_id"
        pagination={false}
        columns={[
          {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            render: (index) => index + 1
          },
          {
            title: 'Name',
            dataIndex: 'candidate_name',
            key: 'candidate_name',
            render: (name, record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {winningCandidate && record.index === winningCandidate.index && (
                  <Tag color="gold">Winner</Tag>
                )}
                {name}
              </div>
            )
          },
          {
            title: 'Citizen ID',
            dataIndex: 'citizen_id',
            key: 'citizen_id'
          },
          {
            title: 'Avatar',
            dataIndex: 'avatar_url',
            key: 'avatar_url',
            render: (url) => url ?
              <img src={url} alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} /> :
              'No avatar'
          },
          {
            title: 'Votes',
            key: 'results',
            render: (_, record) => {
              if (Object.keys(resultsMap).length > 0) {
                const votes = resultsMap[record.index] || 0;
                const isHighest = votes === Math.max(...Object.values(resultsMap));
                return <Tag color={isHighest ? "gold" : "blue"}>{votes} votes</Tag>;
              }
              return 'No results yet';
            }
          }
        ]}
      />
    </Modal>
  );
};

export default ServerDetailsModal;