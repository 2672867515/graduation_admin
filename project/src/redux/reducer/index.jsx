import { Type } from '../constant';
// 构建reducer函数
// 设置初始值
const initState = {
  isLogin:'false',
  header:'Home'
};
export default (state = initState, action) => {
  const { type, value } = action;
  // console.log('reducer', state, action);
  switch (type) {
    case Type.ISLOGIN:
      return {...state,isLogin: value};
    case Type.HEADER:
      return  {...state,header: value};
    default:
      return initState;
  }
};
