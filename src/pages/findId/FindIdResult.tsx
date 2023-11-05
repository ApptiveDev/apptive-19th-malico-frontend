import {useState} from 'react';
import Button from '@components/button/Button.tsx';
import checkFailIcon from '@assets/icons/check_fail.svg';
import checkSuccessIcon from '@assets/icons/check_success.svg';

function FindIdResult() {
  const [findId] = useState('maricolove');
  const [existId, setExistId] = useState(false);

  return (
        <div >
          {
            existId ? (
              <div className='flex flex-col h-[calc(100vh-72px)] mx-4'>
                <div className='flex flex-col flex-grow justify-center mx-4'>
                  <div className='flex flex-col justify-center' >
                    <div className='inline-flex h-[40px] bg-no-repeat bg-center mb-4'
                         style={{
                           backgroundImage: 'url("' + checkSuccessIcon + '")',
                         }}>
                    </div>
                  </div>
                  <div className='flex flex-col text-center justify-center font-bold text-[24px]'>
                    <p>회원님의 아이디는</p>
                    <p>{findId} 입니다.</p>
                  </div>
                </div>

                <div className='flex flex-col mt-auto mb-12 space-y-6' >
                  <Button label={'로그인'} onClick={() => {setExistId(!existId)}}></Button>
                  <button className='bg-white text-primary border-primary border h-[52px] rounded-md
                  transition duration-300 ease-in-out hover:bg-primary-transition
                  text-[18px] font-apple'>비밀번호 찾기</button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col h-[calc(100vh-72px)] mx-4'>
                <div className='flex flex-col flex-grow justify-center mx-4'>
                  <div className='flex flex-col justify-center' >
                    <div className='inline-flex h-[40px] bg-no-repeat bg-center mb-4'
                       style={{
                         backgroundImage: 'url("' + checkFailIcon + '")',
                       }}>
                    </div>
                  </div>
                  <div className='flex flex-col text-center justify-center font-bold text-[24px]'>
                    <p>죄송합니다.</p>
                    <p>등록된 회원정보가 없습니다.</p>
                  </div>
                </div>

                <div className='flex flex-col mt-auto mb-12 space-y-6' >
                  <Button label={'회원가입'} onClick={() => {setExistId(!existId)}}>처음으로 돌아가기</Button>
                  <button className='bg-white text-primary border-primary border h-[52px] rounded-md
                  transition duration-300 ease-in-out hover:bg-primary-transition
                  text-[18px] font-apple'>처음으로 돌아가기</button>
                </div>
              </div>

            )
          }
        </div>
  );
}

export default FindIdResult;