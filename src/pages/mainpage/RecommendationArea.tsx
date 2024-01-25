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
  const fakeStylistInfo: StylistInfo = {
    nickname: '',
    stylistId: 0,
    // eslint-disable-next-line max-len
    profileImage: 'https://maricobucket.s3.ap-northeast-2.amazonaws.com/63eaad5c-b2c3-416b-b668-6bd6aad11b3a.jpg',
    oneLineIntroduction: '스타일리스트 추천 예시입니다.',
    stageName: '스타일리스트',
  };
  useEffect(() => {
    if (authState.authenticated) {
      axiosInstance.get('/api/home/member/recommend').then((res) => {
        setStylistInfos(res.data);
      }).catch(() => {
        const res = [];
        for (let i=0; i<3; i++) {
          res.push(fakeStylistInfo);
        }
        setStylistInfos([fakeStylistInfo, fakeStylistInfo]);
      });
    }
  }, [authState.authenticated]);

  const getStylistBox = () => {
    const ret = [];
    let i = 0;
    for (const stylist of stylistInfos) {
      const key = 'stylist-name' + i;
      ret.push(<StylistInfoBox info={stylist} key={key}/>);
      i+=1;
    }
    return ret;
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
