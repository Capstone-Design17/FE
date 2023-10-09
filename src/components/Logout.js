import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

export default function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    axios({
      method: 'post',
      url: '/api/user/logout',
      withCredentials: 'true',
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.message === '로그아웃 되었습니다.') {
            alert(response.data.message);
            navigate('/login');
          } else {
            throw new Error(response.data);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          logout();
        }}
      >
        로그아웃
      </Button>
    </>
  );
}
