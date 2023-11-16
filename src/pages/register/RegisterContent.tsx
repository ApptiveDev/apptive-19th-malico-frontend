import Constants from '@/constants';
import TypeSelection from '@pages/register/steps/TypeSelection.tsx';
import UserAgreement from '@pages/register/steps/UserAgreement.tsx';

type RegisterContentProp = {
  currentProgress: number;
}
const RegisterContent = (prop: RegisterContentProp) => {
  const rc = Constants.register;
  const pageNums = rc.page_nums;
  const getContent = () => {
    switch (prop.currentProgress) {
      case pageNums.PAGE_REGISTER_SELECTION:
        return <TypeSelection></TypeSelection>;
      case pageNums.PAGE_USER_AGREEMENT:
        return <UserAgreement></UserAgreement>;
    }
  };

  return getContent();
};
export default RegisterContent;
