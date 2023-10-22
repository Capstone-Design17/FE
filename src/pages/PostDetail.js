import BottomNav from 'components/BottomNav';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function PostDetail() {
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  // Session의 UserId가 Post의 UserId와 같으면 수정/삭제 버튼 생김

  // API 호출
  useEffect(() => {
    axios({
      url: '/api/board/getPost',
      method: 'get',
      params: {
        postNum: '',
      },
    })
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <Grid container style={{ backgroundColor: '#d32f2f' }} p={1}>
        <Grid item xs>
          <Link to={'/board'} style={{ textDecoration: 'none', color: 'white' }}>
            <ArrowBackIcon p={1} />
          </Link>
        </Grid>
        <Grid item>
          <strong style={{ color: 'white', padding: '10px' }}>무엇을 배치할까? 찜?</strong>
        </Grid>
      </Grid>

      <div
        style={{
          margin: '0',
          marginTop: '0',
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          overflow: 'auto',
          overflowX: 'hidden',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div>
          <img src="http://localhost:80/image/default.png" style={{ width: '100%', objectFit: 'cover' }} />
        </div>
        {/* 이미지 리스트 넘기기 기능 필요  */}
        {/* <div>사진리스트 넘기기 기능</div> */}

        {/* Title */}
        <Box style={{ padding: '10px' }}>
          <Grid container direction="column" style={{ borderBottom: '1px solid #d3d3d3' }} p={2}>
            <Grid item xs>
              <Typography variant="h6" fontWeight={'bold'}>
                제목입니다.
              </Typography>
            </Grid>
            <Grid container item xs direction="row" color="text.secondary">
              <Grid item pr={1}>
                <Typography variant="caption">Category</Typography>
              </Grid>
              <Grid item pr={1}>
                <Typography variant="caption">•</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption">Created At</Typography>
                {/* 몇분 전 형태로 출력 */}
              </Grid>
              {/* 조회수? */}
            </Grid>
            <Grid item marginTop={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                20,000원
              </Typography>
            </Grid>
          </Grid>

          {/* User */}
          <Grid container direction="row" style={{ borderBottom: '1px solid #d3d3d3' }} p={2}>
            <Grid item xs={2} mr={2}>
              {/* 프사? radius 주기, 너비-높이 비율 맞추기*/}
              <img src="http://localhost:80/image/test.png" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </Grid>
            <Grid container item direction="column" xs mt={1}>
              <Grid item>
                <Typography variant="subtitle1">User Id</Typography>
                {/* Typograhpy로 변경 */}
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2" color="text.secondary">
                  location
                </Typography>
              </Grid>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="caption" color={'text.secondary'}>
                프로필 보기
              </Typography>
            </Grid>
          </Grid>

          {/* Content */}
          <Grid container p={3} style={{ borderBottom: '1px solid #d3d3d3' }}>
            <Grid item xs>
              <Typography variant="body1">
                Ut ea voluptate adipisicing qui amet fugiat proident ullamco qui officia officia. Eu exercitation non voluptate cillum exercitation minim fugiat. Velit do sunt aliqua do mollit veniam et velit nostrud voluptate exercitation minim sit. Est deserunt laborum aliqua
                qui. Ut et Lorem id fugiat aliquip et consequat aute. Tempor eu amet deserunt aliquip eu velit deserunt ullamco pariatur culpa laboris. Minim ullamco do culpa officia aliquip voluptate est anim. Ea cillum ipsum deserunt commodo officia excepteur velit cillum id
                consequat est. Labore reprehenderit cupidatat sint anim in ullamco labore commodo mollit. Cillum culpa proident non ad anim est nisi enim duis sunt. Aliqua id in sint eu aute occaecat culpa voluptate deserunt duis magna. Ipsum in ad voluptate et proident deserunt
                occaecat aute cillum non irure eiusmod et. Minim voluptate laboris nulla ex. Fugiat laboris anim laborum dolor velit aliqua elit Lorem laboris sint. Aute aliqua cillum occaecat sit quis. Quis sint nisi non culpa deserunt incididunt duis consectetur mollit
                consequat fugiat aliqua nulla. Occaecat aliquip esse consectetur occaecat occaecat sit incididunt eu Lorem proident culpa dolore. Enim enim Lorem ut elit est do dolore Lorem sit in aute velit labore et. Ex est consectetur tempor incididunt eiusmod veniam consequat
                non non veniam. Nostrud voluptate consectetur mollit amet et quis non fugiat. Non exercitation magna deserunt reprehenderit excepteur nisi. Aute cillum in anim deserunt aliquip et ut ad cupidatat et ipsum duis deserunt. Dolor proident aliqua qui exercitation.
                Laboris magna fugiat tempor ad velit. Cillum id laboris consequat eiusmod ex minim minim. Ea eiusmod aute ipsum fugiat. Duis commodo excepteur sint ad sit laborum excepteur fugiat velit. Do sint proident aute amet aute velit enim incididunt. In in consectetur nisi
                est. Minim ut aute non sit eu amet dolore eiusmod aute eiusmod anim dolore incididunt.
              </Typography>
            </Grid>
          </Grid>

          {/* Location Detail */}
          <Grid container direction="column" columnSpacing={1} p={2}>
            <Grid item>
              <Typography variant="h6" fontWeight={'bold'} color="text.secondary">
                거래 희망 장소
              </Typography>
            </Grid>
            <Grid container item ml={1} mt={1} direction="column">
              <Grid item>
                <Typography variant="subtitle1">서울시 노원구 상계10동</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">914-206</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* 댓글 */}
        {/* 연관/추천 */}
      </div>

      <Grid container sx={{ boxShadow: 3, textAlign: 'center' }}>
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} sx={{ width: '100%' }} p={1}>
            판매중
            {/* /판매완료 */}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: 'error.light', color: 'white' }} p={1}>
          <Typography variant="h6" fontWeight={'bold'}>
            채팅하기
          </Typography>
        </Grid>
      </Grid>
      <BottomNav />
    </Background>
  );
}
