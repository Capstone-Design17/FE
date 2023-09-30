import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Background>
      <div className="homeWrap">
        {/* 추가 문구 지정 필요 */}
        <Link to={'/login'} className="homeButton">
          시작하기
        </Link>
        <div className="homeTitle">버튼을 눌러 시작하기</div>
      </div>
    </Background>
  );
}

export default Home;
