import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopupDom from 'components/PopupDom';
import PopupPostCode from 'components/PopupPostCode';

export default function Post() {
  const navigate = useNavigate();
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

  // 데이터
  const [postInput, setPostInput] = useState({
    // userId:
    // ...
  });

  // 세션에서 UserId 얻기
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [location, setLocation] = useState();
  // axios로 보낼 값 각각 저장
  const { title, category, price, content, detailLocation } = postInput;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
    console.log(postInput);
  };

  // validation
  // ... required는 어떻게 동작하는지?

  // 이미지
  const [images, setImages] = useState([]);
  // 이미지 확인
  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      // files 배열로 접근하여 axios로 전송
      const uploadFiles = Array.from(e.target.files);
      for (const value of uploadFiles.values()) {
        console.log(value);
      }
      console.log('이미지 개수 : ' + uploadFiles.length);
      // console.log(uploadFiles[0].name);
      setImages(uploadFiles);
    }
  };

  // form data
  const formData = new FormData();
  formData.append(
    'postDto',
    JSON.stringify({
      userId: userId, // 세션에서 userId 추출
      location: location,
      title: title,
      category: category,
      price: price,
      content: content,
      detailLocation: detailLocation,
    }),
  );
  for (const value of images.values()) {
    formData.append('images', value);
  }

  // 통신
  const writePost = () => {
    setPostInput({ ...postInput, ['userId']: userId });
    setLocation({ ...postInput, ['location']: location });
    for (const x of formData.entries()) {
      console.log(x);
    }
    axios({
      url: '/api/board/writePost',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      // data: {
      //   // new FormData()로 보냄?
      //   // 이미지가 첨부된 데이터를 어떻게 넘기는가?
      //   userId: userId,
      //   // location : user에 저장된 location?
      //   location: location,
      //   title: title,
      //   category: category,
      //   price: price,
      //   content: content,
      //   detailLocation: detailLocation, // detailLocation을 어떻게 표현?, 시/군/구 + detail로 바꾸기?
      // },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '게시글 등록 성공') {
            alert('등록 성공');
            navigate('/board');
          } else {
            alert('등록 실패 : ' + response.data.message);
          }
        } else {
          throw new Error('등록 실패 : 정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
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
              <TextField required id="outlined-required" label="제목" fullWidth margin="normal" color="error" name="title" onChange={handleInput} />
            </Grid>

            {/* 카테고리 */}
            {/* Select Box */}
            <Grid item>
              <TextField id="outlined-select-currency" defaultValue={''} select required label="카테고리" helperText="카테고리를 선택하세요." margin="normal" fullWidth color="error" name="category" onChange={handleInput}>
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
              name="price"
              margin="dense"
              color="error"
              onChange={handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="start">₩</InputAdornment>,
              }}
            />
          </div>

          {/* 내용 */}
          <div>
            <TextField required id="outlined-multiline-static" label="내용" multiline color="error" rows={6} margin="dense" name="content" helperText="최대한 자세하게 적어주세요." onChange={handleInput} />
          </div>

          {/* 지역: 도로명주소? API? */}
          <div>
            <Button onClick={openPostCode} style={{ marginTop: '20px' }}>
              우편번호 검색
            </Button>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode onClose={closePostCode} setLocation={setLocation} location={location} onChange={handleInput} />
                </PopupDom>
              )}
              {/* {location} */}
            </div>
          </div>

          <TextField required id="outlined-required" label="" margin="dense" color="error" value={location} />

          {/* 상세 주소 */}
          <TextField required id="outlined-required" label="상세 주소" margin="dense" color="error" name="detailLocation" onChange={handleInput} />

          {/* 등록 체크 */}
          <FormGroup>
            <FormControlLabel required control={<Checkbox color="error" size="small" />} label="확인하였습니다." sx={{ color: 'text.secondary' }} />
          </FormGroup>
        </Box>
      </div>

      {/* 등록 버튼 */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" marginBottom={2}>
        <Grid item xs={5}>
          <Button variant="contained" fullWidth size="large" color="error" sx={{ fontWeight: 'bold' }} onClick={writePost}>
            거래 등록
            {/* axios 호출 및 redirect */}
          </Button>
        </Grid>
        <Grid item xs={5}>
          {/* 취소 버튼 없앨 수도 */}
          <Button variant="outlined" fullWidth size="large" color="error" sx={{ fontWeight: 'bold' }}>
            <Link to="/board" style={{ textDecoration: 'none', color: '#d32f2f' }}>
              취소
            </Link>
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
