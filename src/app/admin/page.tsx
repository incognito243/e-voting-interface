'use client';
import React, { useEffect, useState } from "react";
import { Button, message, Table, Tabs, Typography, Alert, Result, Form, Input, Card, Space } from "antd";
import { getAll } from "@/api/e-voting-service/voting/getAll";
import { useUser } from "@/context/UserContext";
import { getAllUser } from "@/api/e-voting-service/user/getAllUser";
import { ExtendedVotingServer, InfoUser, LoginRequest } from "@/api/e-voting-service/types";
import { OpenVoteRequest } from "@/api/e-voting-service/types";
import { postOpenVote } from "@/api/e-voting-service/voting/postOpenVote";
import CreateVotingServer from "@/components/Modal/CreateVotingServer";
import CreateUserModal from "@/components/Modal/CreateUserModal";
import SignOpenVotingModal from "@/components/Modal/SignOpenVotingModal";
import WalletConnector from "@/components/WalletConnector";
import ServerDetailsModal from "@/components/Modal/ServerDetailsModal";
import { ActiveVotingServerRequest } from "@/api/e-voting-service/types";
import { postActiveVoting } from "@/api/e-voting-service/voting/postActiveVoting";
import { Tag } from "antd";
import { useAccount, useSignMessage } from 'wagmi';
import { useCheckConnectWallet } from "@/hook/useCheckConnectWallet";
import { login } from "@/api/e-voting-service/user/login";

const { Title } = Typography;

const AdminLoginForm = ({ onLogin }: { onLogin: (values: LoginRequest) => Promise<void> }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const loginData: LoginRequest = {
        username: values.username,
        personal_code: values.personal_code,
        password: values.password
      };
      await onLogin(loginData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Admin Login" style={{ maxWidth: 400, margin: '0 auto', marginTop: 50 }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="personal_code"
          label="Personal Code"
          rules={[{ required: true, message: "Please enter your personal Code" }]}
        >
          <Input placeholder="Enter personal code" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login as Admin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const AdminManagementPage = () => {
  const [votingServers, setVotingServers] = useState<ExtendedVotingServer[]>([]);
  const [users, setUsers] = useState<InfoUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isCreateVotingModalVisible, setIsCreateVotingModalVisible] = useState(false);
  const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState(false);
  const [isSignOpenVotingModalVisible, setIsSignOpenVotingModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<{ id: string, name: string } | null>(null);
  const [detailServer, setDetailServer] = useState<ExtendedVotingServer | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const { user: admin, setUser } = useUser();
  const { isConnected } = useAccount();
  const { checkConnectWallet } = useCheckConnectWallet();
  const { signMessageAsync } = useSignMessage();
  const isUserAdmin = admin?.is_admin === true;

  const handleAdminLogin = async (values: LoginRequest) => {
    try {
      setLoginError("");
      const response = await login({
        username: values.username,
        personal_code: values.personal_code,
        password: values.password
      });

      if (!response.user.is_admin) {
        setLoginError("This account does not have administrator privileges.");
        return;
      }

      localStorage.setItem('authToken', response.token);

      setUser({
        username: values.username,
        citizen_id: values.personal_code,
        citizen_name: response.user.citizen_name,
        verified: response.user.verified,
        email: response.user.email,
        compressed_key: response.user.compressed_key,
        is_admin: response.user.is_admin
      });

      message.success("Logged in successfully as administrator");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const initiateOpenVoting = async (serverId: string, serverName: string) => {
    if (!isConnected) {
      await checkConnectWallet();
      return;
    }

    setSelectedServer({ id: serverId, name: serverName });
    setIsSignOpenVotingModalVisible(true);
  };

  const handleCreateVotingClick = async () => {
    if (!isConnected) {
      await checkConnectWallet();
      return;
    }
    setIsCreateVotingModalVisible(true);
  };

  const fetchVotingServers = async () => {
    if (!isUserAdmin) return;

    setLoading(true);
    try {
      const data = await getAll();
      setVotingServers(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch voting servers");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenVoting = async (signature: string) => {
    if (!selectedServer) return;

    try {
      const params: OpenVoteRequest = {
        server_id: selectedServer.id,
        server_name: selectedServer.name,
        admin_id: admin?.username ? admin.username : "",
        signature_hex: signature,
      };

      await postOpenVote(params);
      message.success("Voting opened successfully");
      fetchVotingServers();
    } catch (error) {
      console.error(error);
      message.error("Failed to open voting");
    } finally {
      setSelectedServer(null);
    }
  };

  const handleToggleActive = async (serverName: string, activate: boolean) => {
    if (!isConnected) {
      await checkConnectWallet();
      return;
    }

    try {
      setLoading(true);
      const messageToSign = `Admin: ${admin?.username} is acting in server ${serverName}`;
      const signature = await signMessageAsync({ message: messageToSign });

      const params: ActiveVotingServerRequest = {
        server_name: serverName,
        admin_id: admin?.citizen_id || "",
        signature_hex: signature,
      };

      await postActiveVoting(params);
      message.success(`Server ${activate ? 'activated' : 'deactivated'} successfully`);
      fetchVotingServers();
    } catch (error) {
      console.error(error);
      message.error(`Failed to ${activate ? 'activate' : 'deactivate'} server`);
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    if (!isUserAdmin) return;

    setLoading(true);
    try {
      const data = await getAllUser();
      setUsers(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAdmin) {
      fetchVotingServers();
      fetchUsers();
    }
  }, [isUserAdmin]);

  if (!admin) {
    return (
      <div style={{ padding: "24px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>Admin Dashboard</Title>
        <AdminLoginForm onLogin={handleAdminLogin} />
        {loginError && (
          <Alert
            message="Login Failed"
            description={loginError}
            type="error"
            showIcon
            style={{ maxWidth: 400, margin: "16px auto" }}
          />
        )}
      </div>
    );
  }

  if (!isUserAdmin) {
    return (
      <Result
        status="403"
        title="Admin Access Required"
        subTitle="Your account does not have administrator privileges."
        extra={
          <Button type="primary" onClick={() => {
            localStorage.removeItem('token');
            setUser(null);
          }}>
            Logout and Try Another Account
          </Button>
        }
      />
    );
  }

  const votingServerColumns = [
    { title: "Server ID", dataIndex: ["voting_server", "server_id"], key: "server_id" },
    { title: "Server Name", dataIndex: ["voting_server", "server_name"], key: "server_name" },
    {
      title: "State",
      dataIndex: ["voting_server", "opened_vote"],
      key: "opened_vote",
      render: (val: boolean) => (
        val ?
          <Tag color="blue">Opened</Tag> :
          <Tag color="processing">Voting</Tag>
      )
    },    { title: "Active", dataIndex: ["voting_server", "active"], key: "active", render: (val: boolean) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
    },
    { title: "Number of Candidates", dataIndex: ["voting_server", "number_of_candidates"], key: "number_of_candidates" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: ExtendedVotingServer) => (
        <Space>
          <Button
            type="primary"
            disabled={!record.voting_server.active || record.voting_server.opened_vote}
            onClick={() => initiateOpenVoting(record.voting_server.server_id, record.voting_server.server_name)}
          >
            {record.voting_server.opened_vote ? "Opened" : "Open Voting"}
          </Button>
          <Button
            type={record.voting_server.active ? "default" : "primary"}
            disabled={record.voting_server.active}
            onClick={() => handleToggleActive(record.voting_server.server_name, !record.voting_server.active)}
          >
            Activated
          </Button>
          <Button
            onClick={() => {
              setDetailServer(record);
              setIsDetailModalVisible(true);
            }}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {title: "Username", dataIndex: "username", key: "username"},
    {title: "Citizen ID", dataIndex: "citizen_id", key: "citizen_id"},
    {title: "Name", dataIndex: "citizen_name", key: "citizen_name"},
    {title: "Email", dataIndex: "email", key: "email"},
    {title: "Verified", dataIndex: "verified", key: "verified", render: (val: boolean) => (val ? "Yes" : "No")},
    {title: "Admin", dataIndex: "is_admin", key: "is_admin", render: (val: boolean) => (val ? "✔" : "✘")},
  ];

  return (
    <div style={{padding: "24px"}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Title level={3}>Admin</Title>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Typography.Text>
            Logged in as: <strong>{admin.username}</strong>
          </Typography.Text>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              setUser(null);
            }}
            size="small"
          >
            Logout
          </Button>
          <WalletConnector />
        </div>
      </div>

      {!isConnected && (
        <Alert
          message="Wallet not connected"
          description="Please connect your wallet to sign transactions for voting operations."
          type="warning"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Voting Servers" key="1">
          <Button
            type="primary"
            onClick={handleCreateVotingClick}
            style={{ marginBottom: "16px" }}
          >
            Create Voting Server
          </Button>
          <Table
            columns={votingServerColumns}
            dataSource={votingServers}
            rowKey={(record) => record.voting_server.server_id}
            loading={loading}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Users" key="2">
          <Button
            type="primary"
            onClick={() => setIsCreateUserModalVisible(true)}
            style={{ marginBottom: "16px" }}
          >
            Create User
          </Button>
          <Table
            columns={userColumns}
            dataSource={users}
            rowKey={(record) => record.citizen_id}
            loading={loading}
          />
        </Tabs.TabPane>
      </Tabs>

      <CreateVotingServer
        isVisible={isCreateVotingModalVisible}
        onCancel={() => setIsCreateVotingModalVisible(false)}
        onSuccess={fetchVotingServers}
        admin={admin}
      />

      <CreateUserModal
        isVisible={isCreateUserModalVisible}
        onCancel={() => setIsCreateUserModalVisible(false)}
        onSuccess={fetchUsers}
      />

      <SignOpenVotingModal
        isVisible={isSignOpenVotingModalVisible}
        onCancel={() => setIsSignOpenVotingModalVisible(false)}
        onSign={handleOpenVoting}
        adminId={admin?.username || ""}
        serverId={selectedServer?.id || ""}
        serverName={selectedServer?.name || ""}
      />

      <ServerDetailsModal
        isVisible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        server={detailServer}
      />
    </div>
  );
};

export default AdminManagementPage;