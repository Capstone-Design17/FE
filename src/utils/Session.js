import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Session() {
  // 코드의 시작에 서버에 API 요청
  // 세션이 있으면 값을 받아옴
  // 세션이 없으면 로그인 페이지로 Redirect
  const navigate = useNavigate();

  const [session, setSession] = useState({ valid: false, id: null });

  // 세션 검증
  // 쿠키를 실어서 보냄
  const checkSession = () => {
    axios({
      method: 'get',
      url: '/api/user/getSession',
      withCredentials: 'true', // 쿠키를 포함하여 보내야 함
    })
      .then((response) => {
        console.log('세션 확인');
        console.log(response);
        if (response.status === 200) {
          if (response.data.message === '로그인이 필요합니다.') {
            setSession({ valid: false, id: null });
            throw new Error(response.data.message);
          } else {
            setSession({ valid: true, id: response.data.message });
            console.log(response.data);
          }
        }
      })
      .catch((error) => {
        alert(error);
        setSession({ valid: false, id: null });
        navigate('/login'); // 로그인 페이지로 Redirect
      });
  };

  useEffect(() => {
    checkSession();
  }, [navigate]);

  // const logout = () => {
  //   // 로그아웃 axios
  //   console.log("로그아웃");
  //   // Redirect?
  // };

  return session;
}
