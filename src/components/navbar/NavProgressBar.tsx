type NavProgressBarProps = {
  numerator: number;
  dominator: number;
}
const NavProgressBar = ({numerator, dominator}: NavProgressBarProps) => {
  const paintColor = () => {
    const ret = [];
    const keyPrefix = 'nav-progressbar-';
    for (let i = 0; i < dominator; i++) {
      const colorClass = i <= numerator - 1 ?
        'bg-primary' : 'bg-transparent';
      const key = keyPrefix + i.toString();
      ret.push(<div className={'flex-1 ' + colorClass} key={key}></div>);
    }
    return ret;
  };
  return <div className='flex w-full h-[5px]'>
    {paintColor()}
  </div>;
};
export default NavProgressBar;
