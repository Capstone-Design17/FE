import React from 'react';
import Background from '../components/Background.js';
import { Link } from 'react-router-dom';

function SignUp() {
  // 회원가입 Form 형식 지정 필요
  // Form 전송 시 API 호출 내용 지정 필요 및 Redirect?

  return (
    <Background>
      <div className="titleWrap">토마토 마켓 회원가입</div>
      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="아이디 입력(6~20)" /> <br />
        </div>
        <div className="errorMessageWrap">올바른 아이디를 입력해주세요.</div>

        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="영문, 숫자, 특수문자 포함(8~20자)" /> <br />
        </div>
        <div className="errorMessageWrap">비밀번호는 영문, 숫자 특수문자를 포함한 8~20자입니다.</div>

        <div className="inputTitle">비밀번호 확인</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="비밀번호 재입력" /> <br />
        </div>
        <div className="errorMessageWrap">비밀번호가 일치하지 않습니다.</div>

        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="이름을 입력하세요" /> <br />
        </div>
        <div className="errorMessageWrap">이름은 필수 입력 항목입니다.</div>

        <div className="inputTitle">별명</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="별명을 입력하세요" /> <br />
        </div>
        <div className="errorMessageWrap">별명은 필수 입력 항목입니다.</div>

        <div className="inputTitle">전화번호</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="휴대폰 번호 입력 '-' 제외 11자리 입력" /> <br />
        </div>
        <div className="errorMessageWrap">이미 등록된 전화번호입니다.</div>

        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input className="input" type="text" placeholder="이메일 주소" /> <br />
          <div>@</div>
          <select>
            <option value={'google.com'}>google.com</option>
            <option value={'naver.com'}>naver.com</option>
            <option value={'daun.net'}>daum.net</option>
          </select>
        </div>
        <div className="errorMessageWrap">이미 등록된 이메일입니다.</div>

        <div className="inputTitle">생년월일</div>
        <div className="inputWrap">
          <select>
            <option>년도</option>
          </select>
          <select>
            <option>월</option>
          </select>
          <select>
            <option>일</option>
          </select>
          {/* <input className='input' type="text" placeholder='년도'/> <br /> */}
        </div>
        <div className="errorMessageWrap">생년월일은 필수 입력 항목입니다.</div>

        <div className="buttonsWrap">
          <button disabled={true} className="bottomButton">
            회원가입
          </button>
          <button className="bottomButton">
            <Link to={'/login'}>취소</Link>
          </button>
        </div>
      </div>
    </Background>
  );
}

export default SignUp;
