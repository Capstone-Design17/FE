import Background from 'components/Background';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BottomNav from 'components/BottomNav';

export default function MyPage() {
  const navigate = useNavigate();

  const favorite = () => {
    navigate('/favorite');
  };

  const sellList = () => {
    navigate('/sellList');
  };

  return (
    <Background>
      <div className="contentWrap">
        <Button onClick={() => favorite()}>관심 목록</Button>
        <Button onClick={() => sellList()}>판매 목록</Button>
      </div>
      <BottomNav />
    </Background>
  );
}
