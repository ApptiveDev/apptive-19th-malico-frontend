import {useState} from 'react';
import Input from '@components/input/Input.tsx';
import {limitInputNumber} from '@/utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/modules';

const InformationInput = () => {
  const registerState = useSelector((state: RootState) => state.register);
  const [nicknameErrorMsg, setNicknameErrorMsg] =
    useState<string | undefined>();
  const [loginidErrorMsg, setLoginidErrorMsg] =
    useState<string | undefined>();
  const [passwordErrorMsg, setPasswordErrorMsg] =
    useState<string | undefined>();
  const [passConfirmErrorMsg, setPassConfirmErrorMsg] =
    useState<string | undefined>();
  return <>
    <div className='py-6'>
      <p className='text-[24px] font-semibold'>마리코에서 사용할</p>
      <p className='text-[24px] font-semibold'>계정 정보를 입력해 주세요.</p>
    </div>
    <p className='text-[18px] font-semibold mb-2'>닉네임</p>
    <Input placeholder='한글, 영문, 숫자 중 자유롭게 2~10자 이내' id='register-auth-name'
      onChange={(e) => {
        limitInputNumber(e, 10);
        if (!e.currentTarget.validity.valid) {
          setNicknameErrorMsg('한글, 영문, 숫자 포함 2~10자 이내로 입력해 주세요.');
        } else {
          setNicknameErrorMsg(undefined);
        }
      }} defaultValue={registerState.nickname ?? registerState.nickname}
      errorMessage={nicknameErrorMsg}
      pattern={'[가-힣a-zA-Z0-9]{2,10}'} />
    <p className='text-[18px] font-semibold mb-2 mt-[16px]'>아이디</p>
    <Input placeholder='영문 소문자, 숫자 포함 6~20자 이내' id='register-auth-name'
      onChange={(e) => {
        limitInputNumber(e, 20);
        if (!e.currentTarget.validity.valid) {
          setLoginidErrorMsg('영문 소문자, 숫자 포함 6~20자 이내로 입력해 주세요.');
        } else {
          setLoginidErrorMsg(undefined);
        }
      }} defaultValue={registerState.loginid ?? registerState.loginid}
      errorMessage={loginidErrorMsg}
      pattern={'[a-z0-9]{6,20}'} />

    <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호</p>
    <Input placeholder='영문, 숫자, 특수문자 포함 8~20자 이내' id='register-auth-name'
      onChange={(e) => {
        limitInputNumber(e, 20);
        if (!e.currentTarget.validity.valid) {
          setPasswordErrorMsg('영문 소문자, 숫자 포함 6~20자 이내로 입력해 주세요.');
        } else {
          setPasswordErrorMsg(undefined);
        }
      }} defaultValue={registerState.loginid ?? registerState.loginid}
      errorMessage={passwordErrorMsg}
      pattern={'[a-zA-Z0-9!@#$%^&*()_+]{8,20}'}
      type={'password'} />

    <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호확인</p>
    <Input placeholder='비밀번호를 한 번 더 입력해 주세요.' id='register-auth-name'
      onChange={(e) => {
        limitInputNumber(e, 20);
        if (!e.currentTarget.validity.valid) {
          setPassConfirmErrorMsg('영문 소문자, 숫자 포함 6~20자 이내로 입력해 주세요.');
        } else {
          setPassConfirmErrorMsg(undefined);
        }
      }} defaultValue={registerState.loginid ?? registerState.loginid}
      errorMessage={passConfirmErrorMsg}
      pattern={'[a-zA-Z0-9!@#$%^&*()_+]{8,20}'}
      type={'password'}
    />

    <p className='text-[18px] font-semibold mb-2 mt-[16px]'>성별</p>
  </>;
};
export default InformationInput;
