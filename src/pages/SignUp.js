import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function SignUp() {
  // 회원가입 Form 형식 지정 필요
  // Form 전송 시 API 호출 내용 지정 필요 및 Redirect?

  return (
    <Background>
      <h1>회원가입</h1>
      <p />
      <form>
        아이디 : <input type="text" />
        <br />
        비밀번호 : <input type="text" /> <br />
        비밀번호 확인 : <input type="text" /> <br />
        이름 : <input type="text" /> <br />
        별명 : <input type="text" />
        <br />
        전화번호 : <input type="text" />
        <br />
        이메일 : <input type="text" />
        <br />
        생년월일 : <input type="text" />
        <br />
        <input type="button" value={'회원가입'} />
      </form>
      <Link to={'/login'}>
        <button>취소</button>
      </Link>
    </Background>
  );
}

export default SignUp;
