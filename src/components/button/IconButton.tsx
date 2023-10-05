import {ButtonHTMLAttributes} from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const Button = ({icon, ...rest}: IconButtonProps) => {
  return (
    <button className='cursor-pointer w-[32px] h-[32px] flex
     justify-center items-center' {...rest}>
      <img className='' src={icon}>
      </img>
    </button>
  );
};

export default Button;
