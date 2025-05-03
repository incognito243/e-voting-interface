import { Form, Input, Alert } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useUser } from "@/context/UserContext";
import { login } from "@/api/e-voting-service/user/login";

interface ActionProps {
  setCurrentStep: (num: number) => void;
  setDisableButton: (disable: boolean) => void;
}

const Login = forwardRef((props: ActionProps, ref) => {
  const { setUser } = useUser();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
  }));

  const handleLogin = async (values: { username: string; password: string; personalCode: string }) => {
    try {
      const response = await login({
        username: values.username,
        personal_code: values.personalCode,
        password: values.password
      });

      localStorage.setItem('authToken', response.token);

      setUser({
        username: values.username,
        citizen_id: values.personalCode,
        citizen_name: response.user.citizen_name,
        verified: response.user.verified,
        email: response.user.email,
        compressed_key: response.user.compressed_key,
        is_admin: response.user.is_admin
      });

      setErrorMessage(null);
      props.setCurrentStep(1);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleFieldsChange = () => {
    const isFormValid = form.getFieldsError().every(({ errors }) => errors.length === 0) &&
      form.getFieldsValue(['username', 'personalCode', 'password']).username &&
      form.getFieldsValue(['username', 'personalCode', 'password']).personalCode &&
      form.getFieldsValue(['username', 'personalCode', 'password']).password;

    props.setDisableButton(!isFormValid);
  };

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded shadow-md">
        <Form
          name="login"
          layout="vertical"
          form={form}
          className="w-full"
          onFinish={handleLogin}
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Personal Code"
            name="personalCode"
            rules={[{ required: true, message: 'Please input your personal code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{
              required: true,
              message: 'Please input your password!',
              min: 6,
              max: 20,
              type: 'string',
              pattern: /^[a-zA-Z0-9]+$/,
            }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage(null)}
            style={{ marginBottom: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          />
        )}
      </div>
    </div>
  );
});

Login.displayName = 'Login';

export default Login;