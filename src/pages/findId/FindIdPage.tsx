import {useState} from 'react';
import Input from '@components/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import {limitInputNumber} from '@/utils';
import PageCaption from '@components/text/PageCaption.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import FindIdResult from '@pages/findId/FindIdResult.tsx';
import axiosInstance from '@utils/AxiosInstance.ts';
import {useNavigate} from 'react-router-dom';

enum EmailSendStatus {
  EMAIL_SENDABLE,
  EMAIL_PROCESSING,
  EMAIL_DISABLED,
  EMAIL_RESENDABLE,
  EMAIL_VERIFY_SUCCEED
}
const FindIdPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] =
    useState<string | undefined>(undefined);
  const [authnumErrorMessage/* setAuthnumErrorMessage*/] =
    useState<string | undefined>(undefined);

  const [sendStatus, setSendStatus] =
    useState<EmailSendStatus>(EmailSendStatus.EMAIL_DISABLED);

  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>();
  const [userId, setUserId] = useState<string>('');

  const [idExists, setIdExists] = useState<boolean>(false);

  const navigate = useNavigate();
  const sendVerification = (email: string) => {
    setSendStatus(EmailSendStatus.EMAIL_PROCESSING);
    axiosInstance.post('/auth/user/search/verification-code', {email: email}).then(() => {
      setSendStatus(EmailSendStatus.EMAIL_RESENDABLE);
    }).catch((err) => {
      console.log(err);
      if (err.response) {
        setSendStatus(EmailSendStatus.EMAIL_SENDABLE);
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
      setIdExists(true);
    } catch (e) {
      console.log(e);
      setIdExists(false);
    }
  };

  const getFooterButton = () => {
    return idExists ?
      <div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
        <Button label={'로그인'} onClick={() => {
          navigate('/login');
        }}>
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
      </div>;
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
                  setSendStatus(EmailSendStatus.EMAIL_DISABLED);
                } else {
                  setEmailErrorMessage(undefined);
                  setSendStatus(EmailSendStatus.EMAIL_SENDABLE);
                  setEmail(e.target.value);
                }
              }}
              errorMessage={emailErrorMessage}
              id='register-auth-email'
              disabled={sendStatus === EmailSendStatus.EMAIL_VERIFY_SUCCEED}/>
          </div>
          <Button label={sendStatus === EmailSendStatus.EMAIL_RESENDABLE ?
            '재전송' : '인증번호 전송'} style={{
            height: '40px',
            fontSize: '16px',
            flexShrink: 0,
          }} disabled={sendStatus === EmailSendStatus.EMAIL_DISABLED}
          onClick={() => {
            sendVerification(email);
          }} />
        </div>
        {sendStatus === EmailSendStatus.EMAIL_RESENDABLE ? <>
          <p className='text-blue-500 text-[14px] mt-[8px] ml-[4px]'>
            인증번호가 전송되었습니다.</p>
          <p className='text-[18px] font-semibold mt-[16px] mb-2'>인증번호</p>
          <div className='flex h-[40px] gap-2'>
            <div className='flex grow h-[40px]'>
              <Input
                placeholder={'인증번호를 입력해주세요.'}
                onChange={(e) => {
                  limitInputNumber(e, 6);
                  setVerificationCode(e.target.value);
                }}
                errorMessage={authnumErrorMessage}
                id='register-auth-number'
                disabled={false} />
            </div>
            <Button label='인증번호 확인' style={{
              height: '40px',
              fontSize: '16px',
              flexShrink: 0,
            }}
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
        {sendStatus === EmailSendStatus.EMAIL_VERIFY_SUCCEED ?
          <FindIdResult idExists={idExists} userId={userId} /> :
          getFindIdForm()}
      </ResponsiveContainer>
    </ScrollableContainer>
    <StickyFooter>
      {sendStatus === EmailSendStatus.EMAIL_VERIFY_SUCCEED ?
        <div className='w-full h-full max-w-[400px] flex flex-col px-6'>
          {getFooterButton()}
        </div> : null
      }
    </StickyFooter>
  </PageContainer>);
};

export default FindIdPage;
