import {Route, Routes} from 'react-router-dom';
import LoginPage from '@pages/LoginPage.tsx';
import RegisterPage from '@pages/register/RegisterPage.tsx';
import FindIdPage from '@pages/findId/FindIdPage.tsx';
import MainPage from '@pages/MainPage.tsx';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axiosInstance from '@utils/AxiosInstance.ts';
import {StylistInfo, UserInfo} from '@/models/UserInfo.ts';
import {
  ACCESS_TOKEN_ITEM_KEY,
  authError,
  authSuccess,
} from '@modules/authReducer.ts';
import RegisterCompletionPage from '@pages/register/RegisterCompletionPage.tsx';
import {clearRegisterInfo} from '@modules/registerReducer.ts';
import FindPasswordPage from '@pages/findPassword/FindPasswordPage.tsx';
import ResetPasswordPage from '@pages/findPassword/ResetPasswordPage.tsx';
import NoticePage from '@pages/notification/NotificationPage.tsx';
import NoticeDetailPage from '@pages/notification/NoticeDetailPage.tsx';
import StylistInfoPage from '@pages/mainpage/StylistInfoPage.tsx';
import ServiceRequestPage from '@pages/mainpage/ServiceRequestPage.tsx';

const App = () => {
  const dispatch = useDispatch();


  // 회원가입 페이지가 아닌 경우 registerState에서 정보 삭제
  useEffect(() => {
    if (!location.pathname.startsWith('/register')) {
      dispatch(clearRegisterInfo());
    }
  }, [location]);

  useEffect(() => {
    // 로그인 확인 방법에는 mypage/member 또는 mypage/stylist/information에 요청을 보내는 것임.
    // 스타일리스트인 경우 /api/mypage/member에 대한 요청에 에러가 발생하므로 스타일리스트 api로 재요청
    axiosInstance.get('/api/mypage/member/').then((res) => {
      const myInfo: UserInfo = res.data;
      myInfo.isStylist = false;
      dispatch(authSuccess(myInfo));
    }).catch(() => {
      axiosInstance.get('/api/mypage/stylist/information').then((res) => {
        const myInfo: StylistInfo = res.data;
        myInfo.isStylist = true;
        dispatch(authSuccess(myInfo));
      }).catch((err) => {
        // auth 실패
        dispatch(authError('로그인 실패'));
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          // 토큰이 만료되거나 권한 거부가 아닌, 회원 탈퇴로 인해 토큰 정보를 찾을 수 없는 경우 404
          if (localStorage.getItem(ACCESS_TOKEN_ITEM_KEY)) {
            localStorage.removeItem(ACCESS_TOKEN_ITEM_KEY);
            location.reload();
          }
        }
      });
    });
  }, []);
  return <Routes>
    <Route path='/' element={<MainPage />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    <Route path='/find-id' element={<FindIdPage />}></Route>
    <Route path='/find-password' element={<FindPasswordPage />}></Route>
    <Route path='/reset-password' element={<ResetPasswordPage />}></Route>
    <Route path='/register-complete' element={<RegisterCompletionPage />}></Route>
    <Route path='/notification' element={<NoticePage />}></Route>
    <Route path="/notice/:id" element={<NoticeDetailPage />}></Route>
    {/* <Route path="/inquiry/:id" element={<InquiryDetailPage />}></Route> */}
    <Route path='/stylist-info/:id' element={<StylistInfoPage />}></Route>
    <Route path='/service-request/:id' element={<ServiceRequestPage />}></Route>
  </Routes>;
};

export default App;
