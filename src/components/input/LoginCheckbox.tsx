import React from 'react';

import checkIcon from '@assets/icons/check.svg';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginCheckbox = ({checked, onChange, label}: CheckboxProps) => {
  return (
    <>
      <label className='flex'>

        <input type='checkbox'
          className='appearance-none w-[24px] h-[24px]
         border rounded-full border-gray-400
          checked:bg-blue-600 checked:border-transparent
          focus:outline-none'
          style={{
            backgroundImage: 'url("' + checkIcon + '")',
            backgroundSize: '70%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 55%',
          }}
          checked={checked}
          onChange={onChange}
        />

        <p className='text-primary font-bold font-apple ml-[4px]'>
          {label && label}</p>
      </label>
    </>
  );
};

export default LoginCheckbox;
