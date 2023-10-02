import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function Login() {
  // 로그인 Form css 지정 및 버튼 위치 지정 필요
  // 로그인한 ID, PW 값을 API 요청 및 Redirect?
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [idValid, setIdValid] = useState(false);
  
  const [pwValid, setPwValid] = useState(false);
  
  const handleId = (e) => {
    setId(e.target.value);
  };
  
  useEffect(() => {
    const regex = new RegExp('[a-z0-9_-]{6,20}');
    setIdValid(regex.test(id));
  }, [id]);
  
  const handlePw = (e) => {
    setPw(e.target.value);
  };
  
  useEffect(() => {
    const regex = new RegExp('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$');
    setPwValid(regex.test(pw));
  }, [pw]);
  
  // 버튼 활성화
  const allValid = idValid && pwValid;
  const activeBtn = allValid ? 'undefined' : 'disabled';

  // 로그인
  const login = () => {
    console.log(allValid);
    console.log(id, pw);
  };

  return (
    <Background>
      <div className="titleWrap">로그인하세요</div>

      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="아이디 입력" value={id} onChange={handleId}/> <br />
        </div>
        {!idValid && id.length > 0 && (
          <div className="errorMessageWrap">올바른 아이디를 입력해주세요.</div>
        )}

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input className="input" type="password" placeholder="영문, 숫자, 특수문자 포함(8~20자)" value={pw} onChange={handlePw}/> <br />
        </div>
        {!pwValid && pw.length > 0 && (      
          <div className="errorMessageWrap">비밀번호는 영문, 숫자 특수문자를 포함한 8~20자입니다.</div>
        )}


        <div className="linksWrap">
          <Link to={'/signup'}>회원가입</Link>
          {/* <div>회원가입</div>  */}
          <span>|</span>
          <div>아이디 찾기</div>
          <span>|</span>
          <div>비밀번호 찾기</div>
        </div>
      </div>

      <div>
        <button className={`bottomButton ${activeBtn}`} onClick={login}>
          로그인
        </button>
      </div>

      {/* <Link to={'/signup'}>
        <button>회원가입</button>
      </Link>
      <button>비밀번호 찾기</button> */}
    </Background>
  );
}

export default Login;
