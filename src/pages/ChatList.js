import Background from 'components/Background';
import React from 'react';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import axios from 'axios';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
  // User ID로 RoomList와 ImageList를 받음
  // map으로 화면에 출력
  // 클릭 시 채팅화면으로 이동
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    console.log(userId + '로 채팅 목록 요청');
    if (userId !== '') {
      axios({
        url: '/api/chat/list',
        method: 'get',
        params: {
          userId: userId,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.message === '채팅 목록 조회 성공') {
              console.log(response.data);
              // setRoomList([...response.data]);
              const room = response.data.roomList;
              console.log(room);
              const image = response.data.imageList;
              console.log(image);
              const chat = response.data.chatList;
              console.log(chat);
              if (room && image && chat && room.length === image.length && room.length === chat.length) {
                const mergedList = response.data.roomList.map((room, index) => ({
                  ...room,
                  image: image[index],
                  chat: chat[index],
                }));
                setRoomList([...mergedList]);

                console.log('test');
                console.log(roomList);
              }
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

  const getTimeString = (createdAt) => {
    // 시간을 출력 포맷으로 바꿔주는 함수
    const isCreated = new Date(createdAt);
    const month = new Date(isCreated).getMonth();
    const date = new Date(isCreated).getDate();
    const hour = new Date(isCreated).getHours();
    const minute = new Date(isCreated).getMinutes();
    const hourValue = hour < 10 ? `0${hour}` : hour;
    const minuteValue = minute < 10 ? `0${minute}` : minute;
    const ampm = hour < 12 ? '오전' : '오후';
    const timeValue = `${month}월 ${date}일 ${ampm} ${hourValue}:${minuteValue}`;

    return timeValue;
  };

  const clickChat = (postNumber, sellerId, image) => {
    console.log(postNumber);
    const thumbnail = 'http://localhost:80/image/' + image.uuid;
    // const thumbnail = '/image/' + image.uuid; // 실제 환경 Url
    navigate('/chatting', { state: { postNum: postNumber, sellerId: sellerId, image: thumbnail } });
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        <Typography variant="h6" fontWeight={'bold'} mb={2}>
          채팅
        </Typography>

        {/* 채팅 목록 */}
        {/* 채팅 삭제 기능 */}
        {roomList.length > 0 ? (
          roomList.map((room, index) => {
            console.log(room);
            const createdAt = getTimeString(room.chat.createdAt);

            // const imageUrl = '/image/' + room.image.uuid;
            const imageUrl = 'http://localhost:80/image/' + room.image.uuid;
            return (
              <Grid
                key={index}
                container
                direction={'row'}
                p={1}
                mb={1}
                style={{ height: '80px', borderTop: '1px solid lightgray' }}
                onClick={() => {
                  clickChat(room.postNum, room.sellerId, room.image);
                }}
              >
                <Grid item xs={2} mr={3} display={'flex'} alignItems="center">
                  <Avatar src={imageUrl} sx={{ width: 64, height: 64 }} />
                </Grid>
                <Grid item container xs direction={'column'}>
                  <Grid item container>
                    <Grid item xs>
                      <Typography variant="subtitle1" fontWeight={'bold'}>
                        {/* 상대방이 seller or buyer */}
                        {/* 판매자가 나면 구매자, 내가 구매자면 판매자 출력 */}
                        {room.sellerId === userId ? room.userId : room.sellerId}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" fontWeight={'bold'} color={'text.secondary'}>
                        {createdAt}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" height={'100%'} color={'text.secondary'} fontWeight={'bold'}>
                      {room.chat.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} display={'flex'} justifyContent={'center'} marginTop={'100%'}>
            채팅이 없습니다.
          </Typography>
        )}
      </div>
      <BottomNav />
    </Background>
  );
}
