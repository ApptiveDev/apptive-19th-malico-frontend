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
  getProgressFromHash: (hash: string) => {
    const progress: {[key: string]: number} = {
      '#register-selection': 1,
      '#user-agreement': 2,
      '#authorization': 3,
      '#input-information': 4,

      '#tos': 5,
      '#privacy-policy': 6,

      '#complete': 7,
    };
    return progress[hash] ?? 1;
  },
};
export default registerConstants;
