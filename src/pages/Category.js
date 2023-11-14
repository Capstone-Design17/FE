import React from 'react';
import Background from 'components/Background';
import BottomNav from 'components/BottomNav';
import Navbar from 'components/Navbar';
import { useState } from 'react';

export default function Category() {
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />

      <div className="contentWrap">test</div>

      <BottomNav />
    </Background>
  );
}
