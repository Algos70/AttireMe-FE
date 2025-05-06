import { Button, Form, Input } from 'antd';
import { LoginMailType } from '../../types';
import { useEffect, useState } from 'react';
import './RegisterMail.css';

const RegisterMail: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  const onFinish = (values: LoginMailType) => {
    if (!isEmailValidated) {
      setIsEmailValidated(true);
    } else {
      console.log('Register attempt with:', values);
    }
  };

  return (
    <Form className="register-mail-form" name="register-mail" initialValues={{ remember: true }} autoComplete="off" onFinish={onFinish}>
      <Form.Item<LoginMailType>
        className="floating-label-container"
        name="mail"
        rules={[
          { type: 'email', message: 'Please enter a valid email!' },
          { required: true, message: 'Please input your email!' },
        ]}
      >
        <div>
          <Input id="email" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => setInputValue(e.target.value)} />
          <label htmlFor="email" className={`floating-label ${isFocused || inputValue ? 'active' : ''}`}>
            Email
          </label>
        </div>
      </Form.Item>

      {isEmailValidated && (
        <>
          <Form.Item<LoginMailType>
            className="floating-label-container"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <div>
              <Input.Password id="password" />
              <label htmlFor="password" className="floating-label active">
                Password
              </label>
            </div>
          </Form.Item>

          <Form.Item<LoginMailType>
            className="floating-label-container"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <div>
              <Input.Password id="confirmPassword" />
              <label htmlFor="confirmPassword" className="floating-label active">
                Confirm Password
              </label>
            </div>
          </Form.Item>
        </>
      )}

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" className="register-mail-submit">
          {isEmailValidated ? 'Create Account' : 'Continue'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterMail; 