import React from 'react';
import { NavLink } from 'react-router-dom';
import './logo.css';

const Logo = () => {
  return (
    <NavLink to="/">
      <img src="/mag-logo.jpg" alt="Logo" className="logo" />
    </NavLink>
  );
};

export default Logo;