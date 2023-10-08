import React from 'react';
import '../styles/Logo.css';
import logo from '../logo.svg';

export default function Logo() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      {/* 로고 변경 or 삭제 필요  */}
    </>
  );
}
