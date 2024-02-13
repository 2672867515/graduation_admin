import { Type } from '../constant';
/**
 * 构建action函数
 */

export const LoginState = data => ({
  type: Type.ISLOGIN,
  value: data,
});
export const HeaderState = data => ({
  type: Type.HEADER,
  value: data,
});
/**
 * 异步action
 * 返回值为函数的action需要配合中间件redux-thunk
 */
export const addAsyncAction = (data, time) => dispatch => {
  setTimeout(() => {
    // dispatch(addAction(data));
  }, time);
};
