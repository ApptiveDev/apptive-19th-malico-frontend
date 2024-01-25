import {useEffect, useState} from 'react';
import {DetailedStylistInfo} from '@/models/UserInfo.ts';
import {useMatch} from 'react-router-dom';
import axiosInstance from '@utils/AxiosInstance.ts';
import Navbar from '@components/navbar/Navbar.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import Button from '@components/button/Button.tsx';

enum LoadingStatus {
  DATA_LOADING,
  DATA_LOAD_COMPLETE,
  DATA_LOAD_FAILED
}
const ServiceRequestPage = () => {
  const [stylistInfo, setStylistInfo] =
    useState<DetailedStylistInfo | null>(null);
  const [infoStatus, setInfoStatus] =
    useState<LoadingStatus>(LoadingStatus.DATA_LOADING);
  const match = useMatch('/service-request/:id');
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
      <Navbar title={'서비스 신청'} hasBackwardButton={true}/>
      <ScrollableContainer>
        <ResponsiveContainer>
          <div className='flex flex-col gap-2 w-full h-full'>
            <p className='font-semibold text-[18px] mt-5'>신청 할 서비스</p>
            {stylistInfo?.stylistServiceDtoList.map((service) => {
              return <div className='max-h-[200px] py-5 px-6 w-full
                flex flex-col bg-red-400 rounded-xl gap-1 cursor-pointer'>
                <div className='flex gap-3'>
                  <div className='bg-primary text-white flex items-center py-1 px-3 rounded-full'>
                    <p>{service.serviceCategoryDto.serviceType}</p>
                  </div>
                  <div className='bg-primary text-white flex items-center py-1 px-3 rounded-full'>
                    <p>{service.serviceCategoryDto.connectionType}</p>
                  </div>
                </div>
                <p className='font-semibold text-[18px] mt-4'>{service.serviceName}</p>
                <p>{service.serviceDescription}</p>
                <p className='font-semibold text-[18px]'>{service.price}원</p>
              </div>;
            }) }
            <hr className='mt-5'/>
            <p className='font-semibold text-[18px] mt-5'>환불 계좌 정보</p>
            <div className='grid grid-cols-[1fr,2fr] grid-rows-3 h-[100px] py-1'>
              <p className='font-semibold'>은행</p><p>농협</p>
              <p className='font-semibold'>계좌정보</p><p>111141-111-21</p>
              <p className='font-semibold'>예금주</p><p>예금주이름</p>
            </div>
            <hr className='mt-5'/>
            <p className='font-semibold text-[18px] mt-5'>주의사항</p>
            <div className='flex flex-col gap-5 text-[16px] text-dark_grey'>
              <p>· 아래의 계좌로 서비스 이용 요금을 입금 후 서비스 신청하기 버튼을 선택해 주세요.</p>
              <p>· 1일 이내에 스타일리스트의 확인 후 승인 여부가 알림으로 발송됩니다.</p>
              <p>· 승인 거절 시 입력하신 계좌 정보로 입금하신 금액이 환불 됩니다.</p>
            </div>

            <hr className='mt-5'/>
            <p className='font-semibold text-[18px] mt-5'>스타일리스트 계좌 정보</p>
            <div className='grid grid-cols-[1fr,2fr] grid-rows-3 h-[133px] py-1 mb-5'>
              <p className='font-semibold'>은행</p><p>농협</p>
              <p className='font-semibold'>계좌정보</p><p>111141-111-21</p>
              <p className='font-semibold'>예금주</p><p>스타일리스트명</p>
              <p className='font-semibold'>입금 금액</p><p className='font-semibold'>20,000원</p>
            </div>
          </div>
        </ResponsiveContainer>
      </ScrollableContainer>
      <StickyFooter>
        <div className='flex flex-col w-full px-6'>
          <Button label={'서비스 신청하기'} onClick={() => {
            const res = window.confirm('서비스를 신청하시겠습니까?');
            if (res) {
              window.alert('서비스 신청이 완료되었습니다. 스타일리스트의 승인 후 알림이 발송됩니다.');
              window.location.href = '/';
            }
          }}/>
        </div>
      </StickyFooter>
    </PageContainer> : null;
};
export default ServiceRequestPage;
