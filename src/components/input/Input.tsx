import {InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Input = ({label, errorMessage, ...rest}: InputProps) => {
  return <div className='mb-[8px] w-full'>
    {label && <label>{label}</label>}

    <input className='w-full h-10 px-3 py-2 border border-middle_grey
     rounded-md leading-tight focus:outline-none
      focus:border-blue-500 focus:ring text-[16px]' {...rest} />

    {errorMessage &&
      <span className='text-red-500 text-[14px] mt-[8px] ml-[4px]'>
        {errorMessage}
      </span>}
  </div>;
};
export default Input;
