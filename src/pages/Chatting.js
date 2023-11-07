import { TextField } from '@mui/material';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Chatting() {
  // 채팅하기 버튼을 통해 접근
  // 버튼 클릭 시 postNum을 받아야 함
  // session의 userId와 post의 postNum, sellerId로 채팅방 호출
  // WebSocket을 이용한 데이터 통신

  const navigate = useNavigate();
  const { state } = useLocation();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [post, setPost] = useState([]);
  const [chat, setChat] = useState([]); // 채팅 목록
  const [message, setMessage] = useState(''); // 실시간으로 전송할 메시지
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const backToPost = (postNumber) => {
    navigate('/postDetail', { state: postNumber });
  };

  const [roomId, setRoomId] = useState('');
  // RoomId를 받아옴
  useEffect(() => {
    if (userId !== '') {
      console.log('RoomId 호출');
      axios({
        url: '/api/chat/room',
        method: 'post',
        data: {
          sellerId: state.sellerId,
          userId: userId,
          postNum: state.postNum,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data.message === '채팅방 불러오기 성공') {
              setRoomId(response.data.roomDto.roomId);
            } else {
              alert('접속 실패 : ' + response.data.message);
              navigate('/ChatList');
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => alert(error));
    }
  }, [userId]);

  useEffect(() => {
    if (state.postNum !== null) {
      axios({
        url: '/api/board/getPost',
        method: 'get',
        params: {
          postNum: state.postNum,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.message === '게시글 불러오기 성공') {
              setPost(response.data.postDto);
            } else {
              throw new Error('게시글 불러오기 실패');
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => {
          alert(error);
          navigate('/chatList');
        });
    }
  }, []);

  useEffect(() => {
    if (roomId != '') {
      console.log('roomId:' + roomId);
      axios({
        url: '/api/chat/room',
        method: 'get',
        params: {
          roomId: roomId,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            if (response.data.message === '채팅 내역 조회 성공') {
              setChat([...response.data.chatList]);
            } else {
              alert(response.data.message);
              navigate('/ChatList');
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => alert(error));
    }
  }, [roomId]);

  const stompClient = useRef({});

  const connect = () => {
    console.log('Chatting Room: ' + state.postNum); // postNum은 roomId가 아님
    console.log('Chatting Room: ' + roomId); // postNum은 roomId가 아님
    console.log(window.location);
    console.log(window.location.host);
    // WebSocket
    // const webSocketUrl = 'ws://' + window.location.host + '/api/ws';
    const webSocketUrl = 'ws://localhost:8080/api/ws';
    stompClient.current = Stomp.over(() => new WebSocket(webSocketUrl)); // Stomp Client

    // SockJS, Apic에서 SockJS로 테스트 할수가 없음
    // const stompClient = Stomp.over(() => new SockJS('http://localhost:8080/api/ws'));

    // WebSocket에 연결
    stompClient.current.connect({}, () => {
      // Subscribe
      // RoomId 동적으로
      // url 서버에 맞게
      stompClient.current.subscribe('/topic/chat/' + roomId, (data) => {
        const newMessage = JSON.parse(data.body);
        // 채팅 내역에 메시지 추가
        console.log('받은 메시지: ' + newMessage.sender + '-' + newMessage.message);
        setChat((prevChat) => [...prevChat, newMessage]);
        chat.map((message) => {
          console.log(message);
        });
      });
    });
  };

  const disconnect = () => {
    stompClient.current.deactivate(); // 동작 확인 어떻게?
  };

  useEffect(() => {
    if (roomId !== '') {
      connect();

      return () => disconnect();
    }
  }, [roomId]);

  // Publish
  const publish = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      // The message is empty or contains only whitespace
      setMessage('');
      alert('메시지를 입력하세요.');
      return;
    }

    if (trimmedMessage.length > 200) {
      // The message is too long (adjust the maximum length as needed)
      alert('메시지는 200자 이내로 입력하세요.');
      return;
    }

    if (!stompClient.current.connected) {
      alert('소켓 연결 끊김');
      return;
    }

    stompClient.current.send(
      '/app/chat',
      {},
      JSON.stringify({
        roomId: roomId,
        sender: userId,
        message: message,
      }),
    );

    setMessage(''); // 메시지 보내는 칸 초기화
  };

  // const profileImgUrl = 'http://localhost:80/image/user.png';
  // const profileImgUrl = '/image/user.png'; // 실제 환경 Url

  const getTimeString = (createdAt) => {
    // 시간을 출력 포맷으로 바꿔주는 함수
    const isCreated = new Date(createdAt);
    const hour = new Date(isCreated).getHours();
    const minute = new Date(isCreated).getMinutes();
    const hourValue = hour < 10 ? `0${hour}` : hour;
    const minuteValue = minute < 10 ? `0${minute}` : minute;
    const ampm = hour < 12 ? '오전' : '오후';
    const timeValue = `${ampm} ${hourValue}:${minuteValue}`;

    return timeValue;
  };

  return (
    <Background>
      <div style={{ display: 'none' }}>
        <Navbar getUserId={getUserId} userId={userId} />
      </div>
      <Grid container p={2}>
        <Grid container item alignItems={'center'} pb={1} borderBottom={'1px solid #dfdfdf'}>
          <Grid item xs={1}>
            {/* 채팅 리스트로 돌아가기 */}
            <Link to="/chatList" style={{ color: 'black' }}>
              <ArrowBackIcon />
            </Link>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" fontWeight={'bold'}>
              {state.sellerId}
            </Typography>
          </Grid>
          <Grid item>
            {/* 채팅방 나가기 */}
            <MoreVertIcon />
          </Grid>
        </Grid>
        <Grid item xs container display={'flex'} alignItems={'center'} justifyContent={'center'} borderBottom={'1px solid #dfdfdf'} pl={1} pr={1} pt={2} pb={2}>
          {/* PostDetail 관련 정보 띄우기 */}
          {/* Axios를 또 호출? or State로 받음? */}
          {/* State로 받기가 좋아보이나 채팅 목록에서 받는건 힘들어보이기도.. */}
          <Grid item style={{ color: 'white' }} mr={2}>
            {/* Avatar? */}
            {/* <img src={profileImgUrl} style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover'}} /> */}
            <Avatar src={state.image} sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid
            container
            item
            xs
            direction={'column'}
            onClick={() => {
              backToPost(state.postNum);
            }}
          >
            <Grid item>
              <Typography variant="subtitle1" fontWeight={'bold'} color={'text.secondary'}>
                {post.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color={'text.secondary'} fontWeight={'bold'}>
                {post.price}원
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="chattingWrap" style={{ overflowY: 'scroll', padding: '20px', flex: '1' }}>
        {/* 기존 채팅 내역 */}
        {/* 입장한 기준으로 채팅 내역 불러와서 표시해주기 */}

        {/* sender === userId면 오른쪽, 아니면 왼쪽 */}
        {/* 각각 Style이 달라야 함 */}
        {chat.length > 0 ? (
          <div>
            {chat.map((message, index) => {
              // 시간
              let displayTime = true;
              const createdAt = getTimeString(message.createdAt);

              // 날짜
              let displayDate = false;
              let today = '';

              if (index !== chat.length - 1) {
                // 마지막 인덱스가 아닐 때만 실행.
                const nextSender = chat[index + 1].sender;

                // 같은 사람이 보낸 메시지면
                const nextCreatedAt = getTimeString(chat[index + 1].createdAt);
                if (nextSender === message.sender) {
                  // 보낸 시간이 같은 경우
                  if (nextCreatedAt === createdAt) displayTime = false;
                }

                // 보낸 날짜가 다른 경우
                const date = new Date(message.createdAt).getDate(); // 이 메시지
                const nextCreatedDate = new Date(chat[index + 1].createdAt); // 다음 메시지

                if (nextCreatedDate.getDate() !== date) {
                  displayDate = true;

                  let day = '';
                  switch (nextCreatedDate.getDay()) {
                    case 0:
                      day = '일';
                      break;
                    case 1:
                      day = '월';
                      break;
                    case 2:
                      day = '화';
                      break;
                    case 3:
                      day = '수';
                      break;
                    case 4:
                      day = '목';
                      break;
                    case 5:
                      day = '금';
                      break;
                    case 6:
                      day = '토';
                      break;
                    default:
                      break;
                  }
                  today = `${nextCreatedDate.getMonth() + 1}월 ${nextCreatedDate.getDate()}일 ${day}요일`;
                }
              }

              if (message.sender !== userId) {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Grid container direction="row" ml={1}>
                      {/* 1대1 채팅, Sender를 표시할 필요가 없음 */}
                      <Grid item>
                        {/* <Typography variant="subtitle2" mb={1}>
                            {message.sender}
                          </Typography> */}
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" display={'inline-block'} bgcolor={'#e7e7e7'} borderRadius={'5px'} maxWidth={'240px'} p={1}>
                          {message.message}
                        </Typography>
                      </Grid>
                      {/* 시간 분 단위로 묶어서 출력 */}
                      <Grid item display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} pl={1}>
                        {displayTime ? (
                          <Typography variant="caption" fontWeight={'600'} color={'text.secondary'}>
                            {createdAt}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                    {/* 날짜가 바뀌면 출력 */}
                    {displayDate ? (
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <Typography variant="caption" style={{ width: '100px', textAlign: 'center', backgroundColor: '#D3D3D3', color: 'white', borderRadius: '20px', padding: '3px 5px' }}>
                          {today}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Grid container pr={1} className="myChat">
                      <Grid item container direction="row-reverse">
                        <Grid item justifyContent={'flex-end'} display={'flex'}>
                          <Typography variant="body1" display={'inline-block'} bgcolor={'error.light'} color={'white'} borderRadius={'5px'} p={1} textAlign="right" maxWidth="240px">
                            {message.message}
                          </Typography>
                        </Grid>
                        <Grid item display={'flex'} flexDirection={'column'} justifyContent={'flex-end'}>
                          {displayTime ? (
                            <Typography variant="caption" textAlign={'right'} pr={1} color={'text.secondary'} fontWeight={'bold'}>
                              {createdAt}
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                    {displayDate ? (
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        <Typography variant="caption" style={{ width: '100px', textAlign: 'center', backgroundColor: '#D3D3D3', color: 'white', borderRadius: '20px', padding: '3px 5px' }}>
                          {today}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Message 전송 */}
      <Grid container style={{ position: '', bottom: 0, borderTop: '1px solid #D3D3D3' }} p={2}>
        <Grid item xs mr={1}>
          {/* 입력할 메시지 입력, state로 관리 */}
          <TextField
            placeholder="메시지를 입력하세요."
            size="small"
            color="error"
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                publish();
              }
            }}
            fullWidth
            onChange={handleMessage}
            value={message}
            sx={{ border: 'none' }}
          />
        </Grid>
        <Grid item style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <SendIcon
            color=""
            onClick={() => {
              publish();
            }}
          />
        </Grid>
      </Grid>
    </Background>
  );
}
