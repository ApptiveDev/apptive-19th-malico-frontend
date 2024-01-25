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
    <div className='flex flex-col grow'>
      <div className='flex flex-col h-[200px] w-full items-center mt-10'>
        <img className='w-[140px] h-[140px] rounded-md cursor-pointer'
          src={info?.profileImage ?? defaultprofile}
          onClick={()=>setImageModalOpened(true)}/>
        <p className='mt-[20px] text-[18px] font-semibold'>{info?.nickname}</p>
      </div>
      <div className='flex flex-col mt-10 gap-8'>
        <div className='w-full h-[25px] flex justify-between items-center cursor-pointer'>
          <p className='font-semibold text-[18px] '>관심 스타일리스트</p>
          {/* eslint-disable-next-line max-len */}
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M0.386094 0.946371C-0.133906 1.46637 -0.133906 2.30637 0.386094 2.82637L5.55943 7.9997L0.386094 13.173C-0.133906 13.693 -0.133906 14.533 0.386094 15.053C0.906094 15.573 1.74609 15.573 2.26609 15.053L8.38609 8.93304C8.90609 8.41304 8.90609 7.57304 8.38609 7.05304L2.26609 0.933037C1.75943 0.42637 0.906094 0.426371 0.386094 0.946371Z" fill="#1C1C1E"/>
          </svg>
        </div>

        <div className='w-full h-[25px] flex justify-between items-center cursor-pointer'>
          <p className='font-semibold text-[18px] '>이용내역</p>
          {/* eslint-disable-next-line max-len */}
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M0.386094 0.946371C-0.133906 1.46637 -0.133906 2.30637 0.386094 2.82637L5.55943 7.9997L0.386094 13.173C-0.133906 13.693 -0.133906 14.533 0.386094 15.053C0.906094 15.573 1.74609 15.573 2.26609 15.053L8.38609 8.93304C8.90609 8.41304 8.90609 7.57304 8.38609 7.05304L2.26609 0.933037C1.75943 0.42637 0.906094 0.426371 0.386094 0.946371Z" fill="#1C1C1E"/>
          </svg>
        </div>

        <div className='w-full h-[25px] flex justify-between items-center cursor-pointer'>
          <p className='font-semibold text-[18px] '>후기 관리</p>
          {/* eslint-disable-next-line max-len */}
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M0.386094 0.946371C-0.133906 1.46637 -0.133906 2.30637 0.386094 2.82637L5.55943 7.9997L0.386094 13.173C-0.133906 13.693 -0.133906 14.533 0.386094 15.053C0.906094 15.573 1.74609 15.573 2.26609 15.053L8.38609 8.93304C8.90609 8.41304 8.90609 7.57304 8.38609 7.05304L2.26609 0.933037C1.75943 0.42637 0.906094 0.426371 0.386094 0.946371Z" fill="#1C1C1E"/>
          </svg>
        </div>

        <div className='w-full h-[25px] flex justify-between items-center cursor-pointer'>
          <p className='font-semibold text-[18px] '>개인정보 관리</p>
          {/* eslint-disable-next-line max-len */}
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M0.386094 0.946371C-0.133906 1.46637 -0.133906 2.30637 0.386094 2.82637L5.55943 7.9997L0.386094 13.173C-0.133906 13.693 -0.133906 14.533 0.386094 15.053C0.906094 15.573 1.74609 15.573 2.26609 15.053L8.38609 8.93304C8.90609 8.41304 8.90609 7.57304 8.38609 7.05304L2.26609 0.933037C1.75943 0.42637 0.906094 0.426371 0.386094 0.946371Z" fill="#1C1C1E"/>
          </svg>
        </div>
      </div>
    </div>
  </>;
};
export default MemberMyPage;
