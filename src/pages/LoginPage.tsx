import PageContainer from '@components/container/PageContainer.tsx';
import {useSelector} from 'react-redux';

import {RootState} from '@/modules';

import loginLogo from '@assets/images/login_logo.png';
import {ChangeEvent, ReactNode, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Input from '@components/input/Input.tsx';
import {limitInputNumber} from '@/utils';

const LoginPage = (): ReactNode => {
  const [/* userId */, setUserId] = useState('');
  const [/* userPassword */, setUserPassword] = useState('');
  const [errorMessage/* setErrorMessage */] = useState();

  const authenticated = useSelector((state: RootState) =>
    state.auth.authenticated,
  );

  if (authenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <PageContainer>
      <div className="flex justify-center mt-[100px]">
        <img className="w-[183px] h-183px"
          src={loginLogo} alt='logo'></img>
      </div>
      <div className="flex flex-col mt-[64px] pl-[16px] pr-[16px]">

        <Input placeholder="아이디 입력"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const inputId = e.target.value;
            setUserId(inputId);
            limitInputNumber(e, 10); // ID의 최대 글자수 제한: 10글자.
            // 사용자 정보 db 스키마가 정의되면 상수로서 정의하는 것이 좋을 것 같음
          }}></Input>

        <Input placeholder="비밀번호 입력" type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const inputPassword = e.target.value;
            setUserPassword(inputPassword);
            limitInputNumber(e, 20); // 비밀번호의 최대 글자수 제한: 20글자.
          }}
          errorMessage={errorMessage}
        ></Input>

      </div>
    </PageContainer>
  );
};

export default LoginPage;
