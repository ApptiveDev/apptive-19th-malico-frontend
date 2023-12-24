import Navbar from '@components/navbar/Navbar.tsx';
import {useState} from 'react';
import Constants from '@/constants';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import FooterBar from '@components/footer/FooterBar.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';

const MainPage = () => {
  const menuNums = Constants.mainpage.menu_nums;
  const menuTitles = Constants.mainpage.menu_titles;
  const [currentMenu, setCurrentMenu] =
    useState(menuNums.MENU_HOME);

  return (
    <PageContainer>
      <Navbar title={menuTitles[currentMenu]} hasNotificationButton={true}
        containsHeadline={true}/>
      <ScrollableContainer>
        <ResponsiveContainer>
          <div className='flex grow'/>
        </ResponsiveContainer>
      </ScrollableContainer>
      <FooterBar currentMenu={currentMenu} />
    </PageContainer>
  );
};

export default MainPage;
