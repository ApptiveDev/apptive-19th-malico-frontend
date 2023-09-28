const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const AUTH_ERROR = 'auth/AUTH_ERROR';
const AUTH_LOADING = 'auth/AUTH_LOADING';
const AUTH_LOGOUT = 'auth/AUTH_LOGOUT';

const ACCESS_TOKEN_ITEM_KEY = 'access_token';

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  my_info: Object;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  error_message: string;
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
  is_loading: boolean;
  authenticated: boolean;
  error_message: string | null;
  my_info: Object | null; // 유저 정보를 나타내는 인터페이스 필요
}

const initialState: AuthState = {
  is_loading: false,
  authenticated: localStorage.getItem(ACCESS_TOKEN_ITEM_KEY) !== null,
  error_message: null,
  my_info: null,
};

export const authLoading = (): AuthLoadingAction => {
  return {
    type: AUTH_LOADING,
  };
};

export const authSuccess = (my_info: Object): AuthSuccessAction => {
  return {
    type: AUTH_SUCCESS,
    my_info: my_info,
  };
};

export const authError = (error_message: string): AuthErrorAction => {
  return {
    type: AUTH_ERROR,
    error_message: error_message,
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
      return {...state, is_loading: true, error_message: null};
    case AUTH_SUCCESS:
      return {
        ...state,
        is_loading: false,
        authenticated: true,
        my_info: action.my_info,
        error_message: null,
      };
    case AUTH_ERROR:
      return {...state, error_message: action.error_message, is_loading: false};
    case AUTH_LOGOUT:
      return {
        ...state,
        is_loading: false,
        authenticated: false,
        my_info: null,
        error_message: null,
      };
    default:
      return state;
  }
};
export default authReducer;
