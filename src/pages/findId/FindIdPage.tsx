import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {ChangeEvent, useState} from 'react';
import {limitInputNumber} from '@/utils';
import Input from '@components/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import FindIdResult from '@pages/findId/FindIdResult.tsx';

const FindIdPage = () => {
  const [/* name */, setName] = useState('');
  const [/* email */, setEmail] = useState('');
  const [/* authCode */, setAuthCode] = useState('');
  const [isSended, setIsSended] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSuccesed, setIsSuccessed] = useState(false);

  return (
    <PageContainer>
      <Navbar title='아이디 찾기'
        hasBackwardButton={true}>
      </Navbar>
      <ResponsiveContainer>
        <div>
          {
            isSuccesed ? (
              <FindIdResult/>
            ) : (
              <div className='flex flex-col h-[calc(100vh-72px)] mx-4'>
                <div className='flex flex-col my-12 text-left text-[24px] font-bold'>
                  <p >아이디를 찾기 위해</p>
                  <p >본인 인증을 진행해 주세요.</p>
                </div>
                <div className='flex flex-col'>
                  <div className='mb-8'>
                    <p className='text-[18px] mb-1 font-bold'>이름</p>
                    <Input placeholder='이름 입력'
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const inputName = e.target.value;
                        setName(inputName);
                        limitInputNumber(e, 10); // 이름의 최대 글자수 제한: 4글자.
                        // 사용자 정보 db 스키마가 정의되면 상수로서 정의하는 것이 좋을 것 같음
                      }}></Input>
                  </div>
                  <div className='mb-8'>
                    <p className='text-[18px] mb-1 font-bold'>이메일</p>
                    <div className='flex items-center space-x-2'>
                      <div className='flex-grow'>
                        <Input
                          placeholder='이메일 입력'
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const inputEmail = e.target.value;
                            setEmail(inputEmail);
                            limitInputNumber(e, 10);
                          }}></Input>
                      </div>
                      <div className='flex'>
                        {isConfirmed ? (<button className='bg-gray-100 text-dark_grey
                         h-[40px] w-[120px] rounded-md -mt-2 transition duration-300
                         ease-in-out hover:bg-primary-transition text-[18px] focus:outline-none
                         focus:ring focus:ring-blue-200 font-apple'>인증 완료</button>
                        ) : (
                          <button className='bg-primary text-white h-[40px] w-[120px]
                           rounded-md -mt-2 transition duration-300 ease-in-out
                           hover:bg-primary-transition text-[18px] focus:outline-none focus:ring
                           focus:ring-blue-200 font-apple' onClick={() => setIsSended(true)}>{
                              isSended ? ('재전송') : ('인증번호 전송')
                            }</button>
                        )}
                      </div>
                    </div>
                  </div>
                  {(!isConfirmed && isSended) && (
                    <div className='mb-8'>
                      <p className='text-[18px] mb-1 font-bold'>인증번호</p>
                      <div className='flex items-center space-x-2'>
                        <div className='flex-grow'>
                          <Input
                            placeholder='인증번호 입력'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const inputAuthCode = e.target.value;
                              setAuthCode(inputAuthCode);
                              limitInputNumber(e, 10);
                            }}></Input>
                        </div>
                        <div className='flex'>
                          <button className='bg-primary text-white h-[40px] w-[120px]
                          rounded-md -mt-2 transition duration-300 ease-in-out
                          hover:bg-primary-transition text-[18px] focus:outline-none focus:ring
                          focus:ring-blue-200 font-apple'
                          onClick={() => setIsConfirmed(true)}>인증번호 확인</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex flex-col mt-auto mb-12' >
                  {
                    isConfirmed ? (
                      <Button label="확인" onClick={() => setIsSuccessed(true)}></Button>
                    ) : (
                      <button className='bg-gray-100 text-dark_grey h-[52px] rounded-md
                    transition duration-300 ease-in-out hover:bg-primary-transition
                    text-[18px] font-apple'>확인</button>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </ResponsiveContainer>
      <StickyFooter>
      </StickyFooter>
    </PageContainer>
  );
};

export default FindIdPage;
