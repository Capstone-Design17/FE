import Background from 'components/Background';
import React from 'react';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function SellList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        <Grid container mb={2}>
          <Grid item display={'flex'} alignItems={'center'} onClick={() => navigate('/myPage')}>
            <ArrowBackIosIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6" fontWeight={'bold'}>
              판매목록
            </Typography>
          </Grid>
        </Grid>

        {/* 클릭 시 해당 Status를 가지는 목록만 출력 */}
        <ButtonGroup variant="text" aria-label="outlined button group" fullWidth color="inherit" size="large" sx={{ fontWeight: 'bold', margin: '30px 0' }}>
          <Button>
            <Typography variant="subtitle1">판매중</Typography>
          </Button>
          <Button>
            <Typography variant="subtitle1">판매완료</Typography>
          </Button>
          <Button>
            <Typography variant="subtitle1">예약중</Typography>
          </Button>
        </ButtonGroup>

        <div style={{ border: '1px solid black', height: '100%' }}>내부 내용</div>
      </div>
      <BottomNav />
    </Background>
  );
}
