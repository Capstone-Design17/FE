import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ChatIcon from '@mui/icons-material/Chat';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const defaultValue = state?.value || 'board';
  const [value, setValue] = React.useState(defaultValue);

  useEffect(() => {
    navigate('/' + value, { state: { value: value } });
  }, [value]);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* 내용 수정 필요 */}
        <BottomNavigationAction label="홈" value="board" icon={<DashboardIcon />} />
        <BottomNavigationAction label="카테고리" value="category" icon={<CategoryIcon />} />
        <BottomNavigationAction label="채팅" value="chatList" icon={<ChatIcon />} />
        <BottomNavigationAction label="마이페이지" value="mypage" icon={<ContactPageIcon />} />
      </BottomNavigation>
    </Box>
  );
}
