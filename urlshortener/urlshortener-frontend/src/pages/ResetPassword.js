import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword });
      setMessage('Your password has been successfully reset');
    } catch (err) {
      setError('Error resetting password');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default ResetPassword;
