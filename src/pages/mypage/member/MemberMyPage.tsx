import defaultprofile from '@assets/icons/default_profile.svg';
import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
import {useState} from 'react';
import ProfileChangeModal from '@pages/mypage/ProfileChangeModal.tsx';
const MemberMyPage = () => {
  const authState = useSelector((rootState: RootState) => rootState.auth);
  const info = authState.myInfo;

  const [imageModalOpened, setImageModalOpened] = useState(false);
  return <>
    {imageModalOpened ? <ProfileChangeModal setClosed={() => setImageModalOpened(false)} /> : null}
    <div className='flex flex-col h-[200px] w-full items-center mt-10'>
      <img className='w-[140px] h-[140px] rounded-md cursor-pointer'
        src={info?.profile_image ?? defaultprofile}
        onClick={()=>setImageModalOpened(true)}/>
      <p className='mt-[20px]'>{info?.nickname}</p>
    </div>
  </>;
};
export default MemberMyPage;
