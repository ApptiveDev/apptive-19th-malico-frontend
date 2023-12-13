import {ChangeEvent, useState} from 'react';
import Input from '@components/input/Input.tsx';
import {limitInputNumber} from '@/utils';
// import {useSelector} from 'react-redux';
// import {RootState} from '@/modules';

const InformationInput = () => {
  // const registerState = useSelector((state: RootState) => state.register);

  const [errorMessages, setErrorMessages] = useState({
    nickname: undefined,
    loginid: undefined,
    password: undefined,
    passConfirm: undefined,
  });
  const [gender, setGender] = useState<string>('');
  // const [inputInfos, setInputInfos] = useState({
  //   nickname: undefined,
  //   loginid: undefined,
  //   password: undefined,
  //   passConfirm: undefined,
  //   gender: undefined,
  // });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: string,
    maxLength: number, errorMsg: string) => {
    const target = e.target;
    limitInputNumber(e, maxLength);
    if (! target.validity.valid) {
      setErrorMessages((prev) => ({
        ...prev,
        [type]: errorMsg,
      }));
    }
  };

  return (
    <>
      <div className='p-6'>
        <p className='text-[24px] font-semibold'>마리코에서 사용할</p>
        <p className='text-[24px] font-semibold'>계정 정보를 입력해주세요.</p>
      </div>
      <div className='px-6'>
        <p className='text-[18px] font-semibold mb-2'>닉네임</p>
        <Input
          errorMessage={errorMessages.nickname}
          placeholder='한글, 영문, 숫자 중 자유롭게 2~10자 이내'
          id='register-auth-nickname'
          onChange={(e) => handleInputChange(e, 'nickname',
            10, '한글, 영문, 숫자 포함 2~10자 이내로 입력해주세요.')}
          pattern={'[가-힣a-zA-Z0-9]{2,10}'}
        />
        <p className='text-[18px] font-semibold mb-2 mt-[16px]'>아이디</p>
        <Input
          errorMessage={errorMessages.loginid}
          placeholder='영문 소문자, 숫자 포함 6~20자 이내'
          id='register-auth-userid'
          onChange={(e) => handleInputChange(e, 'loginid',
            20, '영문 소문자, 숫자 포함 6~20자 이내로 입력해주세요.')}
          pattern={'[a-z0-9]{6,20}'}
        />
        <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호</p>
        <Input
          errorMessage={errorMessages.password}
          placeholder='영문, 숫자, 특수문자 포함 8~20자 이내'
          id='register-auth-password'
          type='password'
          onChange={(e) => handleInputChange(e, 'password',
            20, '영문, 숫자, 특수문자 포함 8~20자 이내로 입력해주세요.')}
          pattern={'^[A-Za-z\\d@$!%*?&]{8,20}$'}
        />
        <p className='text-[18px] font-semibold mb-2 mt-[16px]'>비밀번호확인</p>
        <Input
          errorMessage={errorMessages.passConfirm}
          placeholder='비밀번호를 한 번 더 입력해주세요.'
          id='register-auth-password_confirm'
          type='password'
          onChange={(e) => handleInputChange(e, 'passConfirm',
            20, '비밀번호가 동일하지 않습니다.')}
        />
        <p className='text-[18px] font-semibold mb-2 mt-[16px]'>성별</p>
        <div className='flex gap-2 w-full h-[40px]'>
          <div className={gender == '남' ?
            'grow flex items-center justify-center cursor-pointer text-[16px] font-bold ' +
            'text-primary border-[2px] border-primary rounded-md h-full' :
            'grow flex items-center justify-center cursor-pointer text-[16px] ' +
            'text-dark_grey border-[2px] border-middle_grey rounded-lg h-full'}
          onClick={() => setGender('남')}
          >
            <p>남성</p>
          </div>

          <div className={gender == '여' ?
            'grow flex items-center justify-center cursor-pointer text-[16px] font-bold ' +
            'text-primary border-[2px] border-primary rounded-md h-full' :
            'grow flex items-center justify-center cursor-pointer text-[16px] ' +
            'text-dark_grey border-[2px] border-middle_grey rounded-lg h-full'}
          onClick={() => setGender('여')}>
            <p>여성</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationInput;
