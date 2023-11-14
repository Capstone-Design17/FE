import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home.js';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Board from 'pages/Board';
import Post from 'pages/Post';
import PostDetail from 'pages/PostDetail';
import Chatting from 'pages/Chatting';
import ChatList from 'pages/ChatList';
import MyPage from 'pages/MyPage';
import Favorite from 'pages/Favorite';
import PostUpdate from 'pages/PostUpdate';
import SellList from 'pages/SellList';
import Category from 'pages/Category';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/post" element={<Post />} />
        <Route path="/postDetail" element={<PostDetail />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/postUpdate" element={<PostUpdate />} />
        <Route path="/sellList" element={<SellList />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
