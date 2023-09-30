import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function Login() {
  // 로그인 Form css 지정 및 버튼 위치 지정 필요
  // 로그인한 ID, PW 값을 API 요청 및 Redirect?

  return (
    <Background>
      <h1>로그인 하세요</h1>
      <form>
        ID : <input type="text" /> <br />
        PW : <input type="text" /> <br />
        <button>로그인</button>
      </form>
      <Link to={'/signup'}>
        <button>회원가입</button>
      </Link>
      <button>비밀번호 찾기</button>
    </Background>
  );
}

export default Login;
