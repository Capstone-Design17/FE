import Background from 'components/Background';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Typography } from '@mui/material';
import BottomNav from 'components/BottomNav';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function MyPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const updateUser = () => {
    navigate('/updateUser');
  };

  const favorite = () => {
    navigate('/favorite');
  };

  const sellList = () => {
    navigate('/sellList');
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        <Typography variant="h6" fontWeight={'bold'} pb={3}>
          내정보
        </Typography>

        <Typography variant="subtitle1" fontWeight={'bold'} mt={3} mb={3}>
          프로필
        </Typography>
        <Grid container borderBottom={'1px solid lightgray'} pb={3} display={'flex'} alignItems={'center'}>
          <Grid item xs={2} mr={1}>
            <Avatar sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{userId}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ backgroundColor: 'text.disabled' }} onClick={() => updateUser()}>
              프로필 수정
            </Button>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight={'bold'} mt={3} mb={3}>
          나의 거래
        </Typography>
        <Grid container rowSpacing={2} borderBottom={'1px solid lightgray'} pb={3}>
          <Grid item container>
            <Grid item xs={1}>
              <FavoriteBorderIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => favorite()}>
                관심 목록
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={1}>
              <ReceiptLongIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => sellList()}>
                판매 내역
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={1}>
              <LocalMallIcon color="white" />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => {}}>
                구매 내역
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight={'bold'} mt={3} mb={3}>
          기타
        </Typography>
        <Grid container rowSpacing={2} pb={3}>
          <Grid item container>
            <Grid item xs={1}>
              <NotificationsNoneIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => favorite()}>
                공지사항
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={1}>
              <InfoIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => sellList()}>
                이용약관
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={1}>
              <HelpOutlineIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" fontWeight={'bold'} onClick={() => {}}>
                자주 묻는 질문
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <BottomNav />
    </Background>
  );
}
