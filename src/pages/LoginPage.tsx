import PageContainer from '@components/container/PageContainer.tsx';
import {useSelector} from 'react-redux';

import {RootState} from '@/modules';

import loginLogo from '@assets/images/login_logo.png';
import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

const LoginPage = (): ReactNode => {
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
          src={loginLogo}></img>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
