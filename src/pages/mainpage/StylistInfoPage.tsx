import {useEffect, useState} from 'react';
import {DetailedStylistInfo} from '@/models/UserInfo.ts';
import axiosInstance from '@utils/AxiosInstance.ts';
import {useMatch} from 'react-router-dom';
import PageContainer from '@components/container/PageContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import Button from '@components/button/Button.tsx';

enum LoadingStatus {
  DATA_LOADING,
  DATA_LOAD_COMPLETE,
  DATA_LOAD_FAILED
}

// 메인 앱 컴포넌트
const StylistInfoPage = () => {
  const [stylistInfo, setStylistInfo] =
    useState<DetailedStylistInfo | null>(null);
  const [infoStatus, setInfoStatus] =
    useState<LoadingStatus>(LoadingStatus.DATA_LOADING);
  const match = useMatch('/stylist-info/:id');
  const stylistId = match?.params.id;

  useEffect(() => {
    axiosInstance.get('/api/home/stylist/' + stylistId).then((res)=>{
      const data = res.data;
      console.log(data);
      setInfoStatus(LoadingStatus.DATA_LOAD_COMPLETE);
      setStylistInfo(data);
    });
  }, []);

  return infoStatus === LoadingStatus.DATA_LOAD_COMPLETE ?
    <PageContainer>
      <Navbar title={stylistInfo?.stageName ?? ''} hasBackwardButton={true}/>
      <ScrollableContainer>
        <ResponsiveContainer>
          <div className='w-full h-256px'>
            <img src={stylistInfo?.profileImage ?? ''} />
          </div>
          <div className='flex flex-col px-6 w-full grow mt-3 gap-2'>
            <p className='font-semibold text-[18px] mt-5'>한 줄 소개</p>
            <p className='text-[16px] mb-3'>{stylistInfo?.oneLineIntroduction}</p>

            <p className='font-semibold text-[18px] mt-5'>스타일리스트 소개</p>
            <p className='text-[16px] mb-3'>{stylistInfo?.stylistIntroduction}</p>
            <hr />

            <p className='font-semibold text-[18px] mt-5'>지역</p>
            <div className='h-[30px] border rounded-full w-fit px-3 flex items-center text-[16px]'>
              {stylistInfo?.city + ' ' + stylistInfo?.state}
            </div>

            <p className='font-semibold text-[18px] mt-5'>선호 스타일</p>
            <div className='w-full flex items-center flex-wrap gap-1'>
              {stylistInfo?.styleDtoList.map((style) => {
                return <div className='h-[30px] border rounded-full
              w-fit px-3 flex items-center text-[16px] py-3'>
                  {style.category}
                </div>;
              })}
            </div>


            <p className='font-semibold text-[18px] mt-5'>제공 서비스</p>
            <p className='text-dark_grey text-[16px]'>서비스 신청을 원하시면 클릭해주세요.</p>
            <div className='w-full flex flex-col gap-2'>
              {stylistInfo?.stylistServiceDtoList.map((service) => {
                return <a href={'/service-request/' + stylistId}>
                  <div className='max-h-[200px] py-5 px-6 w-full
                flex flex-col bg-red-400 rounded-xl gap-1 cursor-pointer'>
                    <div className='flex gap-3'>
                      <div className='bg-primary text-white flex items-center
                      py-1 px-3 rounded-full'>
                        <p>{service.serviceCategoryDto.serviceType}</p>
                      </div>
                      <div className='bg-primary text-white flex items-center
                      py-1 px-3 rounded-full'>
                        <p>{service.serviceCategoryDto.connectionType}</p>
                      </div>
                    </div>
                    <p className='font-semibold text-[18px] mt-4'>{service.serviceName}</p>
                    <p>{service.serviceDescription}</p>
                    <p className='font-semibold text-[18px]'>{service.price}원</p>
                  </div>
                </a>;
              })}
            </div>
            <p className='font-semibold text-[18px] mt-5'>경력사항</p>
            <div className='w-full flex flex-col gap-2'>
              {stylistInfo?.careerDtoList.map((career) => {
                return <div>
                  <p className='font-semibold text-[16px]'>
                    {career.organizationName} ({career.startYear} - {career.endYear})
                  </p>
                  <p className='text-[13px] text-dark_grey'>{career.content}</p>
                </div>;
              })}
            </div>
          </div>

        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
        <div className='w-full flex flex-col px-6'>
          <Button label={'서비스 문의하기'}>
          </Button>
        </div>
      </StickyFooter>
    </PageContainer> : <></>;
};

export default StylistInfoPage;
