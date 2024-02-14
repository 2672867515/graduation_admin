import React, { useState } from 'react';
import './index.scss'
import { Button, Col, Form, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
interface detail{
  type:string;
  callback:(data)=>void
}
const Searchpart=React.memo((props:detail)=> {
  const {type,callback}=props
  const [form] = Form.useForm();
  const [messages,setMessages]=useState({id:'',name:''} )
  // console.log(type);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    callback(1)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
    callback('error')
  };

  return (
    <div className='searchpart'>
        <Form
              form={form}
              name="message"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={messages}
            >
            <Row gutter={20}>
              
              <Col span={8} offset={3} >
                <Form.Item
                  label="房屋id"
                  name="id"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="楼房名称"
                  name="name"
                >
                  <Input  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button icon={<SearchOutlined />} htmlType="submit" />
              </Col>
            </Row>
        </Form>
    </div>
  );
})
export default Searchpart