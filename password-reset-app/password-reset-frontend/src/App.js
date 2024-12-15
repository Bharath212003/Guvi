import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

export default App;
