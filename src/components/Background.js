import React from 'react';
import logo from '../logo.svg';

function Background({ children }) {
  return (
    <div className="App-background">
      <img src={logo} className="App-logo" alt="logo" />
      {/* 로고 위치 고정 필요  */}
      {children}
    </div>
  );
}

export default Background;
