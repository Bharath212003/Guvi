import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSave = async (user) => {
    if (user.id) {
      // Update user
      await axios.put(`${API_URL}/${user.id}`, user);
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      // Add user
      const response = await axios.post(API_URL, user);
      setUsers([...users, response.data]);
    }
    setSelectedUser(null);
  };

  return (
    <div>
      <UserForm onSave={handleSave} selectedUser={selectedUser} />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
