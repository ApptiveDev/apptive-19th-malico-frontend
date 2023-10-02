import {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className='bg-primary text-white h-[52px] px-5 rounded-md
       transition duration-300 ease-in-out hover:bg-primary-transition
        text-[18px] focus:outline-none focus:ring
        focus:ring-blue-200 font-apple'{...props}>
      {props.label}
    </button>
  );
};

export default Button;
