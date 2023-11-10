import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ChatIcon from '@mui/icons-material/Chat';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const board = () => {
    navigate('/board');
  };

  const chatList = () => {
    navigate('/chatList');
  };

  const myPage = () => {
    navigate('/myPage');
  };

  return (
    <Box>
      <BottomNavigation showLabels>
        {/* 내용 수정 필요 */}
        <BottomNavigationAction label="홈" value="board" icon={<DashboardIcon />} onClick={board} />
        <BottomNavigationAction label="카테고리" value="category" icon={<CategoryIcon />} />
        <BottomNavigationAction label="채팅" value="chatList" icon={<ChatIcon />} onClick={chatList} />
        <BottomNavigationAction label="마이페이지" value="mypage" icon={<ContactPageIcon />} onClick={myPage} />
      </BottomNavigation>
    </Box>
  );
}
