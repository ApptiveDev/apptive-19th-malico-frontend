import customer from '@assets/icons/customer.svg';
import stylist from '@assets/icons/stylist.svg';
const TypeSelection = () => {
  return (
    <>
      <div className='p-6'>
        <p className='text-[24px] font-semibold'>마리코에서 사용할 계정의</p>
        <p className='text-[24px] font-semibold'>유형을 선택해주세요.</p>
      </div>
      <div className='mt-[40px] h-[256px] w-full flex flex-col justify-between
       items-center border-box'>
        <div className='w-[340px] h-[120px] flex
        border rounded-[8px] border-middle_grey items-center px-6'>
          <svg className='w-[72px] h-[72px]' style={{
            backgroundImage: 'url(' + customer + ')',
          }}></svg>
          <div className='w-[200px] h-[66px] ml-[13px] flex flex-col'>
            <p className='font-semibold text-[18px] tracking-[-0.4px]'>일반 고객으로 가입하기</p>
            <div className='w-[180px] h-[30px] bg-light_grey mt-3
              rounded-[8px] flex justify-center items-center'>
              <p className='text-dark_grey text-[14px]'>스타일링을 받고 싶어요!</p>
            </div>
          </div>
        </div>
        <div className='w-[340px] h-[120px] flex
        border rounded-[8px] border-middle_grey items-center px-6'>
          <svg className='w-[72px] h-[72px]' style={{
            backgroundImage: 'url(' + stylist + ')',
          }}></svg>
          <div className='w-[200px] h-[66px] ml-[13px] flex flex-col'>
            <p className='font-semibold text-[18px] tracking-[-0.4px]'>스타일리스트로 가입하기</p>
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
