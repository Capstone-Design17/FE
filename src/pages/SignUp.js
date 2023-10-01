import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';
import { useState} from 'react';

function SignUp() {
  // 회원가입 Form 형식 지정 필요
  // Form 전송 시 API 호출 내용 지정 필요 및 Redirect?

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

  const { id, pw, pwCheck, name, nickName, phone, email, year, month, day} =
  userInput;

  const handleInput = e => {
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



  // 유효성 검사
  // 아이디 유효성 검사
  const isId = id => {
    const idRegex = new RegExp('[a-z0-9_-]{6,20}');
    return idRegex.test(id);
  };
  const isIdValid = isId(id);
  
  // 패스워드 유효성 검사
  const isPw = pw => {
    const pwRegex = new RegExp(
      '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$');
    return pwRegex.test(pw);
  };
  const isPwValid = isPw(pw);
  
  // 패스워드 재확인
  const isPwSame = pw === pwCheck;
  // const pwDoubleCheck = !isPwSame ? 'pwDoubleCheck' : undefined;
  
  // 이름 유효성 검사
  const isName = name => {
    const nameRegex = new RegExp("^[가-힣]{2,20}$");
    return nameRegex.test(name);
  };
  const isNameValid = isName(name);

  // 별명 유효성 검사
  const isNickName = nickName => {
    const nickNameRegex = new RegExp( "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$");
    return nickNameRegex.test(nickName);
  };
  const isNickNameValid = isNickName(nickName);

  // 휴대폰 번호 유효성 검사
  const isPhone = phone => {
    const phoneRegex = new RegExp("01[016789][^0][0-9]{2,3}[0-9]{4,4}");
    return phoneRegex.test(phone);
  };
  const isPhoneValid = isPhone(phone);

  // 이메일 유효성 검사
  const isEmail = email => {
    const emailRegex = new RegExp("[a-z0-9_+.-]+@([a-z0-9-]+\\.)+[a-z0-9]{2,4}$");
    return emailRegex.test(email);
  };
  const isEmailValid = isEmail(email);

  // 생년월일 입력여부 확인
  const isBirth = Boolean(year && month && day);

  // 전체 유효성 검사 후 버튼 활성화
  const isAllValid =
    isIdValid &&
    isPwValid &&
    isPwSame &&
    isNameValid &&
    isNickNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isBirth;
  const activeBtn = isAllValid ? 'undefined' : 'disabled';

  // 통신 
  // axios?
  const signUp = () => {
    console.log(userInput);
    console.log(isAllValid);
  };

  return (
    <Background>
      <div className="titleWrap">토마토 마켓 회원가입</div>
      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="id" type="text" placeholder="아이디 입력(6~20)"/><br/>
        </div>
        {!isIdValid && (
          <div className="errorMessageWrap" style={{ display: id.length > 0 ? 'block' : 'none' }}>올바른 아이디를 입력해주세요.</div>
        )}
        
        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="pw" type="password" placeholder="영문, 숫자, 특수문자 포함(8~20자)"/><br/>
        </div>
        {!isPwValid && (
          <div className="errorMessageWrap" style={{ display: pw.length > 0 ? 'block' : 'none' }}>비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자입니다.</div>
        )}

        <div className="inputTitle">비밀번호 확인</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="pwCheck" type="password" placeholder="비밀번호 재입력"/>
          <br />
        </div>
        {!isPwSame && (
          <div className="errorMessageWrap" style={{ display: pwCheck.length > 0 ? 'block' : 'none' }}>비밀번호가 일치하지 않습니다.</div>
        )}

        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="name" type="text" placeholder="이름을 입력하세요."/>
          <br />
        </div>
        {!isNameValid && (
          <div className="errorMessageWrap" style={{display: name.length > 0 ? 'block' : 'none'}}>이름은 필수 입력 항목입니다.</div>
        )}

        <div className="inputTitle">별명</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="nickName" type="text" placeholder="별명을 입력하세요."/>
          <br />
        </div>
        {!isNickNameValid && (
          <div className="errorMessageWrap" style={{display : nickName.length > 0 ? 'block' : 'none'}}>별명은 특수문자를 제외한 2~10자리여야 합니다.</div>
        )}

        <div className="inputTitle">전화번호</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="phone" type="text" placeholder="휴대폰 번호 입력 '-' 제외 11자리 입력"/>
          <br/>
        </div>
        {!isPhoneValid && (
          <div className="errorMessageWrap" style={{display : phone.length > 0 ? 'block' : 'none'}}>전화번호 양식이 올바르지 않습니다.</div>
        )}

        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input onChange={handleInput} className="input" name="email" type="text" placeholder="이메일 주소"/>
          <br />
        </div>
        {!isEmailValid && (
          <div className="errorMessageWrap" style={{ display: email.length > 0 ? 'block' : 'none' }}>이메일 양식이 올바르지 않습니다.</div>
        )}

        <div className="inputTitle">생년월일</div>
        <div className="inputWrap">
        <select className="select" name="year" onChange={handleInput}>
          {YEAR.map(y => {
            return <option key={y}>{y}</option>;
          })}
        </select>
        <select className="select" name="month" onChange={handleInput}>
          {MONTH.map(m => {
            return <option key={m}>{m}</option>;
          })}
        </select>
        <select className="select" name="day" onChange={handleInput}>
          {DAY.map(d => {
            return <option key={d}>{d}</option>;
          })}
        </select>
        </div>
        {!isBirth && (
          <div className="errorMessageWrap">생년월일은 필수 입력 항목입니다.</div>
        )}

        <div className="buttonsWrap">
          <button className={ `bottomButton ${activeBtn}`} onClick={signUp}>
            회원가입
          </button>
          <Link to={'/login'} className='bottomButton'>취소</Link>
        </div>
      </div>
    </Background>
  );
}

export default SignUp;
