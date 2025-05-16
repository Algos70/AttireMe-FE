import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils/cookies';
import { useUser } from '../contexts/UserContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import attireMeLogo from '../assets/images/logo.svg';
import { authenticateUser } from '../utils/auth-api';
import { decodeToken } from '../utils/jwt';
import { getUserByEmail, getCreatorByUsername } from '../utils/api';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setUserProfile, setCreatorProfile } = useUserProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authenticateUser(form);
      
      // Save tokens to cookies
      setCookie('id_token', res.jwToken, 7); // 7 days
      setCookie('refresh_token', res.refreshToken, 30); // 30 days
      
      // Decode and set user in context
      const decodedUser = decodeToken(res.jwToken);
      setUser(decodedUser);

      // Check user role and fetch appropriate profile
      const userRole = decodedUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
      if (userRole === "Creator") {
        // Fetch creator profile using username
        const creatorRes = await getCreatorByUsername(decodedUser.username);
        if (creatorRes?.data) {
          setCreatorProfile(creatorRes.data);
        }
      } else {
        // Fetch regular user profile
        const profileRes = await getUserByEmail(form.email);
        if (profileRes?.data) {
          setUserProfile(profileRes.data);
        }
      }
      
      navigate('/h/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
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
        <h2 className="text-2xl font-bold mb-6 text-black text-center">Login</h2>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        {error && <div className="text-red-600 mb-4 text-sm font-medium">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-150" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login; 