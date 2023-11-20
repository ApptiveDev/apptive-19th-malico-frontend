import {useEffect, useRef, useState} from 'react';
import Checkbox from '@components/input/Checkbox.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {setRegisterInfo} from '@modules/registerReducer.ts';
import {RootState} from '@/modules';

const UserAgreement = () => {
  const strokeRef = useRef<SVGPathElement>(null);
  const registerState = useSelector((state: RootState) => state.register);

  const [checkedAll, setCheckedAll] =
    useState(registerState.tos_agreed ? registerState.tos_agreed : false);
  const [tosAgreed, setTosAgreed] =
    useState(registerState.tos_agreed ? registerState.tos_agreed : false);
  const [prvPolicyAgreed, setPrvPolicyAgreed] =
    useState(registerState.tos_agreed ? registerState.tos_agreed : false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRegisterInfo({tos_agreed: checkedAll}));
  }, [checkedAll]);

  useEffect(() => {
    if (!prvPolicyAgreed || !tosAgreed) {
      setCheckedAll(false);
    } else if (prvPolicyAgreed && tosAgreed) {
      setCheckedAll(true);
    }
  }, [prvPolicyAgreed, tosAgreed]);

  let agreeAllClass = 'flex items-center rounded-md' +
    ' w-full h-[48px] font-semibold cursor-pointer select-none ';
  agreeAllClass += checkedAll ?
    'text-white bg-primary' :
    'text-black bg-light_grey';
  return (<>
    <div className='p-6'>
      <p className='text-[24px] font-semibold'>마리코 서비스 이용약관에</p>
      <p className='text-[24px] font-semibold'>동의해주세요.</p>
    </div>
    <div className='mt-[40px] h-[256px] w-full flex flex-col items-center'>
      <div className={agreeAllClass}
        onClick={() => {
          setPrvPolicyAgreed(!checkedAll);
          setTosAgreed(!checkedAll);
        }}
      >
        <div className='flex ml-[16px] mr-[12px] items-center
        justify-center h-[24px] w-[24px]'>
          <svg width='14' height='10' viewBox='0 0 14 10' fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12.3327 1L4.99935 8.33333L1.66602 5'
              stroke={checkedAll ? 'white' : 'black'}
              strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
              ref={strokeRef} />
          </svg>
        </div>
        <p className='text-[16px]'>전체 약관 동의합니다</p>
      </div>
      <div className='flex w-full items-center flex-col mt-[8px]'>
        <div className='w-full h-[40px] pl-[16px] flex items-center'>
          <Checkbox checked={tosAgreed} setChecked={setTosAgreed} />
          <div className='border border-primary text-primary
          text-[12px] w-[33px] rounded-full flex justify-center items-center mx-[8px]'>
            필수
          </div>
          <p className='text-[14px]'>이용약관 동의</p>
        </div>
        <div className='w-full h-[40px] pl-[16px] flex items-center'>
          <Checkbox checked={prvPolicyAgreed} setChecked={setPrvPolicyAgreed} />
          <div className='border border-primary text-primary
          text-[12px] w-[33px] rounded-full flex justify-center items-center mx-[8px]'>
            필수
          </div>
          <p className='text-[14px]'>개인정보 수집 및 이용 동의</p>
        </div>
      </div>
    </div>
  </>);
};
export default UserAgreement;
