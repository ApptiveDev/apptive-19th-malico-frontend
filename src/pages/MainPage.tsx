import Navbar from '@components/navbar/Navbar.tsx';
import {useState} from 'react';
import Constants from '@/constants';
import FooterBar from '@components/footer/FooterBar.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import MyPage from '@pages/mypage/MyPage.tsx';

const MainPage = () => {
  const menuNums = Constants.mainpage.menu_nums;
  const [currentMenu, setCurrentMenu] =
    useState(menuNums.MENU_HOME);

  const getMenuContent = () => {
    switch (currentMenu) {
      case menuNums.MENU_MYPAGE:
        return <MyPage />;
    }
    return null;
  };

  return (
    <PageContainer>
      <Navbar title={'MARICO'} hasNotificationButton={true}
        containsHeadline={true}/>
      <ScrollableContainer>
        <ResponsiveContainer>
          <div className='flex grow px-6'>
            {getMenuContent()}
          </div>
        </ResponsiveContainer>
      </ScrollableContainer>
      <FooterBar currentMenu={currentMenu} setCurrentMenu={setCurrentMenu}/>
    </PageContainer>
  );
};

export default MainPage;
