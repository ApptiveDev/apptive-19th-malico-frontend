import React from 'react';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  onChange: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const LoginCheckbox = ({checked, onChange, label}: CheckboxProps) => {
  const bgColor = checked ? 'bg-primary' : 'bg-white';
  const bgClass = 'flex items-center justify-center w-[24px] ' +
    'h-[24px] border rounded-full ' +
    'checked:bg-primary checked:border-transparent ' +
    'focus:outline-none ' + bgColor;
  return (
    <>
      <label className='flex'>

        <div className={bgClass} onClick={onChange}>
          <svg width='14' height='10' viewBox='0 0 14 10'
            fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12.3327 1L4.99935 8.33333L1.66602 5'
              stroke={checked ? 'white' : 'black'} strokeWidth='2'
              strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </div>

        <p className='text-primary font-bold ml-[4px]'>
          {label && label}</p>
      </label>
    </>
  );
};

export default LoginCheckbox;
