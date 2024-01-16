import {UserInfo} from '@/models/UserInfo.ts';

const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const AUTH_ERROR = 'auth/AUTH_ERROR';
const AUTH_LOADING = 'auth/AUTH_LOADING';
const AUTH_LOGOUT = 'auth/AUTH_LOGOUT';

export const ACCESS_TOKEN_ITEM_KEY = 'access_token';

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  myInfo: UserInfo;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  errorMessage: string;
}

interface AuthLoadingAction {
  type: typeof AUTH_LOADING;
}

interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

type AuthActionType =
  | AuthSuccessAction
  | AuthErrorAction
  | AuthLoadingAction
  | AuthLogoutAction;

interface AuthState {
  isLoading: boolean;
  authenticated: boolean;
  errorMessage: string | null;
  myInfo: UserInfo | null; // 유저 정보를 나타내는 인터페이스 필요
}

const initialState: AuthState = {
  isLoading: false,
  authenticated: localStorage.getItem(ACCESS_TOKEN_ITEM_KEY) !== null,
  errorMessage: null,
  myInfo: null,
};

export const authLoading = (): AuthLoadingAction => {
  return {
    type: AUTH_LOADING,
  };
};

export const authSuccess = (myInfo: UserInfo): AuthSuccessAction => {
  return {
    type: AUTH_SUCCESS,
    myInfo: myInfo,
  };
};

export const authError = (errorMessage: string): AuthErrorAction => {
  return {
    type: AUTH_ERROR,
    errorMessage: errorMessage,
  };
};

export const authLogout = (): AuthLogoutAction => {
  return {
    type: AUTH_LOGOUT,
  };
};

const authReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {...state, isLoading: true, errorMessage: null};
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        myInfo: action.myInfo,
        errorMessage: null,
      };
    case AUTH_ERROR:
      return {...state, errorMessage: action.errorMessage, isLoading: false};
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        myInfo: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};
export default authReducer;
