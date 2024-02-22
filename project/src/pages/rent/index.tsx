import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Image ,Checkbox, Form, Input, message, Modal, Switch, Table, Tag, Upload ,Tabs, Select, Popconfirm } from 'antd';
import type { CheckboxProps, GetProp } from 'antd';
import type {  UploadProps} from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import nodata from '../../img/nodata.jpg'
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
import {  addRent,  deletenRent, deletenRentimg, getall, getrentimg, rentgetall,  updateRent, updateVrimage, usedgetall } from '../../api/api.ts';
import TabPane from 'antd/es/tabs/TabPane';
import TextArea from 'antd/es/input/TextArea';

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
const CheckboxGroup = Checkbox.Group;
const plainOptions = [ 
{ label: '电视', value: 0 },
{ label: '空调', value: 1 },
{ label: '衣柜', value: 2 },
{ label: '床', value: 3 },
{ label: '卫生间', value: 4 },
{ label: '智能门锁', value: 5 },
{ label: '阳台', value: 6 },
{ label: '暖气', value: 7 },

];
const plainOptions2 = [
{ label: '冰箱', value: 0 },
{ label: '洗衣机', value: 1 },
{ label: '热水器', value: 2 },
{ label: '宽带', value: 3 },
{ label: '沙发', value: 4 },
{ label: '油烟机', value: 5 },
{ label: '燃气灶', value: 6 },
{ label: '可做饭', value: 7 }
];

const Used=(props)=> {

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [houseid,setHouseid]=useState()
  const [images,setImages]=useState([])
  const [activeKey, setActiveKey] = useState("1");
  const [addcover, setAddcover] = useState(-1);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [dataSource,setDataSource]=useState([])
  const location = useLocation();
  const { pathname } = location;
  let type = pathname.replace(/\//g, '')+'vr';
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      className: 'column', 
      render: (t,r) => (
        <img style={{width:'80px'}} src={t||nodata} alt="" />
        ),
    },
    {
      title: '标题',
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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      className: 'column', 
    },
    {
      title: '尺寸/m²',
      dataIndex: 'size',
      key: 'size',
      className: 'column2', 
    },
    {
      title: '租金/元',
      dataIndex: 'price',
      key: 'price',
      className: 'column', 
    },
    {
      title: '朝向',
      dataIndex: 'direction',
      key: 'direction',
      className: 'column', 
    },
    {
      title: '楼层',
      dataIndex: 'floor',
      key: 'floor',
      className: 'column', 
    },
    {
      title: '特色',
      dataIndex: 'feature',
      key: 'feature',
      className: 'column', 
    },
    {
      title: '付款方式',
      dataIndex: 'paytype',
      key: 'paytype',
      className: 'column', 
      render: (t,r) => (
       <Tag color="magenta">{t}</Tag>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      className: 'column', 
    },
    {
      title: '精选',
      dataIndex: 'ishot',
      key: 'ishot',
      className: 'column', 
      render: (t,r) => (
     
          t==='true'?<Tag color="cyan">是</Tag>:<Tag color="red">否</Tag>
    
        ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (t,r) => (
        <div className="operation">
        <a onClick={()=>doedit(r)} style={{marginRight:'10px'}}>编辑</a>
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

  const file: UploadProps = {
    name: 'file',
    action: 'http://127.0.0.1:8081/upload',
    showUploadList:false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {

        let data={id:-1,houseid:houseid,url:info.file.response,area:1,direction:1,type:'Rent'}
        updateVrimage('/image/updateVrimage',data).then(res=>{
          
          message.success(`${info.file.name} 上传${res.data.msg}`);
          const data2={houseid:houseid,type:'Rent'}
          getrentimg('image/getrentimg',data2).then(res=>{
            console.log(res.data.data);
            setImages(res.data.data)
          })
        })
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  const file2: UploadProps = {
    name: 'file',
    action: 'http://127.0.0.1:8081/upload',
    showUploadList:false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        form.setFieldValue('cover',info.file.response)
        message.success(`${info.file.name} 上传成功`);
        setAddcover(info.file.response)
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  const file3: UploadProps = {
    name: 'file',
    action: 'http://127.0.0.1:8081/upload',
    showUploadList:false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        form2.setFieldValue('cover',info.file.response)
        updateRent('rent/updateRent',form2.getFieldsValue()).then(res=>{
         message.success(`${info.file.name} 上传成功`);
         getall('/rent/getall').then((res)=>{
          setDataSource(res.data.data)
        })
       
       })
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  const initialValues = {
    ishot: false, // 设置热门开关的初始值为 false
  };
  useEffect(()=>{
    rentgetall('rent/getall').then((res)=>{
      console.log(res);
      setDataSource(res.data.data)
    })
  },[])
  const handleCallback = (data) => {
    console.log(data);
    setDataSource(data)
  };
  const add=()=>{
    setIsModalOpen(true);
    form.resetFields()
    setAddcover(-1)
    form.setFieldValue('bedroomeqs',[10])
    form.setFieldValue('publiceqs',[10])
  }


  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Success:', values);
    let data={...values,bedroomeqs:values.bedroomeqs.toString(),publiceqs:values.publiceqs.toString()}
    
    setTimeout(() => {
      addRent('rent/addRent',data).then(res=>{
        setLoading(false);
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: '添加成功',
        });
        rentgetall('rent/getall').then((res)=>{
          setDataSource(res.data.data)
        })
      })
      
    }, 1000);


  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const doedit=(r)=>{
    setActiveKey("1")
    console.log(r);
    const data={...r,ishot:r.ishot==='true'?true:false,bedroomeqs: r.bedroomeqs===''?[10]:r.bedroomeqs.match(/\d+/g).map(Number),publiceqs: r.publiceqs===''?[10]:r.publiceqs.match(/\d+/g).map(Number)}
    Object.keys(data).forEach(key => {
      form2.setFieldValue(key, data[key]);
    });

    setIsModalOpen2(true)
    setHouseid(r.id)
    const data2={houseid:r.id,type:'Rent'}
    getrentimg('image/getrentimg',data2).then(res=>{
      console.log(res.data.data);
      setImages(res.data.data)
    })
 
  }

  
  const tabshandleChange = (key) => {
    setActiveKey(key);
  }
  
  const Popconfirmconfirm=(r)=>{
    console.log(r);
    console.log(type);
    deletenRent('rent/deletenRent',{id:r.id}).then(res=>{
      message.success('删除成功');
      rentgetall('rent/getall').then((res)=>{
        setDataSource(res.data.data)
      })
    })
    
  }
  const Popconfirmconfirm2=(r)=>{
    console.log(r);
    deletenRentimg('image/deletenRentimg',{id:r.id}).then(res=>{
      message.success('删除成功');
      const data={houseid:r.houseid,type:'Rent'}
      getrentimg('image/getrentimg',data).then(res=>{
        console.log(res.data.data);
        setImages(res.data.data)
      })
    })
    
  }


  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const onFinish2 = (values: any) => {
      
    setLoading2(true);
    console.log('Success:', values);
    let data={...values,bedroomeqs:values.bedroomeqs.toString(),publiceqs:values.publiceqs.toString()}
    setTimeout(() => {
      updateRent("rent/updateRent",data).then(res=>{
        setLoading2(false);
        messageApi.open({
          type: 'success',
          content: '编辑成功',
        });
        rentgetall('rent/getall').then((res)=>{
          console.log(res);
          setDataSource(res.data.data)
        })
      })
     
    }, 1000);


  };
  const onFinishFailed2 = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };



  return (
    <div className='rent'>
      {contextHolder}
      <Searchpart type='rent'  callback={handleCallback}/>
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} onClick={add} >添加待租房</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />
    
      <Modal 
        title="添加出租房" 
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
              label="封面"
              name="cover"
            >
             <Upload {...file2}>
                    <img style={{width:"80px"}} src={addcover===-1?nodata:addcover} alt="" />
                    <br /><br /><Button size='small' icon={<UploadOutlined />}>上传户封面</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="标题"
              name="name"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input  placeholder="请输入标题" />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
              rules={[{ required: true, message: '请输入地址' }]}
            >
              <Input  placeholder="请输入地址" />
            </Form.Item>
            <Form.Item
              label="户型"
              name="housetype"
              rules={[{ required: true, message: '请输入户型' }]}
            >
              <Input  placeholder="请输入户型" />
            </Form.Item>
            <Form.Item
              label="类型"
              name="type"
              rules={[{ required: true, message: '请输入类型' }]}
            >
              <Input  placeholder="请输入类型" />
            </Form.Item>
            <Form.Item
              label="尺寸/m²"
              name="size"
              rules={[{ required: true, message: '请输入尺寸' }]}
            >
              <Input  placeholder="请输入尺寸/m²" />
            </Form.Item>
            <Form.Item
              label="租金/元"
              name="price"
              rules={[{ required: true, message: '请输入租金' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
            <Form.Item
              label="朝向"
              name="direction"
              rules={[{ required: true, message: '请输入朝向' }]}
            >
              <Input  placeholder="请输入朝向" />
            </Form.Item>
           
            <Form.Item
              label="楼层"
              name="floor"
              rules={[{ required: true, message: '请输入楼层' }]}
            >
              <Input  placeholder="请输入楼层"  />
            </Form.Item>
            <Form.Item
              label="特色"
              name="feature"
              rules={[{ required: true, message: '请输入特色' }]}
            >
              <Input  placeholder="请输入特色,用 , 隔开" />
            </Form.Item>
            <Form.Item
              label="付款方式"
              name="paytype"
              rules={[{ required: true, message: '请输入付款方式' }]}
            >
              <Input  placeholder="请输入付款方式" />
            </Form.Item>
            <Form.Item
              label="联系方式"
              name="phone"
              rules={[{ required: true, message: '请输入联系方式' }]}
            >
              <Input  placeholder="请输入联系方式" />
            </Form.Item>

            <Form.Item
              label="基本情况"
              name="base"
              rules={[{ required: true, message: '请输入基本情况' }]}
            >
                <TextArea rows={4} placeholder="请输入基本情况" />
            </Form.Item>
            <Form.Item
              label="精选"
              name="ishot"
            >
                <Switch checkedChildren="精选" unCheckedChildren="普通"  defaultChecked={false} />
            </Form.Item>
            <Form.Item
              label="卧室设施"
              name="bedroomeqs"
            >
              <Checkbox.Group options={plainOptions}  />       
           </Form.Item>
            <Form.Item
              label="公共设施"
              name="publiceqs"
            >
              <Checkbox.Group options={plainOptions2}   />     
             </Form.Item>
        </Form>
      </Modal>
      <Modal 
        title="编辑出租房" 
        confirmLoading={loading2} 
        open={isModalOpen2} 
        onCancel={()=>handleCancel2()}
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel2()}>
            关闭
          </Button>,
        ]}
        >
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={tabshandleChange}>
          <TabPane tab="基本信息" key="1">
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
              label="id"
              name="id"
              rules={[{ required: true }]}
            >
              <Input disabled  />
            </Form.Item>
            <Form.Item
              label="封面"
              name="cover"
            >
             <Upload {...file3}>
                    <img style={{width:"80px"}} src={form2.getFieldValue('cover')||nodata} alt="" />
                    <br /><br /><Button size='small' icon={<UploadOutlined />}>上传户封面</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="标题"
              name="name"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input  placeholder="请输入标题" />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
              rules={[{ required: true, message: '请输入地址' }]}
            >
              <Input  placeholder="请输入地址" />
            </Form.Item>
            <Form.Item
              label="户型"
              name="housetype"
              rules={[{ required: true, message: '请输入户型' }]}
            >
              <Input  placeholder="请输入户型" />
            </Form.Item>
            <Form.Item
              label="类型"
              name="type"
              rules={[{ required: true, message: '请输入类型' }]}
            >
              <Input  placeholder="请输入类型" />
            </Form.Item>
            <Form.Item
              label="尺寸/m²"
              name="size"
              rules={[{ required: true, message: '请输入尺寸' }]}
            >
              <Input  placeholder="请输入尺寸/m²" />
            </Form.Item>
            <Form.Item
              label="租金/元"
              name="price"
              rules={[{ required: true, message: '请输入租金' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
            <Form.Item
              label="朝向"
              name="direction"
              rules={[{ required: true, message: '请输入朝向' }]}
            >
              <Input  placeholder="请输入朝向" />
            </Form.Item>
           
            <Form.Item
              label="楼层"
              name="floor"
              rules={[{ required: true, message: '请输入楼层' }]}
            >
              <Input  placeholder="请输入楼层"  />
            </Form.Item>
            <Form.Item
              label="特色"
              name="feature"
              rules={[{ required: true, message: '请输入特色' }]}
            >
              <Input  placeholder="请输入特色,用 , 隔开" />
            </Form.Item>
            <Form.Item
              label="付款方式"
              name="paytype"
              rules={[{ required: true, message: '请输入付款方式' }]}
            >
              <Input  placeholder="请输入付款方式" />
            </Form.Item>
            <Form.Item
              label="联系方式"
              name="phone"
              rules={[{ required: true, message: '请输入联系方式' }]}
            >
              <Input  placeholder="请输入联系方式" />
            </Form.Item>
            <Form.Item
              label="基本情况"
              name="base"
              rules={[{ required: true, message: '请输入基本情况' }]}
            >
                <TextArea rows={4} placeholder="请输入基本情况" />
            </Form.Item>
            <Form.Item
              label="精选"
              name="ishot"
            >
                <Switch checkedChildren="精选" unCheckedChildren="普通" defaultChecked={false} />
            </Form.Item>
            <Form.Item
              label="卧室设施"
              name="bedroomeqs"
            >
              <Checkbox.Group options={plainOptions} />       
           </Form.Item>
            <Form.Item
              label="公共设施"
              name="publiceqs"
            >
              <Checkbox.Group options={plainOptions2}  />     
             </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
              <Button loading={loading2} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
          </TabPane>
          <TabPane  tab="实拍图" key="2">
              {images.map(item=>{
                return (
                  <div  style={{marginBottom:'10px',marginRight:'10px',display:'inline-block'}}>
                    <Image
                    width={90}
                    src={item.url}
                  />
                  <Popconfirm
                    title="确认删除？"
                    onConfirm={()=>Popconfirmconfirm2(item)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Tag color="red">删除</Tag>
                  </Popconfirm>

                </div>
                )
              })}
              {images.length<10&&  <Upload {...file}>
                    <Button size='small' icon={<UploadOutlined />}>上传实拍图</Button>
              </Upload>
              }
            
          
          </TabPane>
        </Tabs>
      </Modal>


      </div>
  )
}
export default Used
