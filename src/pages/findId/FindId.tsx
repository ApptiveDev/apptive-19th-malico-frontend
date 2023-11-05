import Constants from '@/constants';
import {useState} from 'react';
import Navbar from '@components/navbar/Navbar.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import PageContainer from '@components/container/PageContainer.tsx';

function FindId() {
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
}

export default FindId;