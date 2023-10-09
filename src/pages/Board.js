import React from 'react';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';

export default function Board() {
  return (
    <Background>
      <Navbar />
      {/* 등록된 아이템 리스트 보여주기 */}
      <div className="contentWrap">아이템 리스트가 보여질 화면입니다.</div>

      {/* Bottom Navbar */}
      <BottomNav />
    </Background>
  );
}
