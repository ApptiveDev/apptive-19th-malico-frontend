import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {useState} from 'react';
import Constants from '@/constants';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';

const RegisterPage = () => {
  const [displayProgressbar/* , setDisplayProgressbar*/] = useState(true);
  const [currentProgress/* , setCurrentProgress*/] =
    useState(Constants.register.page_start);

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
