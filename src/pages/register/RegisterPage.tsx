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

const RegisterPage = () => {
  const [displayProgressbar, setDisplayProgressbar] = useState(true);
  const [currentProgress, setCurrentProgress] =
    useState<number>(Constants.register.page_start);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const progressNum = Constants.register.getProgressFromHash(location.hash);
    setCurrentProgress(progressNum);
    if (progressNum > Constants.register.page_nums.PAGE_INPUT_INFORMATION) {
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

      <Navbar title={Constants.register.page_titles[currentProgress]}
        hasBackwardButton={true}
        hasProgressBar={displayProgressbar} progressNumerator={currentProgress}
        progressDominator={Constants.register.max_pages}>
      </Navbar>
      <ScrollableContainer>
        <ResponsiveContainer>
          <RegisterContent currentProgress={currentProgress} />
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
      </StickyFooter>
    </PageContainer>
  );
};

export default RegisterPage;
