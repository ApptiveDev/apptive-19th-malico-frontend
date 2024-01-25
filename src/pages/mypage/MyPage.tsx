import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
import Button from '@components/button/Button.tsx';
import {useNavigate} from 'react-router-dom';
import MemberMyPage from '@pages/mypage/member/MemberMyPage.tsx';

const MyPage = () => {
  const registerState = useSelector((rootState: RootState) => rootState.auth);
  const navigate = useNavigate();
  return registerState.authenticated ?
    <MemberMyPage /> :
    <div className='flex flex-col justify-center items-center w-full'>
      <p className='text-[20px] font-semibold'>로그인이 필요한 서비스입니다.</p>
      <Button label='로그인 화면으로 이동' onClick={() => navigate('/login')}
        style={{
          height: '48px',
          width: '80%',
          marginTop: '40px',
        }}
      ></Button>
    </div>;
};
export default MyPage;
