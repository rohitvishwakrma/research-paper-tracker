import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLogOut, FiEdit2, FiKey } from 'react-icons/fi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage or context
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    // TODO: Implement backend API for password change
    setMessage('Password change functionality is not implemented yet.');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1026] via-[#181e3a] to-[#1a1440]">
      <div className="w-full max-w-lg p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10 relative flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-xl mb-4">
            <FiUser className="text-white text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">{user.email}</h2>
          <div className="flex items-center text-slate-300">
            <FiMail className="mr-2" />
            {user.email}
          </div>
        </div>
        <button
          className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition shadow-lg mb-4 flex items-center justify-center"
          onClick={() => setShowChangePassword((v) => !v)}
        >
          <FiKey className="mr-2" /> Change Password
        </button>
        {showChangePassword && (
          <form onSubmit={handleChangePassword} className="w-full space-y-4 mb-4">
            <input
              type="password"
              placeholder="Old Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition shadow-lg"
            >
              Update Password
            </button>
            {message && <div className="text-center text-red-400 mt-2">{message}</div>}
          </form>
        )}
        <button
          className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition shadow-lg flex items-center justify-center"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
