import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { LoginMailType } from '../../types';
import './RegisterMail.css';

const RegisterMail: React.FC = () => {
  const [form] = Form.useForm();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [step, setStep] = useState<'email' | 'credentials'>('email');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    if (step === 'email') {
      const email = form.getFieldValue('mail');
      const emailValid = form.getFieldError('mail').length === 0 && email;
      setIsButtonDisabled(!emailValid);
    } else if (step === 'credentials') {
      setIsButtonDisabled(passwordValue.trim() === '');
    }
  }, [inputValue, passwordValue, form, step]);

  const onFinish = (values: any) => {
    if (step === 'email') {
      setStep('credentials');
      setIsButtonDisabled(true);
    } else {
      console.log('Final registration data:', values);
    }
  };

  return (
    <Form
      form={form}
      className="register-mail-form"
      name="register-mail"
      autoComplete="off"
      onFinish={onFinish}
      onFieldsChange={() => {
        if (step === 'email') {
          const email = form.getFieldValue('mail');
          const emailValid = form.getFieldError('mail').length === 0 && email;
          setIsButtonDisabled(!emailValid);
        }
      }}
    >
      {step === 'email' && (
        <Form.Item
          className="floating-label-container"
          name="mail"
          rules={[
            { type: 'email', message: 'Please enter a valid email!' },
            { required: true, message: 'Please input your email!' },
          ]}
        >
          <div>
            <Input
              id="email"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <label htmlFor="email" className={`floating-label ${isFocused || inputValue ? 'active' : ''}`}>
              Email
            </label>
          </div>
        </Form.Item>
      )}

      {step === 'credentials' && (
        <>
          <Form.Item
            name="name"
            className="floating-label-container"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <div>
              <Input
                id="name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <label
                htmlFor="name"
                className={`floating-label ${nameValue ? 'active' : ''}`}
              >
                Name
              </label>
            </div>
          </Form.Item>

          <Form.Item
  name="password"
  className="floating-label-container"
  rules={[{ required: true, message: 'Please input your password!' }]}
>
  <div>
    <Input.Password
      id="password"
      value={passwordValue}
      onChange={(e) => setPasswordValue(e.target.value)}
    />
    <label
      htmlFor="password"
      className={`floating-label ${passwordValue ? 'active' : ''}`}
    >
      Password
    </label>
  </div>
</Form.Item>
        </>
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-mail-submit"
          disabled={isButtonDisabled}
        >
          {step === 'email' ? 'Continue' : 'Continue'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterMail;
