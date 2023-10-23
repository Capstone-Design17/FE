import React, { useEffect } from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Session from 'utils/Session';
import { useState } from 'react';
import Logout from 'components/Logout';

export default function Navbar(props) {
  const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const isSessionValid = Session();
  useEffect(() => {
    if (isSessionValid.id) {
      props.getUserId(isSessionValid.id);
    }
  }, [isSessionValid, props]);

  // const logoutSession = logout();

  return (
    <>
      <AppBar position="static" color="error">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Text
            {/* 로고 넣기 */}
          </Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal open={open} onClose={closeMenu} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isSessionValid.id}님{/* 로그아웃 버튼 */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            로그아웃하시겠습니까?
            <br />
            <br />
          </Typography>
          <DialogActions>
            <Logout />
            <Button variant="outlined" color="error" onClick={closeMenu}>
              취소
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
}
