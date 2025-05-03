import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { CreateUserRequest } from '@/api/e-voting-service/types';
import { putCreateUser } from '@/api/e-voting-service/user/putCreateUser';

interface CreateUserModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
                                                           isVisible,
                                                           onCancel,
                                                           onSuccess
                                                         }) => {
  const handleCreateUser = async (values: CreateUserRequest) => {
    try {
      const response = await putCreateUser(values);
      message.success(`User created with code: ${response}`);
      onCancel();
      onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Failed to create user");
    }
  };

  return (
    <Modal
      title="Create User"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={handleCreateUser}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="citizen_id"
            label="Citizen ID"
            rules={[{ required: true, message: "Please enter a citizen ID" }]}
          >
            <Input placeholder="Enter citizen ID" />
          </Form.Item>
          <Form.Item
            name="citizen_name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="public_key"
            label="Public Key"
            rules={[{ required: true, message: "Please enter a public key" }]}
          >
            <Input placeholder="Enter public key" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="is_admin"
            label="Admin"
            rules={[{ required: true, message: "Please select an admin option" }]}
          >
            <Select placeholder="Select admin status">
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item style={{ marginTop: "16px" }}>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;