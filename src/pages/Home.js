import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Background>
      {/* 추가 문구 지정 필요 */}
      <Link to={'/login'}>
        <button>시작하기</button>
      </Link>
    </Background>
  );
}

export default Home;
