import Navbar from '@components/navbar/Navbar.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import PageCaption from '@components/text/PageCaption.tsx';
import {useLocation, useNavigate} from 'react-router-dom';
import checkFailIcon from '@assets/icons/check_fail.svg';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import Button from '@components/button/Button.tsx';
import Input from '@components/input/Input.tsx';
import {ChangeEvent, useEffect, useState} from 'react';
import axiosInstance from '@utils/AxiosInstance.ts';
import {sanitizeString} from '@/utils';

const ResetPasswordPage = () => {
  const location = useLocation();
  const passwordExists = location.state ? location.state.passwordExists : true;
  const userId = location.state ? location.state.userId : null;
  const verificationCode = location.state ? location.state.verificationCode : null;

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>();
  const [passConfirmErrorMessage, setPassConfirmErrorMessage] = useState<string>();

  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();

  const [canConfirm, setCanConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (! passwordErrorMessage && ! passConfirmErrorMessage) {
      setCanConfirm(true);
    } else {
      setCanConfirm(false);
    }
  }, [passwordErrorMessage, passConfirmErrorMessage]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>, errorMessage: string) => {
    if (! e.target.validity) {
      setPasswordErrorMessage(errorMessage);
    } else {
      setPasswordErrorMessage(undefined);
    }
  };
  const validatePasswords = () => {
    const passwordsMatch = password === passwordConfirm;
    if (passwordsMatch) {
      setPassConfirmErrorMessage(undefined);
    } else {
      setPassConfirmErrorMessage('비밀번호가 동일하지 않습니다.');
    }
  };

  const applyPasswordChange = () => {
    const data = {
      code: verificationCode,
      userId,
      password: password,
    };
    console.log(data);
    axiosInstance.patch('/auth/user/search/password', data).then(() => {
      alert('비밀번호 변경이 완료되었습니다.');
      navigate('/login');
    }).catch((e) => {
      if (e.response) {
        alert(sanitizeString(e.response.data.message));
      }
    });
  };

  // if (! location.state) {
  //   return <Navigate to={'/'} />;
  // }

  return <PageContainer>
    <Navbar title={'새 비밀번호 입력'} hasBackwardButton={true}>
    </Navbar>
    <ScrollableContainer>
      <ResponsiveContainer>
        {
          passwordExists ?
            <>
              <PageCaption lines={['새로운 비밀번호를', '입력해 주세요.']} />
              <div className='flex flex-col px-6'>
                <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호</p>
                <Input
                  errorMessage={passwordErrorMessage}
                  placeholder='영문, 숫자, 특수문자 포함 8~20자 이내'
                  id='register-auth-password'
                  type='password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handlePasswordChange(e, '영문, 숫자, 특수문자 포함 8~20자 이내로 입력해주세요.');
                  }}
                  pattern={'^[A-Za-z\\d@$!%*?&]{8,20}$'}
                  onBlur={validatePasswords}
                />
                <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호확인</p>
                <Input
                  errorMessage={passConfirmErrorMessage}
                  placeholder='비밀번호를 한 번 더 입력해주세요.'
                  id='register-auth-password_confirm'
                  type='password'
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  onBlur={validatePasswords}
                />
              </div></> :
            <div className='flex flex-col grow mx-4 justify-center'>
              <div className='flex flex-col justify-center'>
                <div
                  className='inline-flex h-[40px] bg-no-repeat bg-center mb-4'
                  style={{
                    backgroundImage: 'url("' + checkFailIcon + '")',
                  }}>
                </div>
              </div>
              <div className='flex flex-col text-center
                justify-center font-bold text-[24px]'>
                <p>죄송합니다.</p>
                <p>등록된 회원정보가 없습니다.</p>
              </div>
            </div>
        }
      </ResponsiveContainer>
    </ScrollableContainer>
    <StickyFooter>
      {passwordExists ?
        <div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
          <Button label={'확인'} disabled={!canConfirm} onClick={() => {
            applyPasswordChange();
          }}></Button>
        </div>:
        <div className='w-full h-full max-w-[400px] flex flex-col px-6 py-6 gap-2'>
          <Button label={'회원가입'} onClick={() => {
            navigate('/register');
          }}>
          </Button>
          <Button label={'처음으로 돌아가기'} style={{
            backgroundColor: 'white',
            borderColor: 'black',
            color: 'black',
            border: '1px black solid',
          }} onClick={() => {
            navigate('/');
          }}></Button>
        </div>}
    </StickyFooter>
  </PageContainer>;
};
export default ResetPasswordPage;
