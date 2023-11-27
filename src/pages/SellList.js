import Background from 'components/Background';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

export default function SellList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [post, setPost] = useState([]);
  useEffect(() => {
    if (userId !== '') {
      console.log('판매 목록 호출');
      axios({
        url: '/api/board/sellList',
        method: 'get',
        params: {
          userId: userId,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data.message === '판매 목록 조회 성공') {
              const post = response.data.data.postList;
              const image = response.data.data.imageList;
              if (post && image && post.length === image.length) {
                const mergedList = response.data.data.postList.map((post, index) => ({
                  ...post,
                  image: image[index],
                }));
                setPost(mergedList);
              } else {
                throw new Error('정의되지 않은 에러');
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

  const [status, setStatus] = useState(0);
  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div style={{ padding: '16px 16px 8px 16px', marginTop: '8px' }}>
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
            <Typography variant="subtitle1" onClick={() => setStatus(0)}>
              판매중
            </Typography>
          </Button>
          <Button>
            <Typography variant="subtitle1" onClick={() => setStatus(1)}>
              판매완료
            </Typography>
          </Button>
          <Button>
            <Typography variant="subtitle1" onClick={() => setStatus(2)}>
              예약중
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ overflow: 'scroll', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 받은 데이터를 출력 */}
        {/* 각 포스트를 클릭하면 PostDetail로 연결 */}
        <div>
          {post.length > 0 ? (
            post.map((post, index) => {
              console.log(status + ': ' + post.status);
              if (post.status === status) {
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
              }
            })
          ) : (
            <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} display={'flex'} justifyContent={'center'} marginTop={'50%'}>
              판매 목록이 없습니다.
            </Typography>
          )}
        </div>
      </div>
      <BottomNav />
    </Background>
  );
}
