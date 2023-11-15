import React from 'react';
import Background from 'components/Background';
import BottomNav from 'components/BottomNav';
import Navbar from 'components/Navbar';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BedIcon from '@mui/icons-material/Bed';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BrushIcon from '@mui/icons-material/Brush';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const clickCategory = (value) => {
    console.log('카테고리 클릭');
    navigate('/board', { state: { type: 'C', keyword: value } });
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />

      <div className="contentWrap">
        <Typography variant="h6" fontWeight={'bold'} mb={8}>
          카테고리
        </Typography>

        {/* 각 아이템 클릭 시 Board로 링크 */}
        {/* keyword를 입력한 상태로 들어가야 함  state로 넘기기?*/}
        {/* Board는 title 검색만 keyword로 가능한 상태 */}

        <Grid container textAlign={'center'} rowSpacing={6}>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('디지털기기')}>
            {/* 각 이미지가 들어갈 자리 */}
            <Grid item>
              <PhoneAndroidIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                디지털기기
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('가구/인테리어')}>
            <Grid item>
              <BedIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                가구/인테리어
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('의류')}>
            <Grid item>
              <CheckroomIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                의류
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('잡화')}>
            <Grid item>
              <BrushIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                잡화
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('생활가전')}>
            <Grid item>
              <MicrowaveIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                생활가전
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('가공식품')}>
            <Grid item>
              <FastfoodIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                가공식품
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('스포츠/레저')}>
            <Grid item>
              <SportsSoccerIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                스포츠/레저
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('취미/게임/음반')}>
            <Grid item>
              <SportsEsportsIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                취미/게임/음반
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('뷰티/미용')}>
            <Grid item>
              <ContentCutIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                뷰티/미용
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('도서')}>
            <Grid item>
              <AutoStoriesIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                도서
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('기타 중고물품')}>
            <Grid item>
              <InventoryIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                기타 중고물품
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} container direction={'column'} onClick={() => clickCategory('삽니다')}>
            <Grid item>
              <LocalMallIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                삽니다
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <BottomNav />
    </Background>
  );
}
