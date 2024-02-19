import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Form, Input, message, Modal, Table, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
const Rent=(props)=> {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dataSource = [
    {
      id: '胡彦斌',
      name: 32,
      address: '西湖区湖底公园1号',
    },
    {
      id: '胡彦祖',
      name: 42,
      address: '西湖区湖底1wwwwwwwwwwwwwwwwwwwwwwwwwwww公园1号',
    },
  ];
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '楼房名称',
      dataIndex: 'name',
      key: 'name',
      className: 'column', 
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      className: 'column', 
    },
 
    {
      title: '户型',
      dataIndex: 'housetype',
      key: 'housetype',
      className: 'column', 
    },
    {
      title: '建面',
      dataIndex: 'size',
      key: 'size',
      className: 'column', 
    },
    {
      title: '总价/万',
      dataIndex: 'price',
      key: 'price',
      className: 'column', 
    },
    {
      title: '单价/万',
      dataIndex: 'per',
      key: 'per',
      className: 'column', 
    },
    {
      title: '开盘时间',
      dataIndex: 'kp',
      key: 'kp',
      className: 'column', 
    },
    {
      title: '交房时间',
      dataIndex: 'jf',
      key: 'jf',
      className: 'column', 
    },
    {
      title: '特色',
      dataIndex: 'feature',
      key: 'feature',
      className: 'column', 
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      className: 'column', 
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (t,r) => (
        <div className="operation">
        <a onClick={()=>dodelete(r)} style={{marginRight:'10px'}}>编辑</a>
        <a onClick={()=>dodelete(r)}>删除</a>
        </div>
        ),
    },
    
  ];
  const add=()=>{
    setIsModalOpen(true);
    form.resetFields()
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);

  };
  const dodelete=(r)=>{
    console.log(r);
    
  }
  const handleCallback = (data) => {

  };
  return (
    <div className='newhome'>
      <Searchpart type='newhome'  callback={handleCallback}/>
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} onClick={add} >添加</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />;
    
      <Modal 
        title="添加楼房" 
        confirmLoading={loading} 
        open={isModalOpen} 
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
            提交
          </Button>
        ]}
        >
        <Form
          form={form}
          name="basic"
          labelCol={{span:4}}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          
          <Form.Item
            label="原密码"
            name="password"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
             <Input  placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password2"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
             <Input  placeholder="请输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
      </div>
  )
}
export default Rent
