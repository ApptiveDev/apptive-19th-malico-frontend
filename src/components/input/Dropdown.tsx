import {HTMLAttributes, useEffect, useRef, useState} from 'react';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  selected: string,
  setSelected: (selected: string) => void,
  selectable: string[]
}
const Dropdown = ({selected, setSelected, selectable, ...rest}: DropdownProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const outSideClick = (e: Event) => {
    if (!dropdownRef.current || !isOpened) {
      return;
    }
    if (!dropdownRef.current.contains(e.target as Node) && dropdownRef.current !== e.target) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('mousedown', outSideClick);
    }
    return () => {
      document.removeEventListener('mousedown', outSideClick);
    };
  }, [isOpened, setIsOpened]);

  return <div className='flex px-3 py-1 items-center w-fit rounded-full border
  border-black relative select-none h-[30px]'
  onClick={() => setIsOpened(!isOpened)} ref={dropdownRef}>
    <p className='mr-2 font-semibold text-[14px]'>{selected}</p>
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={isOpened ? 'rotate-180' : ''}
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M1.53244 0.266515L5.00447 3.80182L8.47651 0.266515C8.8255 -0.0888383 9.38926 -0.0888383 9.73826 0.266515C10.0872 0.621868 10.0872 1.1959 9.73826 1.55125L5.63087 5.73349C5.28188 6.08884 4.71812 6.08884 4.36913 5.73349L0.261745 1.55125C-0.0872483 1.1959 -0.0872483 0.621868 0.261745 0.266515C0.610738 -0.0797267 1.18345 -0.0888383 1.53244 0.266515Z" fill="#1C1C1E"/>
    </svg>
    {isOpened ?
      <div className='absolute h-[200px] w-[150px] top-[30px] left-0
      border border-dark_grey z-10 rounded-md overflow-y-auto flex flex-col bg-white' {...rest}>
        {selectable.map((menu)=>{
          return (<div
            className='h-[28px] flex items-center px-3 py-2 cursor-pointer hover:bg-light_grey'
            onClick={() => setSelected(menu)}>
            {menu}
          </div>);
        })}
      </div> : null}
  </div>;
};

export default Dropdown;
