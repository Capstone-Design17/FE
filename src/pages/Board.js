import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from 'components/Background';
import Navbar from 'components/Navbar';
import BottomNav from 'components/BottomNav';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Typography } from '@mui/material';
import 'styles/Board.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PageNumber from 'components/PageNumber';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import createdAt from 'utils/Time';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CreateIcon from '@mui/icons-material/Create';
import Grid from '@mui/material/Grid';

export default function Board() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const getUserId = (id) => {
    setUserId(id);
  };

  const [searchInput, setSearchInput] = useState();
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const [keyword, setKeyword] = useState();

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({
    nowPage: '',
    startPage: '',
    endPage: '',
    totalPage: '',
  });
  const [pageNumber, setPageNumber] = useState(0);

  // const getList = () => {
  useEffect(() => {
    console.log('axios 호출');
    axios({
      url: '/api/board/getPostList',
      method: 'get',
      params: {
        page: pageNumber,
        keyword: keyword,
      },
    })
      .then((response) => {
        console.log('Get List');
        console.log(response);
        if (response.status === 200) {
          // [postList, imageList]를 담은 리스트 생성
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
          }
          setIsLoading(false);
        } else {
          throw new Error('데이터 불러오기 실패');
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [pageNumber, keyword]);

  const clickPost = (postNumber) => {
    navigate('/postDetail', { state: postNumber });
  };

  return (
    <Background>
      <Navbar getUserId={getUserId} userId={userId} />
      {/* 등록된 아이템 리스트 보여주기 */}
      <h3 style={{ margin: '20px 20px 0 20px' }}>등록된 거래 목록</h3>
      <div className="contentWrap">
        <TextField
          fullWidth
          variant="standard"
          size="large"
          placeholder="검색어를 입력하세요."
          style={{ margin: '10px 0 10px 0' }}
          onChange={handleSearchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ margin: '5px' }}
                onClick={() => {
                  setPageNumber(0);
                  setKeyword(searchInput);
                }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>

        {/* 이미지 접근 예시 */}
        {/* nginx proxy로 접근 */}
        {/* <img src='/image/default.png' style={{width: '120px', marginBottom: '10px'}}/> */}

        {/* 반복 Card 구조*/}
        {isLoading ? (
          <p>Loading...</p>
        ) : postList.length > 0 ? (
          <div style={{ flex: '1' }}>
            {postList.map((post, index) => {
              const imageUrl = 'http://localhost:80/image/' + post.image.uuid;
              // const imageUrl = '/image/' + post.image.uuid; // 운영 환경의 url
              return (
                <Card
                  key={index}
                  sx={{ display: 'flex', margin: '10px 0', height: '140px' }}
                  onClick={() => {
                    clickPost(post.postNum);
                  }}
                >
                  <CardMedia component="img" sx={{ maxWidth: 120, minWidth: 120, maxHeight: 140, objectFit: 'cover', overflow: 'hidden' }} image={imageUrl} alt="default" />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '10px' }}>
                    <CardContent sx={{ flex: '1 0 auto', p: 1 }} style={{ paddingBottom: '8px' }}>
                      <Grid container item xs direction="row" p={0} m={0}>
                        <Grid item pr={1} xs>
                          <Typography component="h4" variant="subtitle1" style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {post.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" color="text.secondary" component="div" style={{ minWidth: '37px' }}>
                            {createdAt(post.createAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="caption" color="text.secondary" component="div" style={{ height: '40px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {post.location}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} style={{ paddingTop: '10px' }}>
                        <Typography variant="subtitle1">{post.price}원</Typography>
                        {post.status === 0 ? (
                          <Typography variant="overline" color={'green'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                            판매중
                            {/* post.status에 따라 다른 값 : 판매중(0), 예약중(1), 판매완료(2), 삭제된(3) */}
                          </Typography>
                        ) : (
                          <Typography variant="overline" color={'error'} sx={{ border: 1, borderRadius: 1, textAlign: 'center', width: '60px', height: '30px' }}>
                            판매완료
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </div>
        ) : (
          <p>No Data</p>
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

const actions = [
  {
    icon: (
      <Link to={'/post'} style={{ textDecoration: 'none', color: '#5f5f5f', display: 'flex' }}>
        <EditIcon />
      </Link>
    ),
    name: '글쓰기',
  },
  // 추후 목록 수정
  { icon: <CreateIcon />, name: 'ds' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];
