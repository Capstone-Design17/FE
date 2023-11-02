import BottomNav from 'components/BottomNav';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import createdAt from 'utils/Time';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PostDetail() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const { state } = useLocation();

  const [post, setPost] = useState([]);
  const [imageList, setImageList] = useState([]);
  const profileImgUrl = 'http://localhost:80/image/user.png';
  // const profileImgUrl = '/image/user.png'; // 실제 환경 Url

  // Session의 UserId가 Post의 UserId와 같으면 수정/삭제 버튼 생김

  // API 호출
  useEffect(() => {
    console.log(state);
    axios({
      url: '/api/board/getPost',
      method: 'get',
      params: {
        postNum: state,
      },
    })
      .then((response) => {
        // 가져온 데이터를 state로 받음
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '게시글 불러오기 성공') {
            setPost(response.data.postDto);
            setImageList(response.data.imageList);
          } else {
            throw new Error('게시글 불러오기 실패');
          }
        } else {
          throw new Error('정의되지 않은 에러');
        }
      })
      .catch((error) => {
        alert(error);
        navigate('/board');
      });
  }, []);

  const clickChat = (postNumber, sellerId) => {
    console.log(postNumber);
    navigate('/chatting', { state: { postNum: postNumber, sellerId: sellerId } });
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <Grid container style={{ backgroundColor: '#d32f2f' }} p={1}>
        <Grid item xs>
          <Link to={'/board'} style={{ textDecoration: 'none', color: 'white' }}>
            <ArrowBackIcon />
          </Link>
        </Grid>
        <Grid item>
          <FavoriteBorderIcon style={{ color: 'white' }} />
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
        {/* 사진 클릭 시 확대 필요 */}
        <div>
          <Carousel
            style={{ position: 'relative' }}
            indicatorContainerProps={{
              style: {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '6%',
                width: 'auto',
                padding: '0 10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                opacity: '0.6',
                color: 'white',
                zIndex: 5,
                justifyContent: 'center',
                display: 'flex',
              },
            }}
          >
            {imageList.map((image, index) => {
              const imageUrl = 'http://localhost:80/image/' + image.uuid;
              // const imageUrl = '/image/' + image.uuid; // 실제 환경 Url
              return (
                <Paper key={index}>
                  <img src={imageUrl} style={{ width: '100%', objectFit: 'cover' }} alt={`Image ${index}`} />
                </Paper>
              );
            })}
          </Carousel>
        </div>

        {/* Title */}
        <Box style={{ padding: '0 10px' }}>
          <Grid container direction="column" style={{ borderBottom: '1px solid #d3d3d3' }} p={2}>
            <Grid item xs>
              <Typography variant="h6" fontWeight={'bold'}>
                {/* 제목 */}
                {post.title}
              </Typography>
            </Grid>
            <Grid container item xs direction="row" color="text.secondary">
              <Grid item pr={1}>
                <Typography variant="caption">
                  {/* 카테고리 */}
                  {post.category}
                </Typography>
              </Grid>
              <Grid item pr={1}>
                <Typography variant="caption">•</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption">
                  {/* 등록 시간 */}
                  {createdAt(post.createAt)}
                </Typography>
              </Grid>
              {/* 조회수? */}
            </Grid>
            <Grid item marginTop={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                {/* 20,000원, 형태 수정 필요 */}
                {post.price}원
              </Typography>
            </Grid>
          </Grid>

          {/* User */}
          <Grid container direction="row" style={{ borderBottom: '1px solid #d3d3d3' }} p={2}>
            <Grid item xs={2} mr={2} style={{ display: 'flex' }}>
              {/* 프로필 사진 */}
              {/* <Avatar */}

              <Avatar alt="" src={profileImgUrl} sx={{ width: 56, height: 56 }} />
            </Grid>
            <Grid container item direction="column" xs mt={1}>
              <Grid item>
                <Typography variant="subtitle1">
                  {/* User Id */}
                  {post.userId}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2" color="text.secondary">
                  {/* location */}
                  {post.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="caption" color={'text.secondary'}>
                프로필 보기
                {/* Link */}
              </Typography>
            </Grid>
          </Grid>

          {/* Content */}
          <Grid container p={2} style={{ borderBottom: '1px solid #d3d3d3' }}>
            <Grid item xs>
              <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} mb={1}>
                상품내용
              </Typography>
              <Typography variant="body1" p={1} style={{ whiteSpace: 'pre-wrap' }}>
                {post.content}
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
                <Typography variant="subtitle1">
                  {/* 도로명 주소 */}
                  {post.location}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {/* 상세 주소 */}
                  {post.detailLocation}
                </Typography>
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
            {post.status === 0 ? '판매중' : '판매완료'}
            {/* 판매중(0), 예약중(1), 판매완료(2), 삭제됨(3) */}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: 'error.light', color: 'white' }} p={1}>
          {/* UserId가 SellerId면 Disabled 시키기 */}
          <Typography
            variant="h6"
            fontWeight={'bold'}
            onClick={() => {
              clickChat(post.postNum, post.userId);
            }}
          >
            채팅하기
            {/* Link */}
          </Typography>
        </Grid>
      </Grid>
      <BottomNav />
    </Background>
  );
}
