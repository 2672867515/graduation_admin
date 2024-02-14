import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, DatePicker, Form, Input, message, Modal, Switch, Table, Upload } from 'antd';
import type { DatePickerProps } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
const Newhome=(props)=> {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [detail,setDetail]=useState(false)
  const [dataSource,setDataSource]=useState([
    {
      id: '胡彦斌',
      name: 32,
      address: '西湖区湖底公园1号',
      kp:'2024-01-01',
      jf:'2024-01-03',
      ishot:true
    },
    {
      id: '胡彦祖',
      name: 42,
      address: '西湖区湖底1wwwwwwwwwwwwwwwwww公园1号',
      kp:'2024-01-01',
      jf:'2024-01-05',
      ishot:false
    },
  ])
  const [dataSource2,setDataSource2]=useState([
    {
      id: '胡彦斌',
      name: 32,
      address: '西湖区湖底公园1号',
    },
    {
      id: '胡彦祖',
      name: 42,
      address: '西湖区湖底1wwwwwwwwwwwwwwwwwwwww公园1号',
    },
  ])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '楼盘名称',
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
      title: '可选户型',
      dataIndex: 'housetype',
      key: 'housetype',
      className: 'column', 
    },
    {
      title: '尺寸范围',
      dataIndex: 'size',
      key: 'size',
      className: 'column', 
    },
    {
      title: '均价/万',
      dataIndex: 'averageprice',
      key: 'averageprice',
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
      title: '热门',
      dataIndex: 'ishot',
      key: 'ishot',
      className: 'column', 
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (t,r) => (
        <div className="operation">
        <a onClick={()=>doedit(r)} style={{marginRight:'10px'}}>编辑</a>
        <a onClick={()=>todetail(r)} style={{marginRight:'10px'}}>详情</a>
        <a onClick={()=>dodelete(r)}>删除</a>
        </div>
        ),
    },
    
  ];
  const columns2 = [
    {
      title: '户型图',
      dataIndex: 'url',
      key: 'url',
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
      title: '位置',
      dataIndex: 'location',
      key: 'location',
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
  const initialValues = {
    ishot: false, // 设置热门开关的初始值为 false
  };
  const handleCallback = (data) => {
    setDetail(false)
    console.log(data);
    
  };
  const add=()=>{
    setIsModalOpen(true);
    form.resetFields()
  }
  const handleSwitchChange = (checked) => {
    form.setFieldsValue({ ishot: checked });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      messageApi.open({
        type: 'success',
        content: '添加成功',
      });
    }, 1000);
    console.log('Success:', values);
    const data={...values,kp:values.kp.format('YYYY-MM-DD'),jf:values.jf.format('YYYY-MM-DD')}
    console.log(data);

  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const doedit=(r)=>{
    console.log(r);
    const data={...r,kp:moment(r.kp),jf:moment(r.jf)}
    form2.resetFields()
    
    Object.keys(data).forEach(key => {
      form2.setFieldValue(key, data[key]);
    });
    setIsModalOpen2(true)

  }
  const dodelete=(r)=>{
    console.log(r);
    
  }
  const todetail=(r)=>{
    setDetail(true)
    setName(r.name)
  }
  const close=()=>{
    setDetail(false)
  }
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
    const onFinish2 = (values: any) => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      setIsModalOpen2(false);
      messageApi.open({
        type: 'success',
        content: '编辑成功',
      });
    }, 1000);
    console.log('Success:', values);
    const data={...values,kp:values.kp.format('YYYY-MM-DD'),jf:values.jf.format('YYYY-MM-DD')}
    console.log(data);

  };
  const onFinishFailed2 = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  return (
    <div className='newhome'>
      {contextHolder}
      <Searchpart type='newhome'  callback={handleCallback}/>
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} onClick={add} >添加楼盘</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />
      {detail&&  <div className="name">{name}</div> }
      {detail&&<Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'10px'}} onClick={add} >添加户型</Button>}
      {detail&&<Button danger style={{marginLeft:'20px',marginTop:'10px'}} onClick={close} >关闭</Button>}
      {detail&&<Table style={{marginTop:'10px'}} dataSource={dataSource2} columns={columns2}   pagination={false}  />}
    
      <Modal 
        title="添加楼盘" 
        confirmLoading={loading} 
        open={isModalOpen} 
        onCancel={()=>handleCancel()}
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
          initialValues={initialValues}
        >
          
          <Form.Item
            label="楼盘名称"
            name="name"
            rules={[{ required: true, message: '请输入楼盘名称' }]}
          >
             <Input  placeholder="请输入楼盘名称" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入地址' }]}
          >
             <Input  placeholder="请输入地址" />
          </Form.Item>
          <Form.Item
            label="可选户型"
            name="housetype"
            rules={[{ required: true, message: '请输入可选户型' }]}
          >
             <Input  placeholder="请输入可选户型" />
          </Form.Item>
          <Form.Item
            label="尺寸范围"
            name="size"
            rules={[{ required: true, message: '请输入尺寸范围' }]}
          >
             <Input  placeholder="请输入尺寸范围" />
          </Form.Item>
          <Form.Item
            label="均价/万"
            name="averageprice"
            rules={[{ required: true, message: '请输入均价' }]}
          >
             <Input  placeholder="请输入均价" />
          </Form.Item>
          <Form.Item
            label="开盘时间"
            name="kp"
            rules={[{ required: true, message: '请选择开盘时间' }]}
          >
            <DatePicker  placeholder="请选择开盘时间"  />
          </Form.Item>
          <Form.Item
            label="交房时间"
            name="jf"
            rules={[{ required: true, message: '请选择交房时间' }]}
          >
             <DatePicker placeholder="请选择交房时间"  />
          </Form.Item>
          <Form.Item
            label="特色"
            name="feature"
            rules={[{ required: true, message: '请输入特色' }]}
          >
             <Input  placeholder="请输入特色,用 , 隔开" />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="phone"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
             <Input  placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            label="热门"
            name="ishot"
          >
              <Switch checkedChildren="热门" unCheckedChildren="普通" onChange={handleSwitchChange} defaultChecked={false} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal 
        title="编辑" 
        confirmLoading={loading2} 
        open={isModalOpen2} 
        onCancel={()=>handleCancel2()}
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel2()}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading2} onClick={() => form2.submit()}>
            提交
          </Button>
        ]}
        >
        <Form
          form={form2}
          name="basic"
          labelCol={{span:4}}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish2}
          onFinishFailed={onFinishFailed2}
        >
          
          <Form.Item
            label="楼盘名称"
            name="name"
            rules={[{ required: true, message: '请输入楼盘名称' }]}
          >
             <Input  placeholder="请输入楼盘名称" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入地址' }]}
          >
             <Input  placeholder="请输入地址" />
          </Form.Item>
          <Form.Item
            label="可选户型"
            name="housetype"
            rules={[{ required: true, message: '请输入可选户型' }]}
          >
             <Input  placeholder="请输入可选户型" />
          </Form.Item>
          <Form.Item
            label="尺寸范围"
            name="size"
            rules={[{ required: true, message: '请输入尺寸范围' }]}
          >
             <Input  placeholder="请输入尺寸范围" />
          </Form.Item>
          <Form.Item
            label="均价/万"
            name="averageprice"
            rules={[{ required: true, message: '请输入均价' }]}
          >
             <Input  placeholder="请输入均价" />
          </Form.Item>
          <Form.Item
            label="开盘时间"
            name="kp"
            rules={[{ required: true, message: '请选择开盘时间' }]}
          >
            <DatePicker disabled placeholder="请选择开盘时间"  />
          </Form.Item>
          <Form.Item
            label="交房时间"
            name="jf"
            rules={[{ required: true, message: '请选择交房时间' }]}
          >
             <DatePicker disabled placeholder="请选择交房时间"  />
          </Form.Item>
          <Form.Item
            label="特色"
            name="feature"
            rules={[{ required: true, message: '请输入特色' }]}
          >
             <Input  placeholder="请输入特色,用 , 隔开" />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="phone"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
             <Input  placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            label="热门"
            name="ishot"
          >
              <Switch checkedChildren="热门" unCheckedChildren="普通" onChange={handleSwitchChange} defaultChecked={false} />
          </Form.Item>
        </Form>
      </Modal>
      </div>
  )
}
export default Newhome
