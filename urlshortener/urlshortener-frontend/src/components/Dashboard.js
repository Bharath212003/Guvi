import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [urlCount, setUrlCount] = useState(0);

  useEffect(() => {
    const fetchUrlCount = async () => {
      const response = await axios.get('http://localhost:5000/api/url/count', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUrlCount(response.data.count);
    };

    fetchUrlCount();
  }, []);

  return (
    <div className="container">
      <h2>Your Dashboard</h2>
      <p>Total URLs created: {urlCount}</p>
    </div>
  );
};

export default Dashboard;
