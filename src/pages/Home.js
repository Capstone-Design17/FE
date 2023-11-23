import React from 'react';
import 'styles/Home.css';
import Background from 'components/Background.js';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
// import bot from 'assets/bg_bot.png';
import { Typography } from '@mui/material';

function Home() {
  return (
    <Background>
      <div className="homeWrap" style={{ backgroundColor: '#FF523A' }}>
        <Logo />
        <Link to={'/login'} className="homeButton" style={{ textDecoration: 'none' }}>
          {/* 추가 문구 지정 필요 */}
          <Typography variant="h6" fontWeight={'bold'} mt={20}>
            시작하기
          </Typography>
        </Link>
        {/* 디자인 끝까지 고민 */}
        {/* <img src={bot} style={{width:'100%', height:'200px'}}/> */}
      </div>
    </Background>
  );
}

export default Home;
