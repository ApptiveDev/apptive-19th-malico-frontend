import {ReactNode} from 'react';
import IconButton from '@components/button/IconButton.tsx';
import backward from '@assets/icons/backward.svg';
import NavProgressBar from '@components/navbar/NavProgressBar.tsx';

type NavbarProps = {
  children?: ReactNode;
  title: string;
  hasBackwardButton?: boolean;
  hasProgressBar?: boolean;
  progressNumerator?: number;
  progressDominator?: number;
};
const Navbar = (props: NavbarProps) => {
  return (
    <div className='flex w-full flex-col shadow shadow-[rgba(0, 0, 0, 0.25)]'>
      <div className='flex w-full h-[60px] items-center'>
        <div className='w-[48px] h-[46px] flex justify-center items-center'>
          {props.hasBackwardButton ?
            <IconButton icon={backward}> </IconButton> : null}
        </div>
        <div className='flex flex-1 h-[46px] justify-center items-center'>
          <p className='font-apple text-[18px] mt-[3px] font-bold'>
            {props.title}
          </p>
        </div>
        <div className='w-[48px] h-[46px] flex justify-center items-center'>
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
