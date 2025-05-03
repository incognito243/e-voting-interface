import React from 'react';
import { Typography, Alert, Table, Tag, Button } from 'antd';
import { ExtendedVotingServer } from '@/api/e-voting-service/types';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface VotingResultsProps {
  server: ExtendedVotingServer;
}

const VotingResults: React.FC<VotingResultsProps> = ({ server }) => {
  const router = useRouter();

  let resultsMap: Record<number, number> = {};
  if (server.voting_server.results && server.voting_server.results !== "Not available yet") {
    try {
      resultsMap = JSON.parse(server.voting_server.results);
    } catch (e) {
      console.error("Failed to parse results:", e);
    }
  }

  const winnerData = (() => {
    if (Object.keys(resultsMap).length === 0) return null;

    let maxVotes = -1;
    let winnerIndices: number[] = [];

    Object.entries(resultsMap).forEach(([indexStr, votes]) => {
      const index = parseInt(indexStr, 10);
      const voteCount = votes as number;

      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        winnerIndices = [index];
      } else if (voteCount === maxVotes) {
        winnerIndices.push(index);
      }
    });

    return {
      isTie: winnerIndices.length > 1,
      winnerIndices,
      maxVotes
    };
  })();

  return (
    <div style={{ padding: "20px 0" }}>
      <Title level={4} className="text-green-700 mt-4">Voting Completed</Title>
      <Typography.Paragraph className="text-gray-700">
        The voting process has been successfully completed. Below are the results.
      </Typography.Paragraph>

      <div style={{ marginTop: 24, marginBottom: 24,}}>
        <Title level={5}>Results for {server.voting_server.server_name}</Title>

        {!server.voting_server.results || server.voting_server.results === "Not available yet" ? (
          <Alert message="Results are not available yet" type="info" showIcon />
        ) : Object.keys(resultsMap).length === 0 ? (
          <Alert message="No votes have been registered" type="info" showIcon />
        ) : (
          <div>
            {winnerData?.isTie ? (
              <Alert
                type="warning"
                message="Tie detected"
                description="Multiple candidates have the same number of votes"
                showIcon
                style={{ marginBottom: 16 }}
              />
            ) : (
              <div style={{ marginBottom: 16 }}>
                {server.candidates
                  .filter(c => winnerData?.winnerIndices.includes(c.index))
                  .map(winner => (
                    <div key={winner.index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        padding: 8,
                      }}>
                        {winner.avatar_url ? (
                          <img
                            src={winner.avatar_url}
                            alt={winner.candidate_name}
                            style={{ width: 64, height: 64, borderRadius: '50%' }}
                          />
                        ) : (
                          <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {winner.candidate_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          Winner: {winner.candidate_name}
                        </Typography.Title>
                        <Typography.Text>
                          <Tag color="gold">{winnerData?.maxVotes} votes</Tag>
                        </Typography.Text>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <Table
              dataSource={server.candidates}
              rowKey="citizen_id"
              pagination={false}
              columns={[
                {
                  title: 'Candidate',
                  dataIndex: 'candidate_name',
                  key: 'candidate_name',
                  render: (name, record) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {record.avatar_url && (
                        <img
                          src={record.avatar_url}
                          alt={name}
                          style={{ width: 32, height: 32, borderRadius: '50%' }}
                        />
                      )}
                      <span>
                        {name}
                        {winnerData && !winnerData.isTie && winnerData.winnerIndices.includes(record.index) && (
                          <Tag color="gold" style={{ marginLeft: 8 }}>Winner</Tag>
                        )}
                      </span>
                    </div>
                  )
                },
                {
                  title: 'Votes',
                  key: 'votes',
                  render: (_, record) => {
                    const votes = resultsMap[record.index] || 0;
                    const isHighest = votes === winnerData?.maxVotes;
                    return (
                      <Tag color={isHighest ? "gold" : "blue"}>
                        {votes} {votes === 1 ? 'vote' : 'votes'}
                      </Tag>
                    );
                  }
                }
              ]}
            />
          </div>
        )}
      </div>

      <Button
        style={{ marginRight: "auto" }}
        onClick={() => {
          router.push("/voting");
        }}
      >
        Back to Voting List
      </Button>
    </div>
  );
};

export default VotingResults;