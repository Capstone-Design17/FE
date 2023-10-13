import React from 'react';
import { Link } from 'react-router-dom';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import 'styles/Board.css';

export default function Board() {
  // const navigate = useNavigate();

  return (
    <Background>
      <Navbar />
      {/* 등록된 아이템 리스트 보여주기 */}
      <div className="contentWrap">
        아이템 리스트가 보여질 화면입니다.
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        {/* Bottom Navbar */}
        <div>style</div>
        <Link to={'/post'}>
          <Fab
            color="error"
            aria-label="edit"
            style={{
              position: 'fixed',
              bottom: '8%', // Adjust the value as needed
              right: '4%', // Adjust the value as needed
            }}
          >
            <EditIcon />
          </Fab>
        </Link>
      </div>
      <BottomNav />
    </Background>
  );
}
