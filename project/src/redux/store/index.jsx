
import { applyMiddleware, createStore } from 'redux';
// 引入中间件，支持异步action(返回值不为对象，为函数)
import thunk from 'redux-thunk';
import reducer from '../reducer';

// 构建store
export default createStore(reducer);
