import {useSelector} from 'react-redux';
import {useState} from 'react';
import Input from '@components/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import {limitInputNumber} from '@/utils';
import {RootState} from '@/modules';
import PageCaption from '@components/text/PageCaption.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import FindIdResult from '@pages/findId/FindIdResult.tsx';
import axiosInstance from '@utils/AxiosInstance.ts';

const FindIdPage = () => {
  const registerState = useSelector((state: RootState) => state.register);
  const [emailErrorMessage, setEmailErrorMessage] =
    useState<string | undefined>(undefined);
  const [firstSendComplete, setFirstSendComplete] =
    useState(false);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [authnumErrorMessage/* setAuthnumErrorMessage*/] =
    useState<string | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<string>();

  const [emailSent, setEmailSent] =
    useState(registerState.authorized);

  const [email, setEmail] = useState<string>('');
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const [idExists, setIdExists] = useState<boolean>(false);

  const sendVerification = (email: string) => {
    setFirstSendComplete(true);
    setEmailSent(true);
    setSendDisabled(false);

    axiosInstance.post('/auth/user/search/verification-code', {email: email}).then(() => {
      setFirstSendComplete(true);
      setEmailSent(true);
      setSendDisabled(false);
    }).catch((err) => {
      console.log(err);
      if (err.response) {
        setSendDisabled(false);
        setFirstSendComplete(false);
        setEmailSent(false);
      }
    });
  };
  const verifyCode = async () => {
    try {
      await axiosInstance.get('/auth/user/search/verification-code?code=' + verificationCode);
    } catch (e) {
      return false;
    }
    return true;
  };

  const getResult = async () => {
    try {
      const res = await axiosInstance.get('/auth/user/search/id?code=' + verificationCode);
      const userid = res.data.data;
      setUserId(userid);
      setAuthorized(true);
      setIdExists(true);
    } catch (e) {
      console.log(e);
      setAuthorized(true);
      setUserId('');
    }
  };

  const getFindIdForm = () => {
    return (<><PageCaption lines={['아이디를 찾기 위해', '본인 인증을 진행해 주세요.']} />
      <div className='px-6 mt-[8px]'>
        <p className='text-[18px] font-semibold mt-[16px] mb-2'>이메일</p>
        <div className='flex h-[40px] gap-2'>
          <div className='flex grow h-[40px]'>
            <Input placeholder='이메일 입력'
              type={'email'}
              pattern='[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,4}'
              onChange={(e) => {
                limitInputNumber(e, 85);
                if (!e.target.validity.valid) {
                  setEmailErrorMessage('이메일을 다시 확인해주세요.');
                  setSendDisabled(true);
                } else {
                  setEmailErrorMessage(undefined);
                  setSendDisabled(false);
                  setEmail(e.target.value);
                }
              }}
              errorMessage={emailErrorMessage}
              id='register-auth-email'
              disabled={emailSent}
              defaultValue={registerState.email ?? registerState.email} />
          </div>
          <Button label={firstSendComplete ? '재전송' : '인증번호 전송'} style={{
            height: '40px',
            fontSize: '16px',
            flexShrink: 0,
          }} disabled={sendDisabled}
          onClick={() => {
            sendVerification(email);
          }} />
        </div>
        {emailSent ? <>
          <p className='text-blue-500 text-[14px] mt-[8px] ml-[4px]'>
            인증번호가 전송되었습니다.</p>
          <p className='text-[18px] font-semibold mt-[16px] mb-2'>인증번호</p>
          <div className='flex h-[40px] gap-2'>
            <div className='flex grow h-[40px]'>
              <Input
                placeholder={registerState.authorized ?
                  '인증 완료' :
                  '인증번호를 입력해주세요.'}
                onChange={(e) => {
                  limitInputNumber(e, 6);
                  setVerificationCode(e.target.value);
                }}
                errorMessage={authnumErrorMessage}
                id='register-auth-number'
                disabled={registerState.authorized} />
            </div>
            <Button label='인증번호 확인' style={{
              height: '40px',
              fontSize: '16px',
              flexShrink: 0,
            }} disabled={registerState.authorized}
            onClick={async () => {
              const authResult = await verifyCode();
              if (authResult) {
                alert('인증이 완료되었습니다.');
                await getResult();
              } else {
                alert('인증에 실패했습니다. 인증번호를 다시 확인해 주세요.');
              }
            }} />
          </div>
        </> : null}
      </div>
    </>);
  };

  return (<PageContainer>
    <Navbar title={'아이디 찾기'} hasBackwardButton={true}/>
    <ScrollableContainer>
      <ResponsiveContainer>
        {authorized ? <FindIdResult idExists={idExists} userId={userId} /> : getFindIdForm()}
      </ResponsiveContainer>
    </ScrollableContainer>
    <StickyFooter>
      {authorized ?
        <div className='w-full h-full max-w-[400px] flex flex-col px-6'>
          {authorized ?
            idExists ?
              <div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
                <Button label={'로그인'} onClick={() => {}}>
                </Button>
                <Button label={'비밀번호 찾기'} style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  color: 'black',
                  border: '1px black solid',
                }}></Button>
              </div> :
              <div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
                <Button label={'회원가입'} onClick={() => {}}>
                </Button>
                <Button label={'처음으로 돌아가기'} style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  color: 'black',
                  border: '1px black solid',
                }}></Button>
              </div> : null
          }
        </div> : null
      }
    </StickyFooter>
  </PageContainer>);
};

export default FindIdPage;
