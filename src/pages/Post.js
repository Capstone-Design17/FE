import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import BottomNav from 'components/BottomNav';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Post() {
  /*
    axios로 넘겨줄 값
      userId : 세션에서 추출
      location : 간단한 위치, 소속?
      title : 게시글 제목
      category : 카테고리
      content : 본문
      price : 가격
      detailLocation : 실제 거래할 장소
      // status : 판매 상태, 로직으로 처리-등록이니까 default
      // boughtUserId : 구매자, 로직으로 처리-default
  */

  const [images, setImages] = useState([]);
  // 이미지 확인
  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      // files 배열로 접근하여 axios로 전송
      const uploadFiles = Array.from(e.target.files);
      console.log(uploadFiles.length);
      console.log(uploadFiles[0].name);
      setImages(uploadFiles);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Background>
      <Navbar />
      <div className="titleWrap">
        <div className="title">거래 등록</div>
      </div>
      <div className="contentWrap">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '100%' },
          }}
          display={'flex'}
          flexDirection={'column'}
          noValidate
          autoComplete="off"
        >
          {/* 사진 등록 */}
          <Button component="label" variant="outlined" color="error">
            <AddAPhotoIcon />
            <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={onChangeImg} />
          </Button>
          {images.length > 0 && (
            <div>
              <Typography variant="caption" m={1} component="h6">
                등록된 이미지 : {images.length}
              </Typography>
              <Typography variant="caption" m={2} component="h6">
                {images.map((image) => (
                  <li key={image.name}>{image.name}</li>
                ))}
              </Typography>
            </div>
          )}

          {/* 제목 */}
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField required id="outlined-required" label="제목" fullWidth margin="normal" color="error" />
            </Grid>

            {/* 카테고리 */}
            {/* Select Box */}
            <Grid item>
              <TextField id="outlined-select-currency" defaultValue={''} select required label="카테고리" helperText="카테고리를 선택하세요." margin="normal" fullWidth color="error">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* 가격 */}
          <div>
            <TextField
              required
              id="outlined-required"
              label="가격"
              margin="dense"
              color="error"
              InputProps={{
                startAdornment: <InputAdornment position="start">₩</InputAdornment>,
              }}
            />
          </div>

          {/* 내용 */}
          <div>
            <TextField required id="outlined-multiline-static" label="내용" multiline color="error" rows={6} margin="dense" />
          </div>

          {/* 거래희망 장소, 지도 API 사용으로 변경? */}
          <TextField required id="outlined-required" label="거래희망 장소" margin="dense" color="error" />

          {/* 등록 체크 */}
          <FormGroup margin={1}>
            <FormControlLabel required control={<Checkbox color="error" size="small" />} label="확인하였습니다." sx={{ color: 'text.secondary' }} />
          </FormGroup>
        </Box>
      </div>

      {/* 등록 버튼 */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" marginBottom={2}>
        <Grid item xs={5}>
          <Button variant="contained" fullWidth size="large" color="error" sx={{ fontWeight: 'bold' }}>
            거래 등록
            {/* axios 호출 및 redirect */}
          </Button>
        </Grid>
        <Grid item xs={5}>
          {/* 취소 버튼 없앨 수도 */}
          <Button variant="outlined" fullWidth size="large" color="error" sx={{ fontWeight: 'bold' }}>
            취소
            {/* Link to='/board' */}
          </Button>
        </Grid>
      </Grid>
      <BottomNav />
    </Background>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const currencies = [
  // 카테고리 정의 : 변경 필요
  {
    value: '1',
    label: 'category1',
  },
  {
    value: '2',
    label: 'category2',
  },
  {
    value: '3',
    label: 'category3',
  },
  {
    value: '4',
    label: 'category4',
  },
];
