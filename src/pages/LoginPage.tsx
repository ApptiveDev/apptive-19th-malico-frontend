import PageContainer from '@components/container/PageContainer.tsx';
import {useSelector} from 'react-redux';

import {RootState} from '@/modules';

import loginLogo from '@assets/images/login_logo.png';
import {ChangeEvent, ReactNode, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Input from '@components/input/Input.tsx';
import {limitInputNumber} from '@/utils';
import Button from '@components/button/Button.tsx';
import Checkbox from '@components/input/Checkbox.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';

const LoginPage = (): ReactNode => {
  const [/* userId */, setUserId] = useState('');
  const [/* userPassword */, setUserPassword] = useState('');
  const [errorMessage/* setErrorMessage */] = useState();
  const [autologinChecked, setAutoLoginChecked] = useState(true);

  const authenticated = useSelector((state: RootState) =>
    state.auth.authenticated,
  );

  if (authenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <PageContainer> <ResponsiveContainer>
      <div className='flex flex-col pl-[16px] pr-[16px]'>
        <div className='flex justify-center mt-[100px]'>
          <img className='w-[183px] h-183px'
            src={loginLogo} alt='logo'></img>
        </div>
        <div className='flex flex-col mt-[64px]'>

          <Input placeholder='아이디 입력'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const inputId = e.target.value;
              setUserId(inputId);
              limitInputNumber(e, 10); // ID의 최대 글자수 제한: 10글자.
              // 사용자 정보 db 스키마가 정의되면 상수로서 정의하는 것이 좋을 것 같음
            }}></Input>

          <Input placeholder='비밀번호 입력' type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const inputPassword = e.target.value;
              setUserPassword(inputPassword);
              limitInputNumber(e, 20); // 비밀번호의 최대 글자수 제한: 20글자.
            }}
            errorMessage={errorMessage}
          ></Input>
        </div>
        <div className='flex mt-[16px] pl-[4px]'>
          <Checkbox checked={autologinChecked}
            onChange={() => setAutoLoginChecked(!autologinChecked)}
            label='로그인 상태 유지'
          />
        </div>
        <div className='flex flex-col mt-[16px]'>
          <Button label='로그인'></Button>
        </div>
        <div className='flex flex-row justify-stretch text-dark_grey
        mt-[24px] pl-[5px] pr-[5px] text-[14px]'>
          <Link to='/register'
            className='flex flex-1 justify-center'> 회원가입 </Link>
          <p className='ml-[8px] mr-[8px]'>|</p>
          <Link to='/find-id'
                className='flex flex-1 justify-center'>이메일 찾기</Link>
          <p className='ml-[8px] mr-[8px]'>|</p>
          <p className='flex flex-1 justify-center'>비밀번호 찾기</p>
        </div>
      </div>
    </ResponsiveContainer> </PageContainer>
  );
};

export default LoginPage;
