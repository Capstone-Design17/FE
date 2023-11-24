import React, { useEffect } from 'react';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import PopupDom from 'components/PopupDom';
import PopupPostCode from 'components/PopupPostCode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';

export default function UpdateUser() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handlePwd = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleNewPwd = (e) => {
    setNewPassword(e.target.value);
    console.log(newPassword);
  };

  const [location, setLocation] = useState('');
  const [opLocation, setOpLocation] = useState(false);

  const changePw = () => {
    console.log('비밀번호 변경');
    axios({
      url: '/api/user/password',
      method: 'put',
      params: {
        userId: userId,
        password: password,
        newPassword: newPassword,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '비밀번호 변경 성공') {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        } else {
          throw new Error('정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    if (userId !== '') {
      axios({
        url: '/api/user/location',
        method: 'get',
        params: {
          userId: userId,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data.message === '위치 조회 성공') {
              setLocation(response.data.data);
            } else {
              alert(response.data.message);
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => alert(error));
    }
  }, [userId]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const changeLocation = () => {
    console.log('변경: ' + userId + ' ' + location);
    axios({
      url: '/api/user/location',
      method: 'put',
      params: {
        userId: userId,
        location: location,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '위치 변경 성공') {
            alert('성공적으로 변경되었습니다.');
            console.log(response.data.data);
            setLocation(response.data.data);
          } else {
            alert(response.data.message);
          }
        } else {
          throw new Error('정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        <Grid container mb={2}>
          <Grid item display={'flex'} alignItems={'center'} onClick={() => navigate('/myPage')}>
            <ArrowBackIosIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6" fontWeight={'bold'}>
              회원 정보 수정
            </Typography>
          </Grid>
        </Grid>

        <div>
          {/* 마이페이지에 있어야 할 내용 */}
          <Typography variant="subtitle1" fontWeight={'bold'} mt={3} mb={3}>
            비밀번호 변경
          </Typography>
          <Grid container borderBottom={'1px solid lightgray'} pb={3} display={'flex'} alignItems={'center'}>
            <Grid item container mb={1}>
              <Grid item xs mr={1}>
                <TextField type="password" fullWidth color="error" placeholder={'현재 비밀번호 입력'} onChange={handlePwd} />
              </Grid>
              <Grid item>
                <Button display={'hidden'} />
              </Grid>
            </Grid>
            <Grid item container display={'flex'} alignItems={'center'}>
              <Grid item xs mr={1}>
                <TextField type="password" fullWidth color="error" placeholder={'새 비밀번호 입력'} onChange={handleNewPwd} />
              </Grid>
              <Grid item>
                <Button onClick={changePw} style={{ color: 'black' }}>
                  변경
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" fontWeight={'bold'} mt={3} mb={3}>
            위치정보
          </Typography>
          {!opLocation ? (
            <Grid container pb={3} display={'flex'} alignItems={'center'}>
              {/* 이미 등록된 위치정보가 있으면 출력*/}
              <Grid item xs ml={2} mr={1}>
                <Typography variant="body2" fontWeight={'bold'}>
                  {location}
                </Typography>
              </Grid>
              <Grid item>
                {/* state를 바꿔서 TextField로 변경 */}
                <Button style={{ color: 'black' }} onClick={() => setOpLocation(true)}>
                  변경
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container pb={3}>
              {/* 이미 등록된 위치정보가 있으면 출력*/}
              <Grid item>
                <Button onClick={openPostCode}>우편번호 검색</Button>
                <div id="popupDom">
                  {isPopupOpen && (
                    <PopupDom>
                      <PopupPostCode onClose={closePostCode} setLocation={setLocation} location={location} />
                    </PopupDom>
                  )}
                </div>
              </Grid>
              <Grid item container display={'flex'} alignItems={'center'}>
                <Grid item xs mr={1}>
                  <TextField
                    fullWidth
                    placeholder={location}
                    value={location}
                    color="error"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* Validation 필요 */}
                </Grid>
                <Grid item>
                  {/* state를 바꿔서 TextField로 변경 */}
                  <Button style={{ color: 'black' }} onClick={() => changeLocation()}>
                    변경
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
      <BottomNav />
    </Background>
  );
}
