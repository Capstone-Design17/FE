import React from 'react';
import '../styles/SignUp.css';
import Background from '../components/Background.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {isId, isPw, isName, isNickName, isPhone, isEmail, isBirth} from '../utils/Validation.js';

function SignUp() {
  // 회원가입 Form 형식 지정 필요
  // Form 전송 시 API 호출 내용 지정 필요 및 Redirect?
  const navigate = useNavigate();

  // 내 항목에 맞게 수정
  const [userInput, setUserInput] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickName: '',
    phone: '',
    email: '',
    year: '',
    month: '',
    day: '',
  });

  const { id, pw, pwCheck, name, nickName, phone, email, year, month, day } = userInput;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    console.log(userInput); // 삭제 필요
  };

  // '출생 연도' 셀렉트 박스 option 목록 동적 생성
  const YEAR = [];
  const MONTH = [];
  const DAY = [];
  const nowYear = new Date().getFullYear();
  for (let i = nowYear; i >= 1940; i--) {
    YEAR.push(i);
  }
  // 월
  for (let i = 1; i <= 12; i++) {
    let m = String(i).padStart(2, '0');
    MONTH.push(m);
  }

  // 일
  for (let i = 1; i <= 31; i++) {
    let d = String(i).padStart(2, '0');
    DAY.push(d);
  }

  const isIdValid = isId(id);
  const isPwValid = isPw(pw);
  const isPwSame = pw === pwCheck;
  const isNameValid = isName(name);
  const isNickNameValid = isNickName(nickName);
  const isPhoneValid = isPhone(phone);
  const isEmailValid = isEmail(email);
  const isBirthValid = isBirth(year, month, day);

  // 전체 유효성 검사 후 버튼 활성화
  const isAllValid = isIdValid && isPwValid && isPwSame && isNameValid && isNickNameValid && isPhoneValid && isEmailValid && isBirthValid;
  const activeBtn = isAllValid ? 'undefined' : 'disabled';

  // 통신
  // axios?
  const signUp = () => {
    console.log(userInput);
    console.log('유효성 검증 : ' + isAllValid);

    axios({
      url: '/api/user/register', // 통신할 서버 웹문서
      method: 'post', // 통신할 방식
      data: {
        // 인자로 보낼 데이터
        id: id,
        pwd: pw,
        pwdCheck: pwCheck,
        name: name,
        nickName: nickName,
        phone: phone,
        email: email,
        birth: `${year}-${month}-${day}`,
      },
    })
      .then((response) => {
        // 응답 데이터 및 처리
        console.log(response.data); //
        if (response.status === 200) {
          if (response.data.message === '회원가입 성공') {
            alert('회원가입 성공');
            navigate('/login');
          } else {
            alert('회원가입 실패 : ' + response.data.message);
          }
        } else {
          throw new Error('회원가입 실패 : 정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Background>
      <div className="titleWrap">토마토 마켓 회원가입</div>
      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="id" type="text" placeholder="아이디 입력(6~20)" />
          <br />
        </div>
        {!isIdValid && id.length > 0 && <div className="errorMessageWrap">올바른 아이디를 입력해주세요.</div>}

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="pw" type="password" placeholder="영문, 숫자, 특수문자 포함(8~20자)" />
          <br />
        </div>
        {!isPwValid && pw.length > 0 && <div className="errorMessageWrap">비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자입니다.</div>}

        <div className="inputTitle">비밀번호 확인</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="pwCheck" type="password" placeholder="비밀번호 재입력" />
          <br />
        </div>
        {!isPwSame && pwCheck.length > 0 && <div className="errorMessageWrap">비밀번호가 일치하지 않습니다.</div>}

        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="name" type="text" placeholder="이름을 입력하세요." />
          <br />
        </div>
        {!isNameValid && name.length > 0 && <div className="errorMessageWrap">이름은 필수 입력 항목입니다.</div>}

        <div className="inputTitle">별명</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="nickName" type="text" placeholder="별명을 입력하세요." />
          <br />
        </div>
        {!isNickNameValid && nickName.length > 0 && <div className="errorMessageWrap">별명은 특수문자를 제외한 2~10자리여야 합니다.</div>}

        <div className="inputTitle">전화번호</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="phone" type="text" placeholder="휴대폰 번호 입력 '-' 제외 11자리 입력" />
          <br />
        </div>
        {!isPhoneValid && phone.length > 0 && <div className="errorMessageWrap">전화번호 양식이 올바르지 않습니다.</div>}

        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="email" type="text" placeholder="이메일 주소" />
          <br />
        </div>
        {!isEmailValid && email.length > 0 && <div className="errorMessageWrap">이메일 양식이 올바르지 않습니다.</div>}

        <div className="inputTitle">생년월일</div>
        <div className="inputWrap">
          <select className="select" name="year" onChange={handleInput}>
            {YEAR.map((y) => {
              return <option key={y}>{y}</option>;
            })}
          </select>
          <select className="select" name="month" onChange={handleInput}>
            {MONTH.map((m) => {
              return <option key={m}>{m}</option>;
            })}
          </select>
          <select className="select" name="day" onChange={handleInput}>
            {DAY.map((d) => {
              return <option key={d}>{d}</option>;
            })}
          </select>
        </div>
        {!isBirthValid && <div className="errorMessageWrap">생년월일은 필수 입력 항목입니다.</div>}

        <div className="buttonsWrap">
          <button className={`bottomButton ${activeBtn}`} onClick={signUp}>
            회원가입
          </button>
          <Link to={'/login'} className="bottomButton">
            취소
          </Link>
        </div>
      </div>
    </Background>
  );
}

export default SignUp;
