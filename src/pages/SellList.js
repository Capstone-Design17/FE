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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import createdAt from 'utils/Time';

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

        {/* 받은 데이터를 출력 */}
        {/* 각 포스트를 클릭하면 PostDetail로 연결 */}
        <div style={{ height: '100%' }}>
          {post.length > 0 ? (
            post.map((post, index) => {
              console.log(status + ': ' + post.status);
              if (post.status === status) {
                // const imageUrl = 'http://localhost:80/image/' + post.image.uuid;
                const imageUrl = '/image/' + post.image.uuid; // 운영 환경의 url
                return (
                  <Card
                    key={index}
                    sx={{ display: 'flex', margin: '10px 0', height: '140px' }}
                    onClick={() => {
                      clickPost(post.postNum);
                    }}
                  >
                    <CardMedia component="img" sx={{ maxWidth: 120, minWidth: 120, maxHeight: 140, objectFit: 'cover', overflow: 'hidden' }} image={imageUrl} alt="default" />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '10px' }}>
                      <CardContent sx={{ flex: '1 0 auto', p: 1 }} style={{ paddingBottom: '8px' }}>
                        <Grid container item xs direction="row" p={0} m={0}>
                          <Grid item pr={1} xs>
                            <Typography component="h4" variant="subtitle1" style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {post.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption" color="text.secondary" component="div" style={{ minWidth: '37px' }}>
                              {createdAt(post.createAt)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography variant="caption" color="text.secondary" component="div" style={{ height: '40px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {post.location}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} style={{ paddingTop: '10px' }}>
                          <Typography variant="subtitle1">{post.price}원</Typography>
                          {post.status === 0 ? (
                            <Typography variant="overline" color={'green'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                              판매중
                              {/* post.status에 따라 다른 값 : 판매중(0), 판매완료(1), 예약중(2), 삭제된(3) */}
                            </Typography>
                          ) : (
                            <Typography variant="overline" color={'error'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                              판매완료
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                );
              }
            })
          ) : (
            <div>판매 목록이 없습니다.</div>
          )}
        </div>
      </div>
      <BottomNav />
    </Background>
  );
}
