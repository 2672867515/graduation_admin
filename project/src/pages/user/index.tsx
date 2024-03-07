import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button,  Form, Input, message, Table, Tag,  Popconfirm, Row, Col } from 'antd';
import nodata from '../../img/nodata.jpg'
import { SearchOutlined } from '@ant-design/icons';

import { deletenUsed, deleteuser, getall, getbyusername } from '../../api/api.ts';

const User=(props)=> {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [dataSource,setDataSource]=useState([])
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '头像',
      dataIndex: 'head',
      key: 'head',
      className: 'column', 
      render: (t,r) => (
        <img style={{width:'80px'}} src={t||nodata} alt="" />
        ),
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        className: 'column', 
    },
    {
      title: '联系方式',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      className: 'column', 
    },
 
    {
      title: '管理员',
      dataIndex: 'isadmin',
      key: 'isadmin',
      className: 'column', 
      render: (t,r) => (
        t==='1'?<Tag color="cyan">是</Tag>:<Tag color="red">否</Tag>
        ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (t,r) => (
        <div className="operation">
        <Popconfirm
          title="确认删除？"
          onConfirm={()=>Popconfirmconfirm(r)}
          okText="确认"
          cancelText="取消"
        >
          {r.isadmin==='0'&&<a>删除</a>}
        </Popconfirm>
        </div>
        ),
    },
    
  ];

  useEffect(()=>{
    getall('user/getall').then((res)=>{
      console.log(res);
      setDataSource(res.data.result)
    })
  },[])


  const onFinish = (values: any) => {
    console.log('Success:', values);
    let data={username:values.username}

    if(values.username===''){
      data.username=null
    }
    getbyusername('user/getbyusername',data).then(res=>{
        console.log(res);
        setDataSource(res.data)
    })
    
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };

  
  
  const Popconfirmconfirm=(r)=>{
    console.log(r);
    deleteuser('user/deleteuser',{id:r.id}).then(res=>{
      message.success('删除成功');
      getall('user/getall').then((res)=>{
        setDataSource(res.data.result)
      })
    })
    
  }


 

  return (
    <div className='used'>
      {contextHolder}
      <div className='searchpart'>
        <Form
              form={form}
              name="message"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
            <Row gutter={20}>
              <Col offset={6} span={8}>
                <Form.Item
                  label="用户名"
                  name="username"
                >
                  <Input allowClear placeholder="请输入用户名" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button icon={<SearchOutlined />} htmlType="submit" />
              </Col>
            </Row>
        </Form>
    </div>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />
    </div>
  )
}
export default User
