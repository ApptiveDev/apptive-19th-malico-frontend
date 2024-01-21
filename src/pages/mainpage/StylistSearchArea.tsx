import Dropdown from '@components/input/Dropdown.tsx';

const StylistSearchArea = () => {
  return <div className='flex flex-col w-full h-[200px]'>
    <p className='text-[20px] font-semibold mb-2'>탐색</p>
    <div className='flex gap-2'>
      <Dropdown selected={'스타일'} setSelected={() => {}} selectable={['']} />
      <Dropdown selected={'지역'} setSelected={() => {}} selectable={['']} />
      <Dropdown selected={'성별'} setSelected={() => {}} selectable={['']} />
    </div>
  </div>;
};
export default StylistSearchArea;
