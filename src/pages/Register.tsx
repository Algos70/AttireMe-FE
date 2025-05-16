import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import attireMeLogo from '../assets/images/logo.svg';
import { registerUser } from '../utils/auth-api';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    userType: 'User',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerUser(form);
      navigate('/confirm-email', { state: { email: form.email } });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
        <h2 className="text-2xl font-bold mb-6 text-black text-center">Register</h2>
        <input name="userName" placeholder="Username" value={form.userName} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <select name="userType" value={form.userType} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="User">User</option>
          <option value="Creator">Creator</option>
        </select>
        {error && <div className="text-red-600 mb-4 text-sm font-medium">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-150" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register; 