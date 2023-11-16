import {useEffect, useState} from 'react';

interface CheckboxProps {
  initialState: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({initialState, onChange}: CheckboxProps) => {
  const [checked, setChecked] = useState(initialState);
  useEffect(() => {
    setChecked(initialState);
  }, [initialState]);
  return (
    <>
      <div
        className={checked ?
          'flex justify-center items-center rounded-full w-[24px] h-[24px] bg-primary' :
          'flex justify-center items-center rounded-full w-[24px] h-[24px] bg-middle_grey'}
        onClick={() => {
          if (onChange) {
            onChange(checked);
          }
          setChecked(!checked);
        }}>
        <svg width='13' height='10' viewBox='0 0 14 10' fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M12.3327 1L4.99935 8.33333L1.66602 5'
            stroke={checked ? 'white' : 'black'}
            stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </div>
    </>
  );
};

export default Checkbox;
