import Background from 'components/Background';
import React from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import createdAt from 'utils/Time';

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

        {favoriteList.length > 0 ? (
          favoriteList.map((post, index) => {
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
                          {/* post.status에 따라 다른 값 : 판매중(0), 예약중(1), 판매완료(2), 삭제된(3) */}
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
          })
        ) : (
          <div>등록된 관심 목록이 없습니다.</div>
        )}
      </div>
      <BottomNav />
    </Background>
  );
}
