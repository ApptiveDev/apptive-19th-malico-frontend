import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {useEffect, useState} from 'react';
import Constants from '@/constants';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import {useLocation} from 'react-router-dom';

const RegisterPage = () => {
  const [displayProgressbar, setDisplayProgressbar] = useState(true);
  const [currentProgress, setCurrentProgress] =
    useState<number>(Constants.register.page_start);
  const loc = useLocation();

  useEffect(() => {
    const progressNum = Constants.register.getProgressFromHash(loc.hash);
    setCurrentProgress(progressNum);
    if (progressNum > Constants.register.page_nums.PAGE_INPUT_INFORMATION) {
      setDisplayProgressbar(false);
    }
  }, [loc.hash]);

  return (
    <PageContainer>

      <Navbar title={Constants.register.page_titles[currentProgress]}
        hasBackwardButton={true}
        hasProgressBar={displayProgressbar} progressNumerator={currentProgress}
        progressDominator={Constants.register.max_pages}>
      </Navbar>
      <ScrollableContainer>
        <ResponsiveContainer>
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
      </StickyFooter>
    </PageContainer>
  );
};

export default RegisterPage;
