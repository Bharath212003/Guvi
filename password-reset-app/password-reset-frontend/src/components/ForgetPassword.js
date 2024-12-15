import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/request-password-reset', { email });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgetPassword;
