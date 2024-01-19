import customer from '@assets/icons/customer.svg';
import stylist from '@assets/icons/stylist.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/modules';
import PageCaption from '@components/text/PageCaption.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import Button from '@components/button/Button.tsx';
import AxiosInstance from '@utils/AxiosInstance.ts';
import {ACCESS_TOKEN_ITEM_KEY, authSuccess} from '@modules/authReducer.ts';
import {useLocation, useNavigate} from 'react-router-dom';
import {clearRegisterInfo} from '@modules/registerReducer.ts';

const RegisterCompletionPage = () => {
  const registerState =
    useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const registerInfo = location.state.registerData;

  const name = registerState.nickname;
  const isStylist = registerState.register_type; // 1일때 스타일리스트

  const captionImage = isStylist ? stylist : customer;


  const clearInfo = () => {
    dispatch(clearRegisterInfo());
  };

  const getCompleteButton = () => {
    // const link = registerState.register_type ? .. : ..;
    return (<div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
      <Button label={'프로필 등록하기'} onClick={() => {
        clearInfo();
      }} />
      <Button label={'홈으로 이동하기'} style={{
        backgroundColor: 'white',
        color: 'black',
        border: 'black 1px solid',
      }} onClick={() => {
        AxiosInstance.post('/auth/user/login', {
          userId: registerState.loginid,
          password: registerState.password,
        }).then((res) => {
          registerInfo.isStylist = Boolean(registerState.register_type);
          dispatch(authSuccess(registerInfo));
          const accessToken = res.data.accessToken;
          localStorage.setItem(ACCESS_TOKEN_ITEM_KEY, accessToken);
          navigate('/');
          clearInfo();
        });
      }}/>
    </div>);
  };
  return (
    <PageContainer>
      <Navbar title={'회원가입 완료'}>
      </Navbar>
      <ScrollableContainer>
        <ResponsiveContainer>
          <PageCaption lines={[name + '님,', '마리코의 회원이 되신 것을', '환영합니다.']} />
          <div className='mt-[40px] w-full h-[300px] flex flex-col items-center justify-center'>
            <div className='h-[300px] w-[80%] flex flex-col items-center
          rounded-xl border-4 border-light_grey justify-center'>
              <svg className='w-[160px] h-[160px]' style={{
                backgroundImage: 'url(' + captionImage + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}></svg>
              <p className='mt-5 text-[18px]'>맞춤형 스타일링을 제공하기 위해</p>
              <p className='text-[18px]'>프로필을 등록해 주세요!</p>
            </div>
          </div>
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
        {getCompleteButton()}
      </StickyFooter>
    </PageContainer>
  );
};
export default RegisterCompletionPage;
