import StylistInfoBox from '@pages/mainpage/StylistInfoBox.tsx';
import axiosInstance from '@utils/AxiosInstance.ts';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
import Button from '@components/button/Button.tsx';
import {useNavigate} from 'react-router-dom';
import {StylistInfo} from '@/models/UserInfo.ts';

const RecommendationArea = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [stylistInfos, setStylistInfos] = useState<StylistInfo[]>([]);
  useEffect(() => {
    if (authState.authenticated) {
      axiosInstance.get('/api/home/member/recommend').then((res) => {
        setStylistInfos(res.data);
      }).catch((error) => {
        alert('페이지의 내용을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
        console.log(error);
      });
    }
  }, [authState.authenticated]);

  const getStylistBox = () => {
    const ret = [];
    let i = 0;
    for (const stylist of stylistInfos) {
      const key = stylist.stageName ?? 'stylist-name' + i;
      ret.push(<StylistInfoBox info={stylist} key={key}/>);
      i+=1;
    }
    return ret;
  };
  const fakeStylistInfo: StylistInfo = {
    nickname: '',
    stylistId: 0,
    profileImage: undefined,
    onLineIntroduction: '설명1234설명',
    stageName: 'exampleStylist',
  };
  const navigate = useNavigate();
  return <div className='h-[330px] flex flex-col'>
    <p className='text-[20px] font-semibold'>추천 스타일리스트</p>
    <div className='flex items-center gap-[12px] overflow-x-auto
    overflow-y-hidden mt-[16px] h-[230px] pl-1 pr-2 hidden-scrollbar relative'>
      {
        authState.authenticated ?
          (<>
            {getStylistBox()}
          </>):
          <>
            <div className='absolute w-full max-w-[340px]
            flex items-center justify-center h-[230px]'>
              <Button label={'로그인'} style={{
                zIndex: '10',
                borderRadius: '40px',
              }} onClick={() => {
                navigate('/login');
              }}/>
            </div>
            <div className='flex items-center gap-[12px] overflow-x-auto
              overflow-y-hidden h-[230px] hidden-scrollbar blur-sm'>
              <StylistInfoBox info={fakeStylistInfo}/><StylistInfoBox info={fakeStylistInfo}/>
              <StylistInfoBox info={fakeStylistInfo}/>
            </div>
          </>
      }
    </div>
  </div>;
};

export default RecommendationArea;
