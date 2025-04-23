'use client';
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Table } from "antd";
import { putCreateVoting } from "@/api/e-voting-service/voting/putCreateVoting";
import { postOpenVote } from "@/api/e-voting-service/voting/postOpenVote";
import { postOpenVote as postActiveVote } from "@/api/e-voting-service/voting/postActiveVoting";
import { putCreateUser } from "@/api/e-voting-service/user/putCreateUser";
import { getAll } from "@/api/e-voting-service/voting/getAll";

const AdminPage = () => {
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVotingData = async () => {
    setLoading(true);
    try {
      const data = await getAll();
      setVotingData(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch voting data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotingData();
  }, []);

  const handleCreateUser = async (values: { username: string; email: string; citizen_id: string; password: string }) => {
    try {
      const response = await putCreateUser(values);
      message.success(`User created with code: ${response}`);
    } catch (error) {
      console.error(error);
      message.error("Failed to create user");
    }
  };

  const handleCreateVoting = async (values: { admin_id: string; server_name: string; number_of_candidates: number; maximum_number_of_voters: number }) => {
    try {
      const response = await putCreateVoting(values);
      message.success(`Voting created with code: ${response}`);
      fetchVotingData();
    } catch (error) {
      console.error(error);
      message.error("Failed to create voting");
    }
  };

  const handleOpenVote = async (values: { admin_id: string; server_id: string }) => {
    try {
      const response = await postOpenVote(values);
      message.success(`Vote opened: ${JSON.stringify(response)}`);
      fetchVotingData();
    } catch (error) {
      console.error(error);
      message.error("Failed to open vote");
    }
  };

  const handleActiveVote = async (values: { admin_id: string; server_id: string }) => {
    try {
      const response = await postActiveVote(values);
      message.success(`Vote activated: ${JSON.stringify(response)}`);
      fetchVotingData();
    } catch (error) {
      console.error(error);
      message.error("Failed to activate vote");
    }
  };

  const columns = [
    {
      title: "Server Name",
      dataIndex: "server_name",
      key: "server_name",
    },
    {
      title: "Number of Candidates",
      dataIndex: "number_of_candidates",
      key: "number_of_candidates",
    },
    {
      title: "Maximum Voters",
      dataIndex: "maximum_number_of_voters",
      key: "maximum_number_of_voters",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (active ? "Yes" : "No"),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1>Admin Page</h1>

      <Form layout="vertical" onFinish={handleCreateUser}>
        <h2>Create User</h2>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter a username" }]}>
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="citizen_id" label="Citizen ID" rules={[{ required: true, message: "Please enter a citizen ID" }]}>
          <Input placeholder="Enter citizen ID" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter a password" }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create User</Button>
        </Form.Item>
      </Form>

      <Form layout="vertical" onFinish={handleCreateVoting}>
        <h2>Create Voting</h2>
        <Form.Item name="admin_id" label="Admin ID" rules={[{ required: true, message: "Please enter an admin ID" }]}>
          <Input placeholder="Enter admin ID" />
        </Form.Item>
        <Form.Item name="server_name" label="Server Name" rules={[{ required: true, message: "Please enter a server name" }]}>
          <Input placeholder="Enter server name" />
        </Form.Item>
        <Form.Item name="number_of_candidates" label="Number of Candidates" rules={[{ required: true, message: "Please enter the number of candidates" }]}>
          <Input type="number" placeholder="Enter number of candidates" />
        </Form.Item>
        <Form.Item name="maximum_number_of_voters" label="Maximum Number of Voters" rules={[{ required: true, message: "Please enter the maximum number of voters" }]}>
          <Input type="number" placeholder="Enter maximum number of voters" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Voting</Button>
        </Form.Item>
      </Form>

      <Form layout="vertical" onFinish={handleOpenVote}>
        <h2>Open Voting</h2>
        <Form.Item name="admin_id" label="Admin ID" rules={[{ required: true, message: "Please enter an admin ID" }]}>
          <Input placeholder="Enter admin ID" />
        </Form.Item>
        <Form.Item name="server_id" label="Server ID" rules={[{ required: true, message: "Please enter a server ID" }]}>
          <Input placeholder="Enter server ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Open Voting</Button>
        </Form.Item>
      </Form>

      <Form layout="vertical" onFinish={handleActiveVote}>
        <h2>Activate Voting</h2>
        <Form.Item name="admin_id" label="Admin ID" rules={[{ required: true, message: "Please enter an admin ID" }]}>
          <Input placeholder="Enter admin ID" />
        </Form.Item>
        <Form.Item name="server_id" label="Server ID" rules={[{ required: true, message: "Please enter a server ID" }]}>
          <Input placeholder="Enter server ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Activate Voting</Button>
        </Form.Item>
      </Form>

      <h2>Manage Voting Information</h2>
      <Table dataSource={votingData} columns={columns} loading={loading} rowKey="server_id" />
    </div>
  );
};

export default AdminPage;