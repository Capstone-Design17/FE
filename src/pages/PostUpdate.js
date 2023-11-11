import BottomNav from 'components/BottomNav';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Category from 'utils/Category';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import PopupDom from 'components/PopupDom';
import PopupPostCode from 'components/PopupPostCode';
import { isTitle, isPrice, isContent, isDetailLocation } from 'utils/Validation';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

export default function PostUpdate() {
  // Post 입력 양식 사용
  // DefaultValue로 Post의 원래값 사용?
  // axios로 데이터 전송
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };
  const currencies = Category();

  const [postInput, setPostInput] = useState({
    userId: '',
    location: '',
    title: '',
    category: '',
    content: '',
    price: '',
    detailLocation: '',
  });

  const [location, setLocation] = useState();
  const {
    title,
    // category,
    price,
    content,
    detailLocation,
  } = postInput;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPostInput({ ...postInput, [name]: value });
    console.log(postInput);
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
  // validation
  const isTitleValid = isTitle(title);
  const isPriceValid = isPrice(price);
  const isContentValid = isContent(content);
  const isDetailLocationValid = isDetailLocation(detailLocation);
  const isAllValid = isTitleValid && isPriceValid && isContentValid && isDetailLocationValid;

  const { state } = useLocation();
  const [post, setPost] = useState([]);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    console.log(state.postNum);
    axios({
      url: '/api/board/getPost',
      method: 'get',
      params: {
        postNum: state.postNum,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '게시글 불러오기 성공') {
            setPost(response.data.postDto);
            setImageList(response.data.imageList);
          } else {
            alert(response.data.message);
          }
        } else {
          throw new Error('정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />

      {/* <div
        style={{
          margin: '0',
          marginTop: '0',
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          overflow: 'auto',
          overflowX: 'hidden',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      > */}
      {/* 사진 클릭 시 확대 필요 */}
      <div>
        <Carousel
          style={{ position: 'relative' }}
          indicatorContainerProps={{
            style: {
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '6%',
              width: 'auto',
              padding: '0 10px',
              borderRadius: '20px',
              backgroundColor: 'white',
              opacity: '0.6',
              color: 'white',
              zIndex: 5,
              justifyContent: 'center',
              display: 'flex',
            },
          }}
        >
          {imageList.map((image, index) => {
            const imageUrl = 'http://localhost:80/image/' + image.uuid;
            // const imageUrl = '/image/' + image.uuid; // 실제 환경 Url
            return (
              <Paper key={index}>
                <img src={imageUrl} style={{ width: '100%', objectFit: 'cover' }} alt={`Image ${index}`} />
              </Paper>
            );
          })}
        </Carousel>
      </div>

      {/* Post 입력 양식 */}
      <div className="contentWrap">
        <Typography variant="h6" fontWeight={'bold'}>
          게시글 수정
        </Typography>
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
          {/* <Button component="label" variant="outlined" color="error">
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
          )} */}

          {/* 제목 */}
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField required id="outlined-required" label="제목" fullWidth margin="normal" color="error" name="title" onChange={handleInput} defaultValue={post.title} key={post.title} />
              {!isTitleValid && title.length > 0 && <div className="errorMessageWrap">제목을 입력해주세요.</div>}
            </Grid>

            {/* 카테고리 */}
            {/* Select Box */}
            <Grid item>
              <TextField id="outlined-select-currency" defaultValue={post.category} key={post.category} select required label="카테고리" helperText="카테고리를 선택하세요." margin="normal" fullWidth color="error" name="category" onChange={handleInput}>
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
              defaultValue={post.price}
              key={post.price}
              onChange={handleInput}
              InputProps={{
                endAdornment: <InputAdornment position="start">₩</InputAdornment>,
              }}
            />
            {!isPriceValid && price.length > 0 && <div className="errorMessageWrap">숫자만 입력 가능합니다.</div>}
          </div>

          {/* 내용 */}
          <div>
            <TextField required id="outlined-multiline-static" label="내용" defaultValue={post.content} key={post.content} multiline color="error" rows={6} margin="dense" name="content" helperText="최대한 자세하게 적어주세요." onChange={handleInput} />
            {!isContentValid && content.length > 0 && <div className="errorMessageWrap">최대 500자 입력 가능합니다.</div>}
          </div>

          {/* 도로명주소 API */}
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
            </div>
          </div>

          <TextField
            required
            id="outlined-required"
            label=""
            margin="dense"
            color="error"
            value={location || post.location}
            key={post.location}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* 상세 주소 */}
          <TextField required id="outlined-required" label="상세 주소" defaultValue={post.detailLocation} key={post.detailLocation} margin="dense" color="error" name="detailLocation" onChange={handleInput} />
          {!isDetailLocationValid && detailLocation.length > 0 && <div className="errorMessageWrap">필수 입력 사항입니다.</div>}
        </Box>
      </div>

      {/* 저장 / 취소 */}
      <Grid container sx={{ boxShadow: 3, textAlign: 'center' }}>
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={'bold'} color={'text.secondary'} sx={{ width: '100%' }} p={1} onClick={() => navigate('/postDetail', { state: post.postNum })}>
            취소
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: 'error.light', color: 'white' }} p={1}>
          {/* UserId가 SellerId면 Disabled 시키기 */}

          <Button disabled={!isAllValid}>
            <Typography variant="h6" fontWeight={'bold'} color={'white'}>
              저장
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <BottomNav />
    </Background>
  );
}
