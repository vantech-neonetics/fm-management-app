// 项目导入
import config from 'config';

// 动作 - 状态管理
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], // 用于默认菜单的活动状态
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  theme: 'light'
};

// ==============================|| 自定义化减速器 ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};

export default customizationReducer;