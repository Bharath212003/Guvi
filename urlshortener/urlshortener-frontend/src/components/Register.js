import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { firstName, lastName, email, password });
      history.push('/login');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Register;
