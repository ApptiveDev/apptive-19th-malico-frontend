import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {useEffect, useState} from 'react';
import Constants from '@/constants';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getRequiredInfo} from '@modules/registerReducer.ts';
import RegisterContent from '@pages/register/RegisterContent.tsx';
import RegisterStepButton from '@components/button/RegisterStepButton.tsx';
import Button from '@components/button/Button.tsx';
import {RootState} from '@/modules';
import axiosInstance from '@utils/AxiosInstance.ts';
import {sanitizeString} from '@/utils';

const RegisterPage = () => {
  const constant = Constants.register;

  const registerState = useSelector((state: RootState) => state.register);

  const [displayProgressbar, setDisplayProgressbar] = useState(true);
  const [currentProgress, setCurrentProgress] =
    useState<number>(constant.page_start);
  const [canComplete, setCanComplete] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const progressNum = constant.getProgressFromHash(location.hash);
    setCurrentProgress(progressNum);
    if (progressNum > constant.page_nums.PAGE_INPUT_INFORMATION) {
      setDisplayProgressbar(false);
    }
  }, [location.hash]);

  useEffect(() => {
    if (currentProgress === constant.page_nums.PAGE_INPUT_INFORMATION) {
      let completeChange = true;
      const requiredInfo = getRequiredInfo(currentProgress);
      for (const key of requiredInfo) {
        if (typeof registerState[key] === 'undefined' || registerState[key] ===
          null || registerState[key] === '') {
          completeChange = false;
        }
      }
      setCanComplete(completeChange);
    } else {
      setCanComplete(false);
    }
  }, [registerState, currentProgress]);

  const registerConfirm = () => {
    if (canComplete) {
      const data = {
        name: registerState.name,
        userId: registerState.loginid,
        email: registerState.email,
        password: registerState.password,
        nickname: registerState.nickname,
        gender: registerState.gender,
      };
      const registerUrl = registerState.register_type ?
        '/auth/stylist/signup' : '/auth/member/signup';
      axiosInstance.post(registerUrl, data).then((res) => {
        navigate('/register-complete', {state: {registerData: res.data}});
      }).catch((err) => {
        if (err.response) {
          alert(sanitizeString(err.response.data.message));
        }
      });
    }
  };

  const authenticated = useSelector((state: RootState) =>
    state.auth.authenticated,
  );

  if (authenticated) {
    return <Navigate to={'/'}/>;
  }
  return (
    <PageContainer>

      <Navbar title={constant.page_titles[currentProgress]}
              hasBackwardButton={true}
              hasProgressBar={displayProgressbar} progressNumerator={currentProgress}
              progressDominator={constant.max_pages}>
      </Navbar>
      <ScrollableContainer>
        <ResponsiveContainer>
          <RegisterContent currentProgress={currentProgress}/>
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
        {currentProgress < constant.page_nums.PAGE_INPUT_INFORMATION ?
          <div className='w-full h-full max-w-[400px] flex flex-col px-6'>
            <RegisterStepButton currentProgress={currentProgress}/>
          </div> : <div className='w-full h-full max-w-[400px] flex flex-col px-6'>
            <Button label='확인' disabled={!canComplete} onClick={registerConfirm}/>
          </div>
        }
      </StickyFooter>
    </PageContainer>
  );
};

export default RegisterPage;
