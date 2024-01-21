import Dropdown from '@components/input/Dropdown.tsx';
import {useEffect, useState} from 'react';
import stylistTypes from '@constants/stylistTypes.ts';
import regionTypes from '@constants/regionTypes.ts';
import exampleStylistProfile2 from '@assets/images/exampleStylistProfile2.png';

const StylistSearchArea = () => {
  const [style, setStyle] = useState<string>('모든 스타일');
  const [region, setRegion] = useState<string>('모든 지역');
  const [gender, setGender] = useState<string>('모든 성별');

  useEffect(() => {

  }, [style, region, gender]);

  return <div className='flex flex-col w-full grow'>
    <p className='text-[20px] font-semibold mb-2'>탐색</p>
    <div className='flex gap-2 flex-wrap'>
      <Dropdown selected={style} setSelected={(s) => {
        setStyle(s);
      }} selectable={stylistTypes} /> <Dropdown selected={region}
        setSelected={(s) => {
          setRegion(s);
        }} selectable={regionTypes} /> <Dropdown selected={gender}
        setSelected={(s) => {
          setGender(s);
        }} selectable={['모든 성별', '남', '여']} style={{
          width: '100px',
          height: '90px',
        }} />
    </div>
    <div className='mt-5 mb-5 grow flex flex-wrap gap-2 justify-center'>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
      <img className='w-[156px] h-[156px] rounded-md' src={exampleStylistProfile2}/>
    </div>
  </div>;
};
export default StylistSearchArea;
