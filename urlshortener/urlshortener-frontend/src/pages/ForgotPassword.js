import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('A password reset link has been sent to your email');
    } catch (err) {
      setError('Error sending reset link');
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
