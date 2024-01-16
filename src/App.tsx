import {Route, Routes} from 'react-router-dom';
import LoginPage from '@pages/LoginPage.tsx';
import RegisterPage from '@pages/register/RegisterPage.tsx';
import FindIdPage from '@pages/findId/FindIdPage.tsx';
import MainPage from '@pages/MainPage.tsx';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axiosInstance from '@utils/AxiosInstance.ts';
import {StylistInfo, UserInfo} from '@/models/UserInfo.ts';
import {authSuccess} from '@modules/authReducer.ts';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // 로그인 확인 방법에는 mypage/member 또는 mypage/stylist/information에 요청을 보내는 것임.
    // 스타일리스트인 경우 /api/mypage/member에 대한 요청에 에러가 발생하므로 스타일리스트 api로 재ㅛㅇ청
    axiosInstance.get('/api/mypage/member/').then((res) => {
      const myInfo: UserInfo = res.data;
      myInfo.isStylist = false;
      dispatch(authSuccess(myInfo));
    }).catch(() => {
      axiosInstance.get('/api/mypage/stylist/information').then((res) => {
        const myInfo: StylistInfo = res.data;
        myInfo.isStylist = true;
        dispatch(authSuccess(myInfo));
      });
    });
  }, []);
  return <Routes>
    <Route path='/' element={<MainPage />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    <Route path='/find-id' element={<FindIdPage />}></Route>
    <Route path='/find-password' element={<FindIdPage />}></Route>
  </Routes>;
};

export default App;
