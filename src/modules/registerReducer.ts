const REGISTER_SET_INFO = 'register/SET_INFO';
const REGISTER_CLEAR_INFO = 'register/CLEAR_INFO';

interface SetInfoAction {
  type: typeof REGISTER_SET_INFO;
  payload: RegisterState;
}

interface ClearInfoAction {
  type: typeof REGISTER_CLEAR_INFO;
}

type RegisterState = {
  register_type?: number;
  tos_agreed?: boolean;
  name?: string;
  email?: string;
  authorized?: boolean;
  nickname?: string;
  loginid?: string;
  password?: string;
  passwordConfirm?: string;
  gender?: number;
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
