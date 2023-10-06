import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Session() {
  // 코드의 시작에 서버에 API 요청
  // 세션이 있으면 값을 받아옴
  // 세션이 없으면 로그인 페이지로 Redirect
  const navigate = useNavigate();

  const [id, setId] = useState('');

  // 세션 검증
  // 쿠키를 실어서 보냄
  const checkSession = () => {
    axios({
      method: 'get',
      url: '/api/user/getSession',
      withCredentials: 'true', // 쿠키를 포함하여 보내야 함
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.message === '로그인이 필요합니다.') {
            // 수정 예정
            throw new Error(response.data.message);
          } else {
            setId(response.data.message); // 응답 받아서 넣기 // 수정
            console.log(response.data);
          }
        }
      })
      .catch((error) => {
        alert(error);
        navigate('/login'); // 로그인 페이지로 Redirect
      });
  };

  useEffect(() => {
    checkSession();
  }, [navigate]);

  return (
    <div>
      <div>임시 세션 확인</div>
      <div>{id}님 환영합니다.</div>

      {/* Navbar Components를 만들고 내부에 Session Components 사용하기 */}
      {/* Logout 따로 컴포넌트로 만들어서 사용 or 여기서 호출?*/}
      <button>Logout 버튼</button>
    </div>
  );
}
