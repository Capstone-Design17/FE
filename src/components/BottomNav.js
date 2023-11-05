import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

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
        <BottomNavigationAction label="홈" icon={<RestoreIcon />} />
        <BottomNavigationAction label="채팅" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="마이페이지" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
