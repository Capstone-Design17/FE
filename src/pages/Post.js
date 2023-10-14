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
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopupDom from 'components/PopupDom';
import PopupPostCode from 'components/PopupPostCode';
import Category from 'utils/Category';
import { isTitle, isPrice, isContent, isDetailLocation } from 'utils/Validation';

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
    userId: '',
    location: '',
    title: '',
    category: '',
    content: '',
    price: '',
    detailLocation: '',
  });

  // 세션에서 UserId 얻기
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const currencies = Category();
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
  const isTitleValid = isTitle(title);
  const isPriceValid = isPrice(price);
  const isContentValid = isContent(content);
  const isDetailLocationValid = isDetailLocation(detailLocation);
  const isAllValid = isTitleValid && isPriceValid && isContentValid && isDetailLocationValid;

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
              {!isTitleValid && title.length > 0 && <div className="errorMessageWrap">제목을 입력해주세요.</div>}
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
            {!isPriceValid && price.length > 0 && <div className="errorMessageWrap">숫자만 입력 가능합니다.</div>}
          </div>

          {/* 내용 */}
          <div>
            <TextField required id="outlined-multiline-static" label="내용" multiline color="error" rows={6} margin="dense" name="content" helperText="최대한 자세하게 적어주세요." onChange={handleInput} />
            {!isContentValid && content.length > 0 && <div className="errorMessageWrap">최대 500자 입력 가능합니다.</div>}
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

          <TextField
            required
            id="outlined-required"
            label=""
            margin="dense"
            color="error"
            value={location || ''}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* 상세 주소 */}
          <TextField required id="outlined-required" label="상세 주소" margin="dense" color="error" name="detailLocation" onChange={handleInput} />
          {!isDetailLocationValid && detailLocation.length > 0 && <div className="errorMessageWrap">필수 입력 사항입니다.</div>}
        </Box>
      </div>

      {/* 등록 버튼 */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Grid item xs={5}>
          <Button variant="contained" fullWidth size="large" color="error" sx={{ fontWeight: 'bold' }} onClick={writePost} disabled={!isAllValid}>
            거래 등록
            {/* axios 호출 및 redirect */}
          </Button>
        </Grid>
        <Grid item xs={5}>
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
