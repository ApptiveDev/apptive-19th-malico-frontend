import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {useEffect, useState} from 'react';
import Constants from '@/constants';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {clearRegisterInfo} from '@modules/registerReducer.ts';
import RegisterContent from '@pages/register/RegisterContent.tsx';
import RegisterStepButton from '@components/button/RegisterStepButton.tsx';

const RegisterPage = () => {
  const constant = Constants.register;

  const [displayProgressbar, setDisplayProgressbar] = useState(true);
  const [currentProgress, setCurrentProgress] =
    useState<number>(constant.page_start);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const progressNum = constant.getProgressFromHash(location.hash);
    setCurrentProgress(progressNum);
    if (progressNum > constant.page_nums.PAGE_INPUT_INFORMATION) {
      setDisplayProgressbar(false);
    }
  }, [location.hash]);

  useEffect(() => {
    if (!location.pathname.startsWith('/register')) {
      dispatch(clearRegisterInfo());
    }
  }, [location, dispatch]);

  return (
    <PageContainer>

      <Navbar title={constant.page_titles[currentProgress]}
        hasBackwardButton={true}
        hasProgressBar={displayProgressbar} progressNumerator={currentProgress}
        progressDominator={constant.max_pages}>
      </Navbar>
      <ScrollableContainer>
        <ResponsiveContainer>
          <RegisterContent currentProgress={currentProgress} />
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
        {currentProgress < constant.page_nums.PAGE_INPUT_INFORMATION ?
          <div className='w-full h-full max-w-[400px] flex flex-col'>
            <RegisterStepButton currentProgress={currentProgress} />
          </div> : null}
      </StickyFooter>
    </PageContainer>
  );
};

export default RegisterPage;
