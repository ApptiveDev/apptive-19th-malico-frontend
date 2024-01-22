import exampleStylistProfile from '@assets/images/exampleStylistProfile.png';
import {StylistInfo} from '@/models/UserInfo.ts';

type StylistInfoBoxProps = {
  info: StylistInfo,
}
const StylistInfoBox = ({info}: StylistInfoBoxProps) => {
  return <div className='h-[208px] rounded-lg flex flex-col w-[140px] flex-shrink-0 shadow'>
    <img className='w-[140px] h-[140px] flex-shrink-0 rounded-t-lg'
      src={info.profileImage ?? exampleStylistProfile} />
    <div className='w-full h-[68px] flex flex-col pt-[8px] px-[8px]'>

      <p className='text-[12px] font-semibold'>나는 빡빡이다</p>
      <p className='text-[12px] text-dark_grey'>내 눈을 바라봐 넌 행복해지고 내 ..</p>
    </div>
  </div>;
};
export default StylistInfoBox;
