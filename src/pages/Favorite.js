import Background from 'components/Background';
import React from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
// import createdAt from 'utils/Time';

export default function Favorite() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [favoriteList, setFavoriteList] = useState([]);
  // 관심 등록한 Post 리스트 목록 받기
  useEffect(() => {
    if (userId !== '') {
      console.log('관심 목록 호출');
      axios({
        url: '/api/board/favorite/list',
        method: 'get',
        params: {
          userId: userId,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data.message === '관심 목록 조회 성공') {
              console.log(response.data.message);
              const post = response.data.data.postList;
              const image = response.data.data.imageList;
              if (post && image && post.length === image.length) {
                const mergedList = response.data.data.postList.map((post, index) => ({
                  ...post,
                  image: image[index],
                }));
                setFavoriteList(mergedList);
              }
            } else {
              alert(response.data.message);
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => alert(error));
    }
  }, [userId]);

  const clickPost = (postNumber) => {
    navigate('/postDetail', { state: postNumber });
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
              관심목록
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div style={{ overflow: 'scroll', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {favoriteList.length > 0 ? (
          favoriteList.map((post, index) => {
            // const imageUrl = 'http://localhost:80/image/' + post.image.uuid;
            const imageUrl = '/image/' + post.image.uuid; // 운영 환경의 url
            return (
              <div key={index}>
                <div
                  style={{ display: 'flex', padding: '16px', marginBottom: '10px' }}
                  onClick={() => {
                    clickPost(post.postNum);
                  }}
                >
                  <CardMedia component="img" sx={{ minHeight: 110, maxWidth: 110, maxHeight: 110, objectFit: 'cover', overflow: 'hidden', borderRadius: '10px' }} image={imageUrl} alt="default" />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} pl={2}>
                    <CardContent sx={{ flex: '1 0 auto', padding: '0', margin: '0', paddingBottom: '0' }}>
                      <Typography component="h4" variant="subtitle1" style={{ maxWidth: '230px', marginTop: '7px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2rem' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" component="div" style={{ maxWidth: '210px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '5px' }}>
                        {post.location}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <Typography variant="subtitle1" fontSize={'15px'} fontWeight={'bold'} color={'#FF523A'} mr={1}>
                          {post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                        </Typography>
                        {post.status === 0 ? null : <div style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.2rem', padding: '2px 4px', backgroundColor: '#2c2c2c', borderRadius: '3px', color: 'white', textAlign: 'center' }}>거래완료</div>}
                      </Box>
                    </CardContent>
                  </Box>
                </div>
                <div style={{ display: 'block', borderBottom: '1px solid lightgray', margin: '0 16px', padding: '0' }} />
              </div>
            );
          })
        ) : (
          <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} display={'flex'} justifyContent={'center'} marginTop={'50%'}>
            등록된 관심 목록이 없습니다.
          </Typography>
        )}
      </div>
      <BottomNav />
    </Background>
  );
}
