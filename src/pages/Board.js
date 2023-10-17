import React from 'react';
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

  const [testImage, setTestImage] = useState();
  let [imageUrl, setImageUrl] = useState();

  const getList = () => {
    axios({
      url: 'api/board/getPostList',
      method: 'get',
    }).then((response) => {
      console.log('Get List');
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.imageList);
        console.log(response.data.imageList[0]);
        console.log(response.data.imageList[0].uuid);
        setTestImage(response.data.imageList[0].uuid);
        setImageUrl('/image/' + testImage); // nginx : /image 경로로 오는 요청 Proxy
        // 로컬은 어떻게?
        console.log(imageUrl);
      }
    });
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      {/* 등록된 아이템 리스트 보여주기 */}
      <div className="contentWrap">
        아이템 리스트가 보여질 화면입니다.
        <div onClick={getList}>Test Click</div>
        {/* 이미지 접근 예시 */}
        {/* nginx proxy로 접근 */}
        {/* <img src='http://localhost:80/image/default.png' style={{width: '120px', marginBottom: '10px'}}/> */}
        {/* Card */}
        <Card sx={{ display: 'flex', margin: '5px 0' }}>
          <CardMedia component="img" sx={{ maxWidth: 140, overflow: 'hidden' }} image="http://localhost:80/image/default.png" alt="default" />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                Post title
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                location
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <Typography variant="h6">10000원</Typography>
              <Typography variant="overline" color={'error'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                판매완료
              </Typography>
            </Box>
          </Box>
        </Card>
        {/* Card2 */}
        <Card sx={{ display: 'flex', margin: '5px 0' }}>
          <CardMedia component="img" sx={{ maxWidth: 140, overflow: 'hidden' }} image="http://localhost:80/image/test.png" alt="default" />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                Post title2
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                location2
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <Typography variant="h6">10000원</Typography>
              <Typography variant="overline" color={'green'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                판매중
              </Typography>
            </Box>
          </Box>
        </Card>
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
