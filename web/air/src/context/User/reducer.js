export const reducer = (state, action) => {
  switch (action.type) {
    // 处理用户登录操作
    case 'login':
      return {
        ...state,
        user: action.payload
      };
    // 处理用户注销操作
    case 'logout':
      return {
        ...state,
        user: undefined
      };

    default:
      return state;
  }
};

export const initialState = {
  user: undefined
};