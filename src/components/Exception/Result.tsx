import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {Typography} from 'antd';

const {Title, Paragraph, Text} = Typography;

type Status = 'success' | 'error';

interface ResultProps {
  status: Status;
}

const ResultIcon = ({status}: { status: Status }) => {
  return status === 'error' ? (
    <CloseCircleOutlined style={{fontSize: 64, color: 'orangered'}}/>
  ) : (
    <CheckCircleOutlined style={{fontSize: 64, color: 'green'}}/>
  );
};

const ResultContent = ({status}: { status: Status }) => {
  if (status === 'error') {
    return (
      <div style={{
        padding: '20px 0'
      }}>
        <Paragraph className="mt-4 text-blue-900">
          An error occurred while retrieving the account information.
          Please check the details and try again. For further assistance, contact
          <a href="mailto:21020054@vnu.edu.vn" target="_blank" rel="noreferrer"> support</a>.
        </Paragraph>
        <Text type="danger" strong className="text-lg">
          Failed to retrieve ID card information.
        </Text>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px 0'
    }}>
      <Title level={4} className="text-green-700 mt-4">ID Card Detected Successfully</Title>
      <Paragraph className="text-gray-700">
        The ID card has been successfully read. You can now proceed with authentication or signing.
      </Paragraph>
      <Text type="secondary">Thank you for using our secure e-services.</Text>
    </div>
  );
};

export default function Result({status}: ResultProps) {
  return (
    <div style={{
      padding: '20px 0',
      margin: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <ResultIcon status={status}/>
      <ResultContent status={status}/>
    </div>
  );
}