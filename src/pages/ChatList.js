import Background from 'components/Background';
import React from 'react';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';

export default function ChatList() {
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        {/* 채팅 목록 */}
        채팅 리스트
        {/* 채팅 삭제 기능 */}
      </div>
      <BottomNav />
    </Background>
  );
}
