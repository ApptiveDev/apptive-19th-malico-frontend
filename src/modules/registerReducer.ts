import Constants from '@/constants';

const REGISTER_SET_INFO = 'register/SET_INFO';
const REGISTER_CLEAR_INFO = 'register/CLEAR_INFO';

interface SetInfoAction {
  type: typeof REGISTER_SET_INFO;
  payload: RegisterState;
}

interface ClearInfoAction {
  type: typeof REGISTER_CLEAR_INFO;
}

export type RegisterState = {
  register_type?: number;
  tos_agreed?: boolean;
  name?: string;
  email?: string;
  authorized?: boolean;
  nickname?: string;
  loginid?: string;
  password?: string;
  passwordConfirm?: string;
  gender?: string;
};

const registerFields: (keyof RegisterState)[] = [
  'register_type',
  'tos_agreed',
  'name',
  'email',
  'authorized',
  'nickname',
  'loginid',
  'password',
  'gender',
];

const pageNums = Constants.register.page_nums;

export const getRequiredInfo = (progress: number): (keyof RegisterState)[] => {
  switch (progress) {
    case pageNums.PAGE_REGISTER_SELECTION:
      return registerFields.slice(0, 1);
    case pageNums.PAGE_USER_AGREEMENT:
      return registerFields.slice(0, 2);
    case pageNums.PAGE_AUTHORIZATION:
      return registerFields.slice(0, 5);
    case pageNums.PAGE_INPUT_INFORMATION:
      return registerFields;
  }
  return [];
};

// 모두 undefined
const initialState: RegisterState = {};

export const setRegisterInfo = (info: RegisterState): SetInfoAction => ({
  type: REGISTER_SET_INFO,
  payload: info,
});

export const clearRegisterInfo = (): ClearInfoAction => ({
  type: REGISTER_CLEAR_INFO,
});

// Reducer
const registerReducer = (
  state = initialState,
  action: SetInfoAction | ClearInfoAction,
): RegisterState => {
  switch (action.type) {
    case REGISTER_SET_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER_CLEAR_INFO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default registerReducer;
