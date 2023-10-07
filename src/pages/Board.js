import React from 'react';
import axios from 'axios';
import Background from '../components/Background';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Board() {
  // 코드의 시작에 서버에 API 요청
  // 세션이 있으면 값을 받아옴
  // 세션이 없으면 로그인 페이지로 Redirect
  const navigate = useNavigate();

  const [id, setId] = useState();

  // 세션 검증 -> 다른 컴포넌트로 옮길 수도
  // 쿠키를 실어서 보냄
  const board = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/board/getList', // 수정
      withCredentials: 'true', // 쿠키를 포함하여 보내야 함
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setId(response.data.message); // 응답 받아서 넣기 // 수정
          console.log(response.data);
          if (response.data.message === '세션이 존재하지 않음') {
            // 수정 예정
            throw new Error();
          }
        } else {
          console.log(response.data);
          throw new Error(); // 로그인 안된 상태?
        }
      })
      .catch((error) => {
        alert('로그인 안된 상태입니다?');
        alert(error);
        navigate('/login'); // 로그인 페이지로 Redirect
      });
  };
  return (
    <Background>
      {/* Navbar?? */}
      <button onClick={board}>임시 세션 확인</button>
      <div>{id}님 환영합니다??.</div>

      {/* Logout 따로 컴포넌트로 만들어서 사용 */}
      <button>Logout 버튼</button>

      {/* 등록된 아이템 리스트 보여주기 */}

      {/* Bottom Navbar */}
    </Background>
  );
}
