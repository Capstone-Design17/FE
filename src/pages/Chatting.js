import { Button, TextField } from '@mui/material';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

export default function Chatting() {
  // 채팅하기 버튼을 통해 접근
  // 버튼 클릭 시 postNum을 받아야 함
  // session의 userId와 post의 postNum, sellerId로 채팅방 호출
  // WebSocket을 이용한 데이터 통신

  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };
  const { state } = useLocation();

  // const [sockJs, setSockJs] = useState();
  const [chat, setChat] = useState([
    {
      roomNum: '',
      sender: '',
      message: '',
      createdAt: '',
    },
  ]); // 채팅 목록
  // const [message, setMessage] = useState(); // 실시간으로 전송된 메시지

  // WebSocket
  const webSocket = new WebSocket('ws://localhost:8080/api/ws');
  const stompClient = Stomp.over(webSocket);

  // SockJS, Apic에서 SockJS로 테스트 할수가 없음
  // const sockJs = new SockJS('http://localhost:8080/api/ws'); // Sub?
  // const stompClient = Stomp.over(sockJs);

  useEffect(() => {
    console.log('Chatting Room: ' + state);

    // WebSocket에 연결
    stompClient.connect({}, () => {
      // Subscribe
      // RoomId 동적으로
      // url 서버에 맞게
      stompClient.subscribe('/topic/chat/1', (data) => {
        const newMessage = JSON.parse(data.body);
        // 채팅 내역에 메시지 추가
        console.log('받은 메시지 ' + newMessage);
        setChat((prevChat) => [...prevChat, newMessage]);
        console.log(chat);
      });
    });
  }, [chat]);

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      <div className="contentWrap">
        <div>
          {chat.map((message, index) => (
            <div key={index} style={{ marginBottom: '40px', border: '1px solid black' }}>
              {/* <p>Room Number: {message.roomNum}</p> */}
              <p>Sender: {message.sender}</p>
              <p>Message: {message.message}</p>
              <p>Created At: {message.createdAt}</p>
            </div>
          ))}
        </div>

        <Grid container>
          <Grid item>
            {/* 입력할 메시지 입력, state로 관리 */}
            <TextField />
          </Grid>
          <Grid item>
            {/* Click 시 전송 */}
            <Button variant="outlined" color="error">
              전송
            </Button>
          </Grid>
        </Grid>
      </div>
    </Background>
  );
}
