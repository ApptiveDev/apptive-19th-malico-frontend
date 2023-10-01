import {InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Input = (props: InputProps) => {
  return <div className='mb-[8px]'>
    {props.label && <label>{props.label}</label>}
    <input className='w-full h-10 px-3 py-2 border border-[rgba(229,229,234,1)]
     rounded-md leading-tight focus:outline-none
      focus:border-blue-500 focus:ring' {...props} />
    {props.errorMessage &&
      <span className='text-red-500 text-[16px] mt-[8px] ml-[4px]'>
        {props.errorMessage}
      </span>}
  </div>;
};
export default Input;
