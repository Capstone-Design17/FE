import { Button, TextField } from '@mui/material';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';

export default function Chatting() {
  // 채팅하기 버튼을 통해 접근
  // 버튼 클릭 시 postNum을 받아야 함
  // session의 userId와 post의 postNum, sellerId로 채팅방 호출
  // WebSocket을 이용한 데이터 통신

  const { state } = useLocation();
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const [chat, setChat] = useState([]); // 채팅 목록
  const [message, setMessage] = useState(); // 실시간으로 전송할 메시지
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const stompClient = useRef({});

  const connect = () => {
    console.log('Chatting Room: ' + state);
    // WebSocket
    stompClient.current = Stomp.over(() => new WebSocket('ws://localhost:8080/api/ws')); // Stomp Client

    // SockJS, Apic에서 SockJS로 테스트 할수가 없음
    // const stompClient = Stomp.over(() => new SockJS('http://localhost:8080/api/ws'));

    // WebSocket에 연결
    stompClient.current.connect({}, () => {
      // Subscribe
      // RoomId 동적으로
      // url 서버에 맞게
      stompClient.current.subscribe('/topic/chat/' + state, (data) => {
        const newMessage = JSON.parse(data.body);
        // 채팅 내역에 메시지 추가
        console.log('받은 메시지: ' + newMessage.sender + '-' + newMessage.message);
        setChat((prevChat) => [...prevChat, newMessage]);
        console.log(chat);
      });
    });
  };

  const disconnect = () => {
    stompClient.current.deactivate(); // 동작 확인 어떻게?
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  // Publish
  const publish = () => {
    if (!stompClient.current.connected) {
      alert('소켓 연결 끊김');
      return;
    }

    stompClient.current.send(
      '/app/chat',
      {},
      JSON.stringify({
        roomNum: state,
        sender: userId,
        message: message,
      }),
    );

    setMessage(''); // 메시지 보내는 칸 초기화
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        {/* 기존 채팅 내역 */}
        <div>History</div>
        {/* .map() */}

        {/* sender === userId면 오른쪽, 아니면 왼쪽 */}
        {/* 각각 Style이 달라야 함 */}
        {chat.length > 0 ? (
          <div>
            {chat.map((message, index) => (
              <div key={index} style={{ marginBottom: '40px', border: '1px solid black' }}>
                {/* <p>Room Number: {message.roomNum}</p> */}
                <Typography variant="subtitle2">{message.sender}</Typography>
                <Typography variant="body1" border={'1px solid black'}>
                  {message.message}
                </Typography>
                <Typography variant="caption">{message.createdAt}</Typography>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        <Grid container>
          <Grid item>
            {/* 입력할 메시지 입력, state로 관리 */}
            <TextField onChange={handleMessage} />
          </Grid>
          <Grid item>
            {/* Click 시 전송 */}
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                publish();
              }}
            >
              전송
            </Button>
          </Grid>
        </Grid>
      </div>
    </Background>
  );
}
