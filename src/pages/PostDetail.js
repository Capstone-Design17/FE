import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React from 'react';
import { useState } from 'react';

export default function PostDetail() {
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">Detail Page</div>
    </Background>
  );
}
