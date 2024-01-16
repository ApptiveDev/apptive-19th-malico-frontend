import customer from '@assets/icons/customer.svg';
import stylist from '@assets/icons/stylist.svg';
import {useSelector} from 'react-redux';
import {RootState} from '@/modules';
import PageCaption from '@components/text/PageCaption.tsx';
const RegisterCompletion = () => {
  const registerState =
    useSelector((state: RootState) => state.register);

  const name = registerState.nickname;
  const isStylist = registerState.register_type; // 1일때 스타일리스트

  const captionImage = isStylist ? stylist : customer;

  return (
    <>
      <PageCaption lines={[name + '님,', '마리코의 회원이 되신 것을', '환영합니다.']} />
      <div className='mt-[40px] h-[256px] w-full flex flex-col items-center border-box'>
        <svg className='w-[160px] h-[160px]' style={{
          backgroundImage: 'url(' + captionImage + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}></svg>
        <p className='mt-5 text-[18px]'>맞춤형 스타일링을 제공하기 위해</p>
        <p className='text-[18px]'>프로필을 등록해 주세요!</p>
      </div>
    </>
  );
};
export default RegisterCompletion;
