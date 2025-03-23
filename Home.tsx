import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the User Management System</h2>
      <Link to="/users">Go to User List</Link>
    </div>
  );
};

export default Home;
