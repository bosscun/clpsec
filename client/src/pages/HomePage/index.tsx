import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      Home<br/>
      <Link to="/client">Client</Link> <br/>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default  HomePage;
