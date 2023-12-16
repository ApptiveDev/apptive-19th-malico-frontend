import {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
}

const Button = ({label, disabled, ...rest}: ButtonProps) => {
  let btnClass =
    `h-[52px] px-5 rounded-md
  transition duration-300 ease-in-out hover:bg-primary-transition
  text-[18px] focus:outline-none
  focus:ring-grey-200 `;
  btnClass += disabled? 'bg-light_grey text-grey' : 'bg-primary text-white';
  return (
    <button
      className={btnClass} {...rest}>
      {label}
    </button>
  );
};

export default Button;
