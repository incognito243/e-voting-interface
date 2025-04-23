import React from 'react';
import { Modal, Form, Input } from 'antd';

interface AccountFormValues {
  accountAlias: string;
  apiKey: string;
  secretKey: string;
}

interface AccountModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: AccountFormValues) => void;
}

const CreateUserModal: React.FC<AccountModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm<AccountFormValues>();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Modal
      open={visible}
      title="Add Account"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Submit"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Account Alias"
          name="accountAlias"
          rules={[{ required: true, message: 'Please input the account alias!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="API Key"
          name="apiKey"
          rules={[{ required: true, message: 'Please input the API Key!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Secret Key"
          name="secretKey"
          rules={[{ required: true, message: 'Please input the Secret Key!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
