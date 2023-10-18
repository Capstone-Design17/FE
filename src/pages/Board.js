import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import 'styles/Board.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Board() {
  // const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const getList = () => {
  useEffect(() => {
    axios({
      url: 'api/board/getPostList',
      method: 'get',
    })
      .then((response) => {
        console.log('Get List');
        console.log(response);
        if (response.status === 200) {
          // 로컬은 어떻게?

          // [postList, imageList]를 담은 리스트 생성
          const post = response.data.postList;
          const image = response.data.imageList;
          if (post && image && post.length === image.length) {
            const mergedList = response.data.postList.map((postItem, index) => ({
              ...postItem,
              image: image[index],
            }));
            setPostList(mergedList);
            console.log(postList);
          }
          setIsLoading(false);
        } else {
          throw new Error('데이터 불러오기 실패');
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [isLoading]);

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      {/* 등록된 아이템 리스트 보여주기 */}
      <div className="contentWrap">
        <h3 style={{ marginTop: 0 }}>등록된 거래 목록</h3>
        {/* 이미지 접근 예시 */}
        {/* nginx proxy로 접근 */}
        {/* <img src='http://localhost:80/image/default.png' style={{width: '120px', marginBottom: '10px'}}/> */}

        {/* 반복 Card 구조*/}
        {isLoading ? (
          <p>Loading...</p>
        ) : postList.length > 0 ? (
          <div style={{ flex: '1' }}>
            {postList.map((post, index) => {
              // index를 수정?
              // const imageUrl = 'http://localhost:80/image/' + post.image.uuid;
              const imageUrl = '/image/' + post.image.uuid; // 운영 환경의 url
              return (
                <Card key={index} sx={{ display: 'flex', margin: '5px 0', height: '130px' }}>
                  <CardMedia component="img" sx={{ maxWidth: 130, maxHeight: 130, overflow: 'hidden' }} image={imageUrl} alt="default" />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto', p: 1 }}>
                      <Typography component="div" variant="h6">
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" component="div">
                        {post.location}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                      <Typography variant="h6">{post.price}원</Typography>
                      {post.status === 0 ? (
                        <Typography variant="overline" color={'green'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                          판매중
                          {/* post.status에 따라 다른 값 : 0 or 1? */}
                        </Typography>
                      ) : (
                        <Typography variant="overline" color={'error'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                          판매완료
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </div>
        ) : (
          <p>No Data</p>
        )}

        <div style={{ width: '100%', textAlign: 'center', padding: '20px 0' }}>페이징 예정 1 2 3</div>
        {/* Bottom Navbar */}
        <Link to={'/post'}>
          <Fab
            color="error"
            aria-label="edit"
            style={{
              position: 'fixed',
              bottom: '8%', // Adjust the value as needed
              right: '4%', // Adjust the value as needed
            }}
          >
            <EditIcon />
          </Fab>
        </Link>
      </div>
      <BottomNav />
    </Background>
  );
}
