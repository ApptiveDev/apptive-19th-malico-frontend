import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import StickyFooter from '@components/footer/StickyFooter.tsx';
import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import {ChangeEvent, useState} from 'react';
import {limitInputNumber} from '@/utils';
import Input from '@components/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import FindIdResult from '@pages/findId/FindIdResult.tsx';
import SmallButton from '@components/button/SmallButton.tsx';
import PageCaption from '@components/text/PageCaption.tsx';

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
              <div className='flex flex-col h-[calc(100vh-72px)]'>
                <PageCaption lines={['아이디를 찾기 위해', '본인 인증을 진행해 주세요.']}/>
                <div className='flex flex-col px-6'>
                  <div className='mb-8 mt-[8px]'>
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
                      <div className='flex grow items-center'>
                        <Input
                          placeholder='이메일 입력'
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const inputEmail = e.target.value;
                            setEmail(inputEmail);
                            limitInputNumber(e, 10);
                          }}></Input>
                      </div>
                      <div className='flex h-full items-center'>
                        {isConfirmed ?
                          (<SmallButton label={'인증 완료'}
                            disabled={true}/>) :
                          (<SmallButton label={isSended ? '재전송' : '인증번호 전송'}
                            onClick={() => setIsSended(true)}/>)}
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
                          <SmallButton label={'인증번호 확인'}
                            onClick={() => setIsConfirmed(true)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex flex-col mt-auto mb-12 px-6 ' >
                  <Button label="확인" onClick={() => setIsSuccessed(true)}
                    disabled={! isConfirmed}
                  />
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
