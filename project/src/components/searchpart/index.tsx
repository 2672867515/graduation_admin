import React, { useState } from 'react';
import './index.scss'
import { Button, Col, Form, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchNewhome, searchRent, searchUsed } from '../../api/api.ts';
interface detail{
  type:string;
  callback:(data)=>void
}
const Searchpart=React.memo((props:detail)=> {
  const {type,callback}=props
  const [form] = Form.useForm();
  const [messages,setMessages]=useState({})
  console.log(type);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    let data={id:values.id,name:values.name}
    if(values.id===''){
      data.id=null
    }
    if(values.name===''){
      data.name=null
    }
   
    if(type==='newhome'){
      searchNewhome('newhome/searchNewhome',data).then(res=>{
        console.log(res.data.data);
        callback(res.data.data)
      })
    }else if(type==='used'){
      
      searchUsed('used/searchUsed',data).then(res=>{
        console.log(res.data.data);
        callback(res.data.data)
      })
    }else{
      searchRent('rent/searchRent',data).then(res=>{
        console.log(res.data.data);
        callback(res.data.data)
      })
    }
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
            >
            <Row gutter={20}>
              
              <Col span={8} offset={3} >
                <Form.Item
                  label="楼盘id"
                  name="id"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="楼盘名称"
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