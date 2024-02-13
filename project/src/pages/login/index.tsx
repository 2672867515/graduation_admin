import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Form, Input,message } from 'antd';
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LoginState,HeaderState } from '../../redux/action';
import {tologin} from '../../api/api.ts'
const  Login=(props)=> {
  let   history = useHistory() //将useHistory()钩子赋值给history方便使用
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: any) => {
    console.log('Success:', values);

    tologin('/user/login',values).then((res)=>{
      console.log(res.data);
      if(res.data.code===0){
        message.success('登录成功');
        history.push(`/newhome`)
        localStorage.setItem('login','true')
        dispatch(LoginState('true'))
      }
      else{
        message.error(res.data.msg);
      }
         
    }).catch((error)=>{
      console.log(error);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  type FieldType = {
    username?: string;
    password?: string;
  };

 
  return (
    <div className="loginpage">
    {contextHolder}

    <div className='login-box'>
      <div className="title">基于three.js的3D选房平台 —— 管理员端</div>
      <div className="modal">
       <div className="state">登录</div>
      <Form
        name="login"
        wrapperCol={{  offset: 2, span: 20 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input  placeholder="账号" size="large"  prefix={<UserOutlined className="site-form-item-icon" />}  />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password  placeholder="密码" size="large"  prefix={<LockOutlined  className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button  size="large" type="primary" htmlType="submit" block style={{ backgroundColor: 'rgb(0, 160, 0)', borderColor: 'rgb(0, 150, 0)' }} >
            登录
          </Button>
        </Form.Item>
      </Form>

      </div>
    </div>
    </div>
  );
}
export default Login