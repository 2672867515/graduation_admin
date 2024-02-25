import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { message, Modal, Switch, Table, Tag, Upload ,Tabs, Select, Popconfirm, Form, Row, Col, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import {
    SearchOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import {  addRent,  deleteQa,  deletenRent, deletenRentimg, getall, getallhouseqa, searchQa } from '../../api/api.ts';


const Question=(props)=> {

  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource,setDataSource]=useState([])
  const location = useLocation();
  const { pathname } = location;
  let type = pathname.replace(/\//g, '')+'vr';
  const { Option } = Select;
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '房屋id',
      dataIndex: 'houseid',
      key: 'houseid',
      className: 'column', 
    },
    {
        title: '房源类型',
        dataIndex: 'housetype',
        key: 'housetype',
        className: 'column', 
        render: (t,r) => (

            t==='Newhome'?
            <Tag  color="blue">新房</Tag>:
            t==='Used'?
            <Tag  color="orange">二手房</Tag>:
            t==='Rent'?
            <Tag  color="purple">租房</Tag>:
            <Tag  color="green">全部</Tag>
           ),
    },
    {
      title: '问题内容',
      dataIndex: 'content',
      key: 'content',
      className: 'column', 
    },
    {
        title: '提问人id',
        dataIndex: 'userid',
        key: 'userid',
        className: 'column2', 
    },
    {
      title: '提问时间',
      dataIndex: 'time',
      key: 'time',
      className: 'column', 
    },
    {
      title: '问题类型',
      dataIndex: 'type',
      key: 'type',
      className: 'column', 
    },
    {
      title: '部分回答',
      dataIndex: 'answe',
      key: 'answe',
      className: 'column', 
      render: (t,r) => (
        r.answer.length>0? r.answer.slice(0,5).map(item=><div className='tag' >{item.content}</div>):<Tag color='red' >暂无回答</Tag>
       ),
    },
    {
      title: '总回答数',
      dataIndex: 'answers',
      key: 'answers',
      className: 'column', 
      render: (t,r) => (
        <Tag  color="green">{r.answer.length}</Tag>
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
          <a >删除</a>
        </Popconfirm>
        </div>
        ),
    },
    
  ];


  useEffect(()=>{
    getallhouseqa('question/getallhouseqa').then(res=>{
        setDataSource(res.data.data.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        }))
      })
  },[])

  const [form] = Form.useForm();
  const [messages,setMessages]=useState({})
  console.log(type);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    let data={content:values.content,type:values.type}
    if(values.content===''){
        
      data.content=null
    }
    if(values.type===''){
        
      data.content=null
    }
    searchQa('question/searchQa',data).then(res=>{
      setDataSource(res.data.data.sort((a, b) =>{
        const dateA = new Date(a.time+ 'T00:00:00');
        const dateB = new Date(b.time+ 'T00:00:00');
        return dateB - dateA; // 从近到远排序
      }))
    })
   
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };

  const Popconfirmconfirm=(r)=>{
    console.log(r);
    console.log(type);
    deleteQa('question/deleteQa',{id:r.id}).then(res=>{
      console.log(res);
      
      message.success('删除成功');
      getallhouseqa('question/getallhouseqa').then(res=>{
        setDataSource(res.data.data.sort((a, b) =>{
          const dateA = new Date(a.time+ 'T00:00:00');
          const dateB = new Date(b.time+ 'T00:00:00');
          return dateB - dateA; // 从近到远排序
        }))
      })
    })
    
  }


  return (
    <div className='rent'>
      {contextHolder}
        <div className="searchpart">
            <Form
                    form={form}
                    name="message"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    
                    >
                    <Row gutter={20}>
                    
                    <Col span={8} offset={3} >
                        <Form.Item
                        label="内容"
                        name="content"
                        >
                        <Input  placeholder="请输入问题内容" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        label="问题类型"
                        name="type"
                        >
                        <Select allowClear   placeholder="选择问题类型">
                            <Option value="房价行情">房价行情</Option>
                            <Option value="购房建议">购房建议</Option>
                            <Option value="买房风险">买房风险</Option>
                            <Option value="新房">新房</Option>
                            <Option value="二手房">二手房</Option>
                            <Option value="房屋估价">房屋估价</Option>
                            <Option value="卖房流程">卖房流程</Option>
                            <Option value="出售方案">出售方案</Option>
                            <Option value="卖房风险">卖房风险</Option>
                            <Option value="租房准备">租房准备</Option>
                            <Option value="租房注意事项">租房注意事项</Option>
                            <Option value="合租">合租</Option>
                            <Option value="整租">整租</Option>
                            <Option value="装修">装修</Option>
                            <Option value="拆迁">拆迁</Option>
                            <Option value="房产政策">房产政策</Option>
                            <Option value="法律纠纷">法律纠纷</Option>
                            <Option value="其他">其他</Option>
                            </Select>
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
export default Question
