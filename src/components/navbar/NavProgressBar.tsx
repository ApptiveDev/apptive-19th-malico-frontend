import {useEffect, useState} from 'react';

type NavProgressBarProps = {
  numerator: number;
  dominator: number;
}
const NavProgressBar = ({numerator, dominator}: NavProgressBarProps) => {
  const [percentage, setPercentage] = useState((numerator / dominator) * 100);

  useEffect(() => {
    setPercentage((numerator / dominator * 100));
  }, [numerator, dominator]);

  return (
    <div className='flex w-full h-[5px] bg-transparent
     border-b border-gray-200'>
      <div
        className='h-full bg-primary transition-all duration-200 ease-in-out'
        style={{width: `${percentage}%`}}
      ></div>
    </div>
  );
};
export default NavProgressBar;
