import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Input from '@components/input/Input.tsx';
import Button from '@components/button/Button.tsx';
import {limitInputNumber} from '@/utils';
import {setRegisterInfo} from '@modules/registerReducer.ts';
import {RootState} from '@/modules';

const Authorization = () => {
  const registerState = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const [emailErrorMessage, setEmailErrorMessage] =
    useState<string | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nameErrorMessage, setNameErrorMessage] =
    useState<string | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sendDisabled, setSendDisabled] =
    useState(true);
  const [authnumErrorMessage/* setAuthnumErrorMessage*/] =
    useState<string | undefined>(undefined);

  const [emailSent, setEmailSent] =
    useState(registerState.authorized);

  return (<>
    <div className='py-6'>
      <p className='text-[24px] font-semibold'>서비스 이용을 위해</p>
      <p className='text-[24px] font-semibold'>본인 인증을 진행해 주세요.</p>
    </div>
    <p className='text-[18px] font-semibold mb-2'>이름</p>
    <Input placeholder='이름 입력' id='register-auth-name' onChange={(e) => {
      limitInputNumber(e, 8);
    }} defaultValue={registerState.name ?? registerState.name}
    errorMessage={nameErrorMessage}/>

    <p className='text-[18px] font-semibold mt-[16px] mb-2'>이메일</p>
    <div className='flex h-[40px] gap-2'>
      <div className='flex grow h-[40px]'>
        <Input placeholder='이메일 입력'
          type={'email'}
          pattern='[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,4}'
          onChange={(e) => {
            limitInputNumber(e, 85);
            if (!e.target.validity.valid) {
              setEmailErrorMessage('이메일을 다시 확인해주세요.');
              setSendDisabled(true);
            } else {
              setEmailErrorMessage(undefined);
              setSendDisabled(false);
            }
          }}
          errorMessage={emailErrorMessage}
          id='register-auth-email'
          disabled={emailSent}
          defaultValue={registerState.email ?? registerState.email}
        />
      </div>
      <Button label='인증번호 전송' style={{
        height: '40px',
        fontSize: '16px',
        flexShrink: 0,
      }} disabled={sendDisabled}
      onClick={() => {
        if (!sendDisabled) {
          const target: HTMLInputElement =
              (document.getElementById(
                'register-auth-email') as HTMLInputElement);
          const emailValue = target.value;
          const nameInput =
            (document.getElementById('register-auth-name') as HTMLInputElement);
          const name = nameInput.value;
          if (name === '') {
            setNameErrorMessage('올바른 입력을 입력해주세요.');
            return;
          }

          dispatch(setRegisterInfo({name, email: emailValue}));

          setSendDisabled(true);
          setEmailSent(true);
        }
      }} />
    </div>
    {emailSent ? <>
      <p className='text-blue-500 text-[14px] mt-[8px] ml-[4px]'>
        인증번호가 전송되었습니다.</p>
      <div className='flex h-[40px] mt-[16px] gap-2'>
        <div className='flex grow h-[40px]'>
          <Input placeholder='인증번호 입력'
            onChange={(e) => {
              limitInputNumber(e, 6);
            }}
            errorMessage={authnumErrorMessage}
            id='register-auth-number'
          />
        </div>
        <Button label='인증번호 확인' style={{
          height: '40px',
          fontSize: '16px',
          flexShrink: 0,
        }} disabled={registerState.authorized}
        onClick={() => {
          alert('인증이 완료되었습니다.');
          dispatch(setRegisterInfo({authorized: true}));
        }} />
      </div>
    </> : null}
  </>);
};

export default Authorization;
