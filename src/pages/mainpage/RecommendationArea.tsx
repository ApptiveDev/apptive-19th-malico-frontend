import StylistInfoBox from '@pages/mainpage/StylistInfoBox.tsx';
import axiosInstance from '@utils/AxiosInstance.ts';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
//
// type StylistInfo = {
//   stylistId: number,
//   profileImage?: string,
//   onLineIntroduction?: string,
//   stageName: string,
// }
const RecommendationArea = () => {
  const authState = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (authState.authenticated) {
      axiosInstance.get('/api/home/member/recommend').then((res) => {
        console.log(res);
      }).catch((error) => {
        alert('페이지의 내용을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
        console.log(error);
      });
    }
  }, [authState.authenticated]);
  let containerClass = 'flex items-center gap-[12px] overflow-x-auto ' +
    'overflow-y-hidden mt-[16px] h-[230px] pl-1 pr-2 hidden-scrollbar';
  if (! authState.authenticated) {
    containerClass += ' blur-sm';
  }
  return <div className='h-[330px] flex flex-col'>
    <p className='text-[20px] font-semibold'>추천 스타일리스트</p>
    <div className={containerClass}>
      {
        authState.authenticated ?
          (<><StylistInfoBox /><StylistInfoBox /><StylistInfoBox /></>) :
          <>
            <StylistInfoBox /><StylistInfoBox /><StylistInfoBox />
          </>
      }
    </div>
  </div>;
};

export default RecommendationArea;
