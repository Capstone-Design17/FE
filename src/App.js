import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>홈</>} />
        <Route path="/login" element={<>로그인</>} />
        <Route path="/signup" element={<>회원가입</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
