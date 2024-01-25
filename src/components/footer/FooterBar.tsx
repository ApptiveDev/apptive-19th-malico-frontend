import MenuIcon from '@components/icon/MenuIcon.tsx';
import Constants from '@/constants';

type FooterBarProps = {
  currentMenu: number,
  setCurrentMenu: (menuNumber: number) => void,
}

const FooterBar = ({currentMenu, setCurrentMenu}: FooterBarProps) => {
  const menuNums = Constants.mainpage.menu_nums;
  return <div className='w-full h-[85px] sticky'>
    <div className='mt-[28px] mb-[3px] w-full h-[54px] grid grid-cols-3 cursor-pointer'>
      <div className='w-full h-full flex justify-center items-center'
        onClick={() => setCurrentMenu(menuNums.MENU_STYLING)}>
        <MenuIcon menuType={menuNums.MENU_STYLING}
          selected={currentMenu === menuNums.MENU_STYLING} />
      </div>
      <div className='w-full h-full flex justify-center items-center cursor-pointer'
        onClick={() => setCurrentMenu(menuNums.MENU_HOME)}>
        <MenuIcon menuType={menuNums.MENU_HOME}
          selected={currentMenu === menuNums.MENU_HOME} />
      </div>
      <div className='w-full h-full flex justify-center items-center cursor-pointer'
        onClick={() => setCurrentMenu(menuNums.MENU_MYPAGE)}>
        <MenuIcon menuType={menuNums.MENU_MYPAGE}
          selected={currentMenu === menuNums.MENU_MYPAGE} />
      </div>
    </div>
  </div>;
};

export default FooterBar;
