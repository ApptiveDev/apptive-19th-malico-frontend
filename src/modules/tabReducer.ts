import Constants from '@/constants';
import {AnyAction} from 'redux';

const TAB_SWITCH = 'tab/TAB_SWITCH';

interface TabSwitchAction {
  type: typeof TAB_SWITCH;
  current_tab: number;
}

//AnyAction이 있는 이유: 현재 액션이 TabSwitchAction 밖에 없습니다.
// 하나의 액션만을 받아들이는 리듀서의 경우 내부 타입체커에서 오류가 나기 때문에,
// 추후에 탭 관련 Action을 추가할 것을 감안하여 AnyAction을 임시로 타입에 추가했습니다.
type TabActionType = | TabSwitchAction | AnyAction;

interface TabState {
  current_tab: number;
}

const initialState: TabState = {
  current_tab: Constants.tabs.TAB_ID_HOME,
};

export const tabSwitch = (tab_id: number): TabSwitchAction => {
  return {
    type: TAB_SWITCH,
    current_tab: tab_id,
  };
};

const tabReducer = (
  state = initialState, action: TabActionType) => {
  switch (action.type) {
    case TAB_SWITCH:
      return {...state, current_tab: action.current_tab};
    default:
      return state;
  }
};
export default tabReducer;
