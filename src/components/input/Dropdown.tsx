import {MouseEvent, useEffect, useRef, useState} from 'react';

interface DropdownProps {
  selected: string,
  setSelected: (selected: string) => void,
  selectable: string[]
}
const Dropdown = ({selected, setSelected, selectable}: DropdownProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    const outSideClick = (e: Event) => {
      const target = e.target;
      if (
        isOpened &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target as HTMLElement)
      ) {
        setIsOpened(false);
      }
    };
    if (isOpened) {
      window.addEventListener('mousedown', outSideClick);
    } else {
      window.removeEventListener('mousedown', outSideClick);
    }
  }, [isOpened]);
  return <div className='flex px-4 py-1 items-center w-fit rounded-full border-2
  border-black relative select-none'
  onClick={()=> setIsOpened(!isOpened)}>
    <p className='mr-2 font-semibold'>{selected}</p>
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={isOpened ? 'rotate-180' : ''}
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M1.53244 0.266515L5.00447 3.80182L8.47651 0.266515C8.8255 -0.0888383 9.38926 -0.0888383 9.73826 0.266515C10.0872 0.621868 10.0872 1.1959 9.73826 1.55125L5.63087 5.73349C5.28188 6.08884 4.71812 6.08884 4.36913 5.73349L0.261745 1.55125C-0.0872483 1.1959 -0.0872483 0.621868 0.261745 0.266515C0.610738 -0.0797267 1.18345 -0.0888383 1.53244 0.266515Z" fill="#1C1C1E"/>
    </svg>
    {isOpened ?
      <div className='absolute h-[200px] w-[150px] top-[35px] left-0
      border border-dark_grey z-10 rounded-md overscroll-y-auto' ref={dropdownRef}>
      </div> : null}
  </div>;
};

export default Dropdown;
