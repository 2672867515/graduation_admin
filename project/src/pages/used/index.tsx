import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, DatePicker, Form, Input, message, Modal, Switch, Table, Tag, Upload ,Tabs, Select, Popconfirm } from 'antd';
import type { DatePickerProps } from 'antd';
import type { TabsProps ,UploadProps} from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import nodata from '../../img/nodata.jpg'
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
import { addHousetype, addNewhome, addUsed, deleteHousetype, deletenNewhome, deletenUsed, getHousetype, getVrimg, getall, getimgTosee, updateHousetype, updateNewhome, updateUsed, updateVrimage, usedgetall } from '../../api/api.ts';
import TabPane from 'antd/es/tabs/TabPane';
import TextArea from 'antd/es/input/TextArea';
const Used=(props)=> {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [imagetype,setImagetype]=useState('客厅')
  const [houseid,setHouseid]=useState()
  const [direction,setDirection]=useState('')
  const [imageid,setImageid]=useState(-1)
  const [seeimg,setSeeimg]=useState([{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}])
  const [activeKey, setActiveKey] = useState("1");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [dataSource,setDataSource]=useState([])
  const [addcover, setAddcover] = useState(-1);
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
      title: '尺寸/m²',
      dataIndex: 'size',
      key: 'size',
      className: 'column2', 
    },
    {
      title: '总价/万',
      dataIndex: 'price',
      key: 'price',
      className: 'column', 
    },
    {
      title: '单价/元',
      dataIndex: 'per',
      key: 'per',
      className: 'column', 
    },
    {
      title: '竣工时间',
      dataIndex: 'jg',
      key: 'jg',
      className: 'column2', 
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
        console.log("imageid:"+imageid);
        let temp=[...seeimg]
       
        switch (direction) {
          case "f":
            temp[0].url=info.file.response
            break;
          case "ba":
            temp[1].url=info.file.response
            break;
          case "l":
            temp[2].url=info.file.response
            break;
          case "r":
            temp[3].url=info.file.response
            break;
          case "t":
            temp[4].url=info.file.response
            break;
          case "bo":
            temp[5].url=info.file.response
            break;

          default:
            break;
        }
        console.log(temp);
        
        setSeeimg(temp)
        let data={}
        if(imageid!=-1){
          data={id:imageid,houseid:houseid,url:info.file.response,area:imagetype,direction:direction,type:'Usedvr'}

        }else{
          data={id:-1,houseid:houseid,url:info.file.response,area:imagetype,direction:direction,type:'Usedvr'}
        }
        updateVrimage('/image/updateVrimage',data).then(res=>{
          console.log(res);
          message.success(`${info.file.name} 上传${res.data.msg}`);
          setImageid(-1)
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
        updateUsed('used/updateUsed',form2.getFieldsValue()).then(res=>{
         message.success(`${info.file.name} 上传成功`);
         getall('used/getall').then((res)=>{
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
    usedgetall('used/getall').then((res)=>{
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
  }


  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Success:', values);
    setTimeout(() => {
      addUsed('used/addUsed',values).then(res=>{
        setLoading(false);
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: '添加成功',
        });
        usedgetall('used/getall').then((res)=>{
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
    const data={...r,ishot:r.ishot==='true'?true:false}
    Object.keys(data).forEach(key => {
      form2.setFieldValue(key, data[key]);
    });
    setIsModalOpen2(true)
    setHouseid(r.id)
    const data2={houseid:r.id,area:imagetype,type:'Usedvr'}
    getimgTosee('image/getusedimgTosee',data2).then(res=>{
      console.log(res.data.data);
      let temp=[{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}]
      res.data.data.forEach((item)=>{
        if(item.direction==='f'){
          temp[0]=item
        }
        if(item.direction==='ba'){
          temp[1]=item
        }
        if(item.direction==='l'){
          temp[2]=item
        }
        if(item.direction==='r'){
          temp[3]=item
        }
        if(item.direction==='t'){
          temp[4]=item
        }
        if(item.direction==='bo'){
          temp[5]=item
        }
      })
      console.log(temp);
      setSeeimg(temp)
    })
  }

  
  const tabshandleChange = (key) => {
    setActiveKey(key);
  }
  
  const Popconfirmconfirm=(r)=>{
    console.log(r);
    console.log(type);
    deletenUsed('used/deletenUsed',{id:r.id}).then(res=>{
      message.success('删除成功');
      getall('used/getall').then((res)=>{
        setDataSource(res.data.data)
      })
    })
    
  }


  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const onFinish2 = (values: any) => {
      
    setLoading2(true);
    console.log('Success:', values);
    setTimeout(() => {
      updateUsed("used/updateUsed",values).then(res=>{
        setLoading2(false);
        messageApi.open({
          type: 'success',
          content: '编辑成功',
        });
        usedgetall('used/getall').then((res)=>{
          console.log(res);
          setDataSource(res.data.data)
        })
      })
     
    }, 1000);


  };
  const onFinishFailed2 = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const selecthandleChange = (value: string) => {
    console.log(`selected ${value}`);
    setImagetype(value)
    let data={houseid:houseid,area:value,type:'Usedvr'}
    getimgTosee('image/getimgTosee',data).then(res=>{
      console.log(res);
      let temp=[{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}]
      res.data.data.forEach((item)=>{
        if(item.direction==='f'){
          temp[0]=item
        }
        if(item.direction==='ba'){
          temp[1]=item
        }
        if(item.direction==='l'){
          temp[2]=item
        }
        if(item.direction==='r'){
          temp[3]=item
        }
        if(item.direction==='t'){
          temp[4]=item
        }
        if(item.direction==='bo'){
          temp[5]=item
        }
      })
      console.log(temp);
      
      setSeeimg(temp)
    })
  };
  const up=(d)=>{
    setDirection(d)
    const data={houseid:houseid,area:imagetype,direction:d,type:'Usedvr'}
    getVrimg('image/getVrimg',data).then(res=>{
      console.log(res);
      if(res.data.data.length>0){
        setImageid(res.data.data[0].id)
      }
    })
  }

  return (
    <div className='used'>
      {contextHolder}
      <Searchpart type='used'  callback={handleCallback}/>
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} onClick={add} >添加二手房</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />
    
      <Modal 
        title="添加二手房" 
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
          labelCol={{span:5}}
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
              label="尺寸/m²"
              name="size"
              rules={[{ required: true, message: '请输入尺寸' }]}
            >
              <Input  placeholder="请输入尺寸/m²" />
            </Form.Item>
            <Form.Item
              label="总价/万"
              name="price"
              rules={[{ required: true, message: '请输入总价' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
            <Form.Item
              label="单价/元"
              name="per"
              rules={[{ required: true, message: '请输入单价' }]}
            >
              <Input  placeholder="请输入单价" />
            </Form.Item>
           
            <Form.Item
              label="竣工时间/年"
              name="jg"
              rules={[{ required: true, message: '请输入竣工时间' }]}
            >
              <Input  placeholder="请输入竣工时间"   />
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
              label="核心卖点"
              name="sp"
              rules={[{ required: true, message: '请输入核心卖点' }]}
            >
              <TextArea rows={4} placeholder="请输入核心卖点" />
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
        </Form>
      </Modal>
      <Modal 
        title="编辑二手房" 
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
            labelCol={{span:5}}
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
              label="尺寸/m²"
              name="size"
              rules={[{ required: true, message: '请输入尺寸' }]}
            >
              <Input  placeholder="请输入尺寸/m²" />
            </Form.Item>
            <Form.Item
              label="总价/万"
              name="price"
              rules={[{ required: true, message: '请输入总价' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
            <Form.Item
              label="单价/元"
              name="per"
              rules={[{ required: true, message: '请输入单价' }]}
            >
              <Input  placeholder="请输入单价" />
            </Form.Item>
           
            <Form.Item
              label="竣工时间"
              name="jg"
              rules={[{ required: true, message: '请输入竣工时间' }]}
            >
              <Input disabled  />
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
              label="核心卖点"
              name="sp"
              rules={[{ required: true, message: '请输入核心卖点' }]}
            >
              <TextArea rows={4} placeholder="请输入核心卖点" />
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
            <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
              <Button loading={loading2} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
          </TabPane>
          <TabPane tab="VR素材" key="2">
            <Select
              defaultValue="客厅"
              style={{ width: 120 }}
              onChange={selecthandleChange}
              options={[
                { value: '客厅', label: '客厅' },
                { value: '主卧', label: '主卧' },
                { value: '次卧', label: '次卧' },
                { value: '卫生间', label: '卫生间' },
              ]}
            />
            <br />
            <br />
              <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[0]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('f')} icon={<UploadOutlined />}>上传正面</Button>
              </Upload>
             <br /><br />
            <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[1]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('ba')} icon={<UploadOutlined />}>上传后面</Button>
              </Upload>
             <br /><br />
            <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[2]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('l')} icon={<UploadOutlined />}>上传左面</Button>
              </Upload> 
              <br />
             <br />
            <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[3]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('r')} icon={<UploadOutlined />}>上传右面</Button>
              </Upload> 
              <br />
             <br />
            <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[4]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('t')} icon={<UploadOutlined />}>上传上面</Button>
              </Upload>
              <br />
             <br />
            <Upload {...file}>
                    <img style={{width:'80px'}} src={seeimg[5]?.url||nodata} alt="" />
                    <Button size='small' onClick={()=>up('bo')} icon={<UploadOutlined />}>上传下面</Button>
              </Upload>
          
          </TabPane>
        </Tabs>
      </Modal>


      </div>
  )
}
export default Used
