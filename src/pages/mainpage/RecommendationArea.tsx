import StylistInfoBox from '@pages/mainpage/StylistInfoBox.tsx';

const RecommendationArea = () => {
  return <div className='h-[330px] flex flex-col'>
    <p className='text-[20px] font-semibold'>추천 스타일리스트</p>
    <div className='flex items-center gap-[12px] overflow-x-auto
    overflow-y-hidden mt-[16px] h-[230px] pl-1 pr-2 hidden-scrollbar'>
      <StylistInfoBox />
      <StylistInfoBox />
      <StylistInfoBox />
    </div>
  </div>;
};

export default RecommendationArea;
