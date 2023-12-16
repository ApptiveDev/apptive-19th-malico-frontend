import customer from '@assets/icons/customer.svg';
import stylist from '@assets/icons/stylist.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/modules';
import {useEffect, useRef} from 'react';
import {setRegisterInfo} from '@modules/registerReducer.ts';
import Constants from '@/constants';
import PageCaption from '@components/text/PageCaption.tsx';

const TypeSelection = () => {
  const registerState =
    useSelector((state: RootState) => state.register);

  const dispatch = useDispatch();

  const customerRef = useRef<HTMLDivElement>(null);
  const stylistRef = useRef<HTMLDivElement>(null);

  const constant = Constants.register;
  useEffect(() => {
    if (customerRef.current === null || stylistRef.current === null) {
      return;
    }
    if (registerState.register_type === constant.infos.TYPE_CUSTOMER) {
      customerRef.current.classList.add('border-2', 'border-primary');
      stylistRef.current.classList.remove('border-2', 'border-primary');
    }
    if (registerState.register_type === constant.infos.TYPE_STYLIST) {
      stylistRef.current.classList.add('border-2', 'border-primary');
      customerRef.current.classList.remove('border-2', 'border-primary');
    }
  }, [registerState.register_type]);
  return (
    <>
      <PageCaption lines={['마리코에서 사용할 계정의', '유형을 선택해 주세요.']} />
      <div className='mt-[8px] h-[256px] w-full flex flex-col justify-between
       items-center border-box'>
        <div ref={customerRef} className='w-[340px] h-[120px] flex
        border rounded-[8px] border-middle_grey items-center px-6 cursor-pointer'
        onClick={() => {
          dispatch(setRegisterInfo({register_type: constant.infos.TYPE_CUSTOMER}));
        }}
        >
          <svg className='w-[72px] h-[72px]' style={{
            backgroundImage: 'url(' + customer + ')',
          }}></svg>
          <div className='w-[200px] h-[66px] ml-[13px] flex flex-col'>
            <p className='font-semibold text-[18px] tracking-[-0.4px]'>일반 고객으로
              가입하기</p>
            <div className='w-[180px] h-[30px] bg-light_grey mt-3
              rounded-[8px] flex justify-center items-center'>
              <p className='text-dark_grey text-[14px]'>스타일링을 받고 싶어요!</p>
            </div>
          </div>
        </div>
        <div ref={stylistRef} className='w-[340px] h-[120px] flex
        border rounded-[8px] border-middle_grey items-center px-6 cursor-pointer'
        onClick={() => {
          dispatch(setRegisterInfo({register_type: constant.infos.TYPE_STYLIST}));
        }}
        >
          <svg className='w-[72px] h-[72px]' style={{
            backgroundImage: 'url(' + stylist + ')',
          }}></svg>
          <div className='w-[200px] h-[66px] ml-[13px] flex flex-col'>
            <p className='font-semibold text-[18px] tracking-[-0.4px]'>스타일리스트로
              가입하기</p>
            <div className='w-[180px] h-[30px] bg-light_grey mt-3
              rounded-[8px] flex justify-center items-center'>
              <p className='text-dark_grey text-[14px]'>스타일링을 제공할래요!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TypeSelection;
