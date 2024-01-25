import {ReactNode} from 'react';
import IconButton from '@components/button/IconButton.tsx';
import backward from '@assets/icons/backward.svg';
import notification from '@assets/icons/notification.svg';
import NavProgressBar from '@components/navbar/NavProgressBar.tsx';
import {useNavigate} from 'react-router-dom';

type NavbarProps = {
  children?: ReactNode;
  title: string;
  containsHeadline?: boolean;
  hasBackwardButton?: boolean;
  hasNotificationButton?: boolean;
  hasProgressBar?: boolean;
  progressNumerator?: number;
  progressDominator?: number;
};
const Navbar = (props: NavbarProps) => {
  const titleClass = props.containsHeadline ?
    'text-[18px] mt-[3px] font-quicksand font-semibold tracking-wide' :
    'text-[18px] mt-[3px] font-bold';
  const navigate = useNavigate();
  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full h-[60px] items-center'>
        <div className='w-[48px] h-[46px] flex justify-center items-center'>
          {props.hasBackwardButton ?
            <IconButton icon={backward} onClick={() => {
              navigate(-1);
            }}> </IconButton> : null}
        </div>
        <div className='flex flex-1 h-[46px] justify-center items-center'>
          <p className={titleClass}>
            {props.title}
          </p>
        </div>
        <div className='w-[48px] h-[46px] flex justify-center items-center'>
          {props.hasNotificationButton ?
            <IconButton icon={notification} onClick={() => {
              navigate('/notification');
            }}> </IconButton> : null}
        </div>
      </div>
      {props.hasProgressBar &&
      props.progressNumerator && props.progressDominator ?
        <NavProgressBar numerator={props.progressNumerator}
          dominator={props.progressDominator} /> : null
      }
    </div>);
};
export default Navbar;
