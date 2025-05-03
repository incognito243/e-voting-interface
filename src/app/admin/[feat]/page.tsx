import {Table, Typography, Row, Col, Avatar} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {Candidate} from "@/api/e-voting-service/types";
import {useEffect} from "react";

const {Title, Text} = Typography;

interface BallotSelectionProps {
  data: Candidate[];
  selected: Candidate | null;
  setSelected: (candidate: Candidate | null) => void;
  setDisableButton: (disable: boolean) => void;
}

export default function BallotSelection(props: BallotSelectionProps) {
  useEffect(() => {
    if (!props.selected) {
      props.setDisableButton(true);
    } else {
      props.setDisableButton(false);
    }
  }, [props.selected]);

  const columns: ColumnsType<Candidate> = [
    {
      title: 'Idx',
      dataIndex: 'index',
      key: 'index',
      width: 70,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (url) => <Avatar src={url}/>,
      width: 70,
    },
    {
      title: 'Citizen Id',
      dataIndex: 'citizen_id',
      key: 'citizen_id',
    },
    {
      title: 'Name',
      dataIndex: 'candidate_name',
      key: 'candidate_name',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-white">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            rowKey="index"
            onRow={(record: Candidate) => ({
              onClick: () => {
                props.setSelected(record)
                props.setDisableButton(false)
              }
            })}
            rowClassName={(record) =>
              record.citizen_id === props.selected?.citizen_id ? 'bg-blue-50 cursor-pointer' : 'cursor-pointer'
            }
          />
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-4" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <Title level={5}>Candidate Details</Title>
            {props.selected ? (
              <div className="p-4 border rounded bg-gray-50" style={{textAlign: 'center'}}>
                <Avatar src={props.selected.avatar_url} size={64}/>
                <div className="mt-4">
                  <Text strong>Name:</Text> <Text>{props.selected.candidate_name}</Text>
                </div>
                <div className="mt-2">
                  <Text strong>Citizen ID:</Text> <Text>{props.selected.citizen_id}</Text>
                </div>
              </div>
            ) : (
              <Text className="text-gray-500" style={{textAlign: 'center'}}>
                Click on a candidate in the list to view details.
              </Text>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}