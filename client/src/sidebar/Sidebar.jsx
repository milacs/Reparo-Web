import React from 'react';
import './sidebar.scss';
import Logo from '../assets/logo.svg';

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="logo">
        <img src={Logo} />
        <span>Reparo Web</span>
      </div>
    </div>
  );
};

export default Sidebar;
