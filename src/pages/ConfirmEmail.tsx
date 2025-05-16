import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmEmail } from '../utils/auth-api';
import attireMeLogo from '../assets/images/logo.svg';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = (location.state as any)?.email || '';
  const [form, setForm] = useState({ email: emailFromState, token: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await confirmEmail(form);
      setSuccess('Email confirmed! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={attireMeLogo} alt="AttireMe" className="h-16 w-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-black text-center">Confirm Email</h2>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="token" placeholder="Token" value={form.token} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        {error && <div className="text-red-600 mb-4 text-sm font-medium">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-sm font-medium">{success}</div>}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-150" disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Email'}
        </button>
      </form>
    </div>
  );
};

export default ConfirmEmail; 