import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Typography } from '@mui/material';
import 'styles/Board.css';
import axios from 'axios';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PageNumber from 'components/PageNumber';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
// import createdAt from 'utils/Time';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';

export default function Board() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userId, setUserId] = useState('');
  const getUserId = (id) => {
    setUserId(id);
  };

  const [searchInput, setSearchInput] = useState();
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  // 일단 기본값, 카테고리 검색 시 state를 받음 // useLocation? or null
  const [type, setType] = useState(state ? state.type : null);
  const [keyword, setKeyword] = useState(state ? state.keyword : null);

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({
    nowPage: '',
    startPage: '',
    endPage: '',
    totalPage: '',
  });
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (userId !== '') {
      console.log('axios 호출');
      console.log(type + ': ' + keyword);
      axios({
        url: '/api/board/getPostList',
        method: 'get',
        params: {
          page: pageNumber,
          type: type,
          keyword: keyword,
        },
      })
        .then((response) => {
          console.log('Get List');
          console.log(response);
          if (response.status === 200) {
            // [postList, imageList]를 담은 리스트 생성
            if (response.data.message === '게시글 리스트 불러오기 성공') {
              const post = response.data.postList.content;
              const image = response.data.imageList;
              const page = response.data.page;
              if (post && image && post.length === image.length) {
                const mergedList = response.data.postList.content.map((postItem, index) => ({
                  ...postItem,
                  image: image[index],
                }));
                setPostList(mergedList);
                setPage(page);
                console.log(postList);
              }
              setIsLoading(false);
            } else {
              alert(response.data.message);
            }
          } else {
            throw new Error('정의되지 않은 에러');
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [userId, pageNumber, keyword]);

  const clickPost = (postNumber) => {
    navigate('/postDetail', { state: postNumber });
  };

  // const [location, setLocation] = useState('');
  const searchByLocation = () => {
    console.log('현재 위치로 검색');
    axios({
      url: '/api/user/location',
      method: 'get',
      params: {
        userId: userId,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.message === '위치 조회 성공') {
            // setLocation(response.data.data);
            // console.log(location);
            // setLocation이 아니라
            setType('L');
            setKeyword(response.data.data);
          } else {
            alert(response.data.message);
          }
        } else {
          throw new Error('정의되지 않은 에러');
        }
      })
      .catch((error) => alert(error));
  };

  const actions = [
    {
      icon: (
        <Link to={'/post'} style={{ textDecoration: 'none', color: '#5f5f5f', display: 'flex' }}>
          <EditIcon />
        </Link>
      ),
      name: '글쓰기',
    },
    { icon: <LocationOnIcon onClick={searchByLocation} />, name: '위치 검색' },
  ];

  return (
    <Background style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar getUserId={getUserId} userId={userId} />
      {/* 등록된 아이템 리스트 보여주기 */}
      <h3 style={{ margin: '20px 20px 0 20px' }}>등록된 거래 목록</h3>
      <div style={{ padding: '16px 16px 8px 16px', marginTop: '8px' }}>
        <TextField
          fullWidth
          variant="standard"
          size="large"
          placeholder="검색어를 입력하세요."
          style={{ margin: '10px 0 10px 0' }}
          onChange={handleSearchInput}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              setPageNumber(0);
              setKeyword(searchInput);
              setType('T');
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ margin: '5px' }}
                onClick={() => {
                  setPageNumber(0);
                  setKeyword(searchInput);
                  setType('T');
                }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>

      <div style={{ overflow: 'scroll', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 반복 Card 구조*/}
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
            <Typography variant="body1" textAlign={'center'}>
              Loading...
            </Typography>
          </div>
        ) : postList.length > 0 ? (
          <div style={{ flex: '1' }}>
            {postList.map((post, index) => {
              // const imageUrl = 'http://localhost:80/image/' + post.image.uuid;
              const imageUrl = '/image/' + post.image.uuid; // 운영 환경의 url
              return (
                <div key={index}>
                  <div
                    style={{ display: 'flex', padding: '16px', marginBottom: '10px' }}
                    onClick={() => {
                      clickPost(post.postNum);
                    }}
                  >
                    <CardMedia component="img" sx={{ minHeight: 110, maxWidth: 110, maxHeight: 110, objectFit: 'cover', overflow: 'hidden', borderRadius: '10px' }} image={imageUrl} alt="default" />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} pl={2}>
                      <CardContent sx={{ flex: '1 0 auto', padding: '0', margin: '0', paddingBottom: '0' }}>
                        <Typography component="h4" variant="subtitle1" style={{ maxWidth: '230px', marginTop: '7px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2rem' }}>
                          {post.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="div" style={{ maxWidth: '210px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '5px' }}>
                          {post.location}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                          <Typography variant="subtitle1" fontSize={'15px'} fontWeight={'bold'} color={'#FF523A'} mr={1}>
                            {post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                          </Typography>
                          {post.status === 0 ? null : <div style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.2rem', padding: '2px 4px', backgroundColor: '#2c2c2c', borderRadius: '3px', color: 'white', textAlign: 'center' }}>거래완료</div>}
                        </Box>
                      </CardContent>
                    </Box>
                  </div>
                  <div style={{ display: 'block', borderBottom: '1px solid lightgray', margin: '0 16px', padding: '0' }} />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
            <Typography variant="body1" textAlign={'center'}>
              등록된 아이템이 없습니다.
            </Typography>
          </div>
        )}

        <div style={{ width: '100%', textAlign: 'center', padding: '10px 0 20px 0' }}>
          <PageNumber page={page} setPageNumber={setPageNumber} />
        </div>

        {/* Bottom Navbar */}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: 'absolute',
            bottom: 70,
            right: 20,
            '& .MuiFab-root.MuiFab-primary': {
              backgroundColor: 'error.main',
            },
          }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </div>
      <BottomNav />
    </Background>
  );
}
