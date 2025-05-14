import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography, message, Steps, Progress, Alert, Pagination } from 'antd';
import {CreateVotingServerRequest, InfoUser} from '@/api/e-voting-service/types';
import { putCreateVoting } from '@/api/e-voting-service/voting/putCreateVoting';
import { useAccount, useSignMessage } from 'wagmi';
import { LoadingOutlined } from '@ant-design/icons';
import { SuccessIcon } from '@/constant/icon';

interface CreateVotingServerProps {
  isVisible: boolean;
  onCancel: () => void;
  admin: InfoUser | null;
  onSuccess: () => void;
}

function getIconByStep(targetStep: number, currentStep: number) {
  if (currentStep === targetStep) {
    return <LoadingOutlined />;
  }
  if (currentStep > targetStep) {
    return <SuccessIcon size={32} />;
  }
  return undefined;
}
const CreateVotingServer: React.FC<CreateVotingServerProps> = ({
                                                                 isVisible,
                                                                 onCancel,
                                                                 admin,
                                                                 onSuccess
                                                               }) => {
  const [formValues, setFormValues] = useState<CreateVotingServerRequest>();
  const [isSignModalVisible, setIsSignModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [form] = Form.useForm();
  const [currentCandidatePage, setCurrentCandidatePage] = useState(1);
  const candidatesPerPage = 5;
  const onFormFinish = (values: CreateVotingServerRequest) => {
    const numCandidates = Number(values.number_of_candidates);
    const candidatesCount = values.candidates.length;

    if (numCandidates !== candidatesCount) {
      return;
    }

    setValidationError(null);

    const formattedValues: CreateVotingServerRequest = {
      ...values,
      number_of_candidates: Number(values.number_of_candidates),
      maximum_number_of_voters: Number(values.maximum_number_of_voters),
      candidates: values.candidates.map((candidate, index) => ({
        ...candidate,
        index
      }))
    };

    setFormValues(formattedValues);
    setIsSignModalVisible(true);
  };

  const updateCandidatesList = (value: number) => {
    const currentCandidates = form.getFieldValue('candidates') || [];
    const newCount = Number(value);

    if (isNaN(newCount) || newCount < 1) return;

    if (newCount > currentCandidates.length) {
      const newCandidates = [...currentCandidates];
      for (let i = currentCandidates.length; i < newCount; i++) {
        newCandidates.push({ candidate_name: '', citizen_id: '', avatar_url: 'https://i.pinimg.com/236x/f1/ee/e4/f1eee47021845369982abf61c629c7d6.jpg' });
      }
      form.setFieldsValue({ candidates: newCandidates });
    } else if (newCount < currentCandidates.length) {
      form.setFieldsValue({
        candidates: currentCandidates.slice(0, newCount)
      });
    }

    if (newCount === currentCandidates.length) {
      setValidationError(null);
    }
  };

  const handleSignAndCreate = async () => {
    if (!address || !formValues) return;

    setIsLoading(true);
    setCurrentStep(0);

    try {
      const messageToSign = `Admin: ${admin?.username} is acting in server ${formValues.server_name}`;
      const signature = await signMessageAsync({ message: messageToSign });

      setCurrentStep(1);

      const completeValues: CreateVotingServerRequest = {
        ...formValues,
        admin_id: admin?.citizen_id || "",
        signature_hex: signature,
        contract_address: formValues.contract_address || "",
        exp_time: new Date(formValues.exp_time).getTime() || new Date(Date.now() + 86400000).getTime(),
      };

      const response = await putCreateVoting(completeValues);
      message.success(`Voting server created with code: ${response}`);

      setIsSignModalVisible(false);
      onCancel();
      onSuccess();
    } catch (error) {
      console.error("Error creating voting server:", error);
      message.error("Failed to create voting server");
    } finally {
      setIsLoading(false);
      setCurrentStep(-1);
    }
  };

  const renderForm = () => (
    <Modal
      title="Create Voting Server"
      open={isVisible && !isSignModalVisible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFormFinish} form={form}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Form.Item
            name="server_name"
            label="Server Name"
            rules={[{ required: true, message: "Please enter a server name" }]}
          >
            <Input placeholder="Enter server name" />
          </Form.Item>
          <Form.Item
            name="number_of_candidates"
            label="Number of Candidates"
            rules={[
              { required: true, message: "Please enter the number of candidates" },
              {
                validator: (_, value) => {
                  const numValue = Number(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return Promise.reject("Number of candidates must be at least 1");
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              type="number"
              min={1}
              placeholder="Enter number of candidates"
              onChange={(e) => updateCandidatesList(Number(e.target.value))}
            />
          </Form.Item>

          <Form.Item
            name="maximum_number_of_voters"
            label="Maximum Voters"
            rules={[
              { required: true, message: "Please enter maximum number of voters" },
              {
                validator: (_, value) => {
                  const numValue = Number(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return Promise.reject("Maximum voters must be at least 1");
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input type="number" min={1} placeholder="Enter maximum number of voters" />
          </Form.Item>
          <Form.Item
            name="exp_time"
            label="Expiration Time"
          >
            <Input type="datetime-local" placeholder="Enter expiration time" />
          </Form.Item>
          <Form.Item
            name="contract_address"
            label="Contract Address"
          >
            <Input placeholder="Enter contract address" />
          </Form.Item>
        </div>

        <Form.List
          name="candidates"
          initialValue={[{ candidate_name: '', citizen_id: '', avatar_url: 'https://i.pinimg.com/236x/f1/ee/e4/f1eee47021845369982abf61c629c7d6.jpg' }]}
        >
          {(fields, { add, remove }) => {
            const totalCandidates = fields.length;
            const totalPages = Math.ceil(totalCandidates / candidatesPerPage);

            const startIndex = (currentCandidatePage - 1) * candidatesPerPage;
            const endIndex = Math.min(startIndex + candidatesPerPage, totalCandidates);
            const visibleFields = fields.slice(startIndex, endIndex);

            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Typography.Title level={5} style={{ margin: 0 }}>Candidates</Typography.Title>
                  <Typography.Text>
                    Showing {startIndex + 1}-{endIndex} of {totalCandidates} candidates
                  </Typography.Text>
                </div>

                {visibleFields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'candidate_name']}
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Candidate name is required' }]}
                    >
                      <Input placeholder="Candidate Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'citizen_id']}
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Citizen ID is required' }]}
                    >
                      <Input placeholder="Citizen ID" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'avatar_url']}
                      style={{ flex: 1 }}
                    >
                      <Input
                        placeholder="Avatar URL"
                        onChange={(e) => {
                          // Force re-render of the preview when URL changes
                          form.setFieldsValue({
                            candidates: {
                              ...form.getFieldValue('candidates'),
                              [name]: {
                                ...form.getFieldValue(['candidates', name]),
                                avatar_url: e.target.value
                              }
                            }
                          });
                        }}
                        addonAfter={
                          <img
                            key={form.getFieldValue(['candidates', name, 'avatar_url'])} // Add key to force re-render
                            src={form.getFieldValue(['candidates', name, 'avatar_url']) || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.getFieldValue(['candidates', name, 'candidate_name']) || 'Candidate')}&background=random`}
                            alt="Preview"
                            style={{ width: 24, height: 24, borderRadius: '50%' }}
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.getFieldValue(['candidates', name, 'candidate_name']) || 'Candidate')}&background=random`;
                            }}
                          />
                        }
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        onClick={() => {
                          remove(name);
                          const currentNum = Number(form.getFieldValue('number_of_candidates'));
                          if (!isNaN(currentNum) && currentNum > 1) {
                            form.setFieldsValue({ number_of_candidates: currentNum - 1 });
                          }

                          if (currentCandidatePage > 1 && startIndex >= totalCandidates - 1) {
                            setCurrentCandidatePage(currentCandidatePage - 1);
                          }
                        }}
                        type="text"
                        danger
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}

                {totalPages > 1 && (
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      current={currentCandidatePage}
                      total={totalCandidates}
                      pageSize={candidatesPerPage}
                      onChange={setCurrentCandidatePage}
                      size="small"
                      showSizeChanger={false}
                    />
                  </div>
                )}

                <Button
                  type="dashed"
                  onClick={() => {
                    add({ candidate_name: '', citizen_id: '', avatar_url: 'https://i.pinimg.com/236x/f1/ee/e4/f1eee47021845369982abf61c629c7d6.jpg' });
                    const currentNum = Number(form.getFieldValue('number_of_candidates'));
                    if (!isNaN(currentNum)) {
                      form.setFieldsValue({ number_of_candidates: currentNum + 1 });
                    }

                    const newTotalCandidates = totalCandidates + 1;
                    const newTotalPages = Math.ceil(newTotalCandidates / candidatesPerPage);
                    setCurrentCandidatePage(newTotalPages);
                  }}
                  block
                  style={{ marginTop: '16px' }}
                >
                  Add Candidate
                </Button>
              </>
            );
          }}
        </Form.List>
        {validationError && (
          <Alert
            message="Validation Error"
            description={validationError}
            type="error"
            showIcon
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
        )}
        <Form.Item style={{ marginTop: "16px" }}>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  );

  const renderSignModal = () => (
    <Modal
      open={isSignModalVisible}
      footer={null}
      onCancel={() => setIsSignModalVisible(false)}
      maskClosable={false}
    >
      <div className="flex flex-col gap-6">
        <Typography.Title level={3}>Sign Message</Typography.Title>

        <Progress percent={((currentStep + 1) / 2) * 100} />

        <div className="flex flex-col gap-2" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Steps current={currentStep} direction="vertical">
            <Steps.Step title="Sign creation message" icon={getIconByStep(0, currentStep)} />
            <Steps.Step title="Submit voting server" icon={getIconByStep(1, currentStep)} />
          </Steps>
        </div>

        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={handleSignAndCreate}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>Sign and Create</Typography.Title>
        </Button>
      </div>
    </Modal>
  );

  return (
    <>
      {renderForm()}
      {renderSignModal()}
    </>
  );
};

export default CreateVotingServer;