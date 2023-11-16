import React from 'react';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

export default function UpdateUser() {
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [check, setCheck] = useState(false);

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        프로필
        {!check ? (
          <div>
            <TextField placeholder="비밀번호를 입력하세요." onClick={() => setCheck(true)}></TextField>
          </div>
        ) : (
          <div>
            {/* 마이페이지에 있어야 할 내용 */}
            {/* <Avatar /> */}
            {/* <Typography variant="subtitle1">NickName</Typography> */}
            <TextField defaultValue={'닉네임이 들어갈 것'}></TextField>
            <Typography variant="caption">{userId}</Typography>
            <TextField defaultValue={'기존 비밀번호'}></TextField>
            <TextField defaultValue={'비밀번호 확인'}></TextField>
            <Button>수정하기</Button>
          </div>
        )}
      </div>
      <BottomNav />
    </Background>
  );
}
