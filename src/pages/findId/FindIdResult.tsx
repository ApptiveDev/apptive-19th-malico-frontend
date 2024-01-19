import checkFailIcon from '@assets/icons/check_fail.svg';
import checkSuccessIcon from '@assets/icons/check_success.svg';

const FindIdResult = ({idExists, userId}: {idExists: boolean, userId: string}) => {
  return (idExists ?
    (<div className='flex flex-col grow mx-4 justify-center'>
      <div
        className='inline-flex h-[40px] bg-no-repeat bg-center mb-4'
        style={{
          backgroundImage: 'url("' + checkSuccessIcon + '")',
        }}>
      </div>
      <div className='flex flex-col text-center
               justify-center font-bold text-[24px]'>
        <p>회원님의 아이디는</p>
        <p>{userId} 입니다.</p>
      </div>
    </div>
    ) : (
      <div className='flex flex-col grow mx-4 justify-center'>
        <div className='flex flex-col justify-center'>
          <div
            className='inline-flex h-[40px] bg-no-repeat bg-center mb-4'
            style={{
              backgroundImage: 'url("' + checkFailIcon + '")',
            }}>
          </div>
        </div>
        <div className='flex flex-col text-center
                justify-center font-bold text-[24px]'>
          <p>죄송합니다.</p>
          <p>등록된 회원정보가 없습니다.</p>
        </div>
      </div>));
};

export default FindIdResult;
