import React from 'react';
import '../styles/Background.css';
import '../styles/Logo.css';
import logo from '../logo.svg';

function Background({ children }) {
  return (
    <div className="App-background">
      <img src={logo} className="App-logo" alt="logo" />
      {/* 로고 변경 or 삭제 필요  */}
      {children}
    </div>
  );
}

export default Background;
