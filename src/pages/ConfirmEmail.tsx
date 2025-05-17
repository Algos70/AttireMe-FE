import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmEmail } from '../utils/auth-api';
import { toast } from 'react-toastify';

const ConfirmEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isProcessing = useRef(false);

  useEffect(() => {
    const handleConfirmation = async () => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      const email = searchParams.get('email');
      const token = searchParams.get('token');

      if (!email || !token) {
        toast.error('Invalid confirmation link');
        navigate('/register');
        return;
      }

      try {
        await confirmEmail({ email, token });
        toast.success('Email confirmed successfully!');
        navigate('/login');
      } catch (err: any) {
        toast.error(err.message || 'Email confirmation failed');
        navigate('/register');
      }
    };

    handleConfirmation();
  }, [searchParams, navigate]);

  return null;
};

export default ConfirmEmail; 