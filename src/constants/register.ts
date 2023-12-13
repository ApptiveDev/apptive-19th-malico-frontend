const registerConstants = {
  page_nums: {
    PAGE_REGISTER_SELECTION: 1,
    PAGE_USER_AGREEMENT: 2,
    PAGE_AUTHORIZATION: 3,
    PAGE_INPUT_INFORMATION: 4,

    PAGE_TOS: 5,
    PAGE_PRIVACY_POLICY: 6,

    PAGE_REGISTRATION_COMPLETE: 7,
  },
  page_titles: [
    '',
    '가입유형 선택',
    '이용약관',
    '본인 인증',
    '계정 정보 입력',
    '이용약관 상세',
    '개인정보취급방침',
    '회원가입 완료'],
  max_pages: 4,
  page_start: 1,
  progresses: [
    null, '#register-selection',
    '#user-agreement',
    '#authorization',
    '#input-information',
    '#tos', '#privacy-policy',
    '#complete'],
  getProgressFromHash: (hash: string) => {
    const progresses = registerConstants.progresses;
    return progresses.indexOf(hash) === -1 ? 1 : progresses.indexOf(hash);
  },
  getNextProgress: (currentProgress: number) => {
    const pageNums = registerConstants.page_nums;
    if (currentProgress < pageNums.PAGE_INPUT_INFORMATION) {
      return currentProgress + 1;
    }
    return 0;
  },
  getNextUrlHash: (currentProgress: number): string => {
    return <string>registerConstants.progresses[registerConstants.getNextProgress(
      currentProgress)];
  },
  infos: {
    GENDER_MALE: '남',
    GENDER_FEMALE: '여',
    TYPE_CUSTOMER: 0,
    TYPE_STYLIST: 1,
  },
};
export default registerConstants;
