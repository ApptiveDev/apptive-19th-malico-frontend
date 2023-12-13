interface CheckboxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

const Checkbox = ({checked, setChecked}: CheckboxProps) => {
  return (
    <>
      <div
        className={checked ?
          'flex justify-center items-center rounded-full w-[24px] h-[24px] bg-primary' :
          'flex justify-center items-center rounded-full w-[24px] h-[24px] bg-middle_grey'}
        onClick={() => {
          setChecked(! checked);
        }}>
        <svg width='13' height='10' viewBox='0 0 14 10' fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M12.3327 1L4.99935 8.33333L1.66602 5'
            stroke={checked ? 'white' : 'black'}
            strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </div>
    </>
  );
};

export default Checkbox;
