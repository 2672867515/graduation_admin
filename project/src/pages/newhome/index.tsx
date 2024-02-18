import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, DatePicker, Form, Input, message, Modal, Switch, Table, Tag, Upload ,Tabs, Select, Popconfirm } from 'antd';
import type { DatePickerProps } from 'antd';
import type { TabsProps ,UploadProps} from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import nodata from '../../img/nodata.jpg'
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
import { addHousetype, addNewhome, getHousetype, getVrimg, getall, getimgTosee, updateHousetype, updateNewhome, updateVrimage } from '../../api/api.ts';
import TabPane from 'antd/es/tabs/TabPane';
const Newhome=(props)=> {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [name, setName] = useState('');
  const [imagetype,setImagetype]=useState('客厅')
  const [houseid,setHouseid]=useState()
  const [direction,setDirection]=useState('')
  const [imageid,setImageid]=useState(-1)
  const [seeimg,setSeeimg]=useState([{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}])
  const [activeKey, setActiveKey] = useState("1");
  const [addhousetypeurl, setAddhousetypeurl] = useState(-1);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [detail,setDetail]=useState(false)
  const [dataSource,setDataSource]=useState([])
  const [dataSource2,setDataSource2]=useState([])

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
      title: '尺寸范围/m²',
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
        <a onClick={()=>todetail(r)} style={{marginRight:'10px'}}>详情</a>
        <Popconfirm
          title="确认删除？"
          onConfirm={()=>Popconfirmconfirm(r)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
        </div>
        ),
    },
    
  ];
  const columns2 = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '户型图',
      dataIndex: 'url',
      key: 'url',
      className: 'column', 
      render: (t,r) => (
        <img style={{width:'80px'}} src={t||nodata} alt="" />
        ),
    },
    {
      title: '户型',
      dataIndex: 'type',
      key: 'type',
      className: 'column', 
    },
    {
      title: '建面/m²',
      dataIndex: 'size',
      key: 'size',
      className: 'column', 
    },
    {
      title: '单元位置',
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
        <a onClick={()=>doedit2(r)} style={{marginRight:'10px'}}>编辑</a>
        <Popconfirm
          title="确认删除？"
          onConfirm={()=>Popconfirmconfirm2(r)}
          okText="确认"
          cancelText="取消"
        >
          <a onClick={()=>dodelete(r)} style={{marginRight:'10px'}}>删除</a>
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
          data={id:imageid,houseid:houseid,url:info.file.response,area:imagetype,direction:direction,type:'Newhomevr'}

        }else{
          data={id:-1,houseid:houseid,url:info.file.response,area:imagetype,direction:direction,type:'Newhomevr'}
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
        form4.setFieldValue('url',info.file.response)
       updateHousetype('housetype/updateHousetype',form4.getFieldsValue()).then(res=>{
        message.success(`${info.file.name} 上传成功`);
        getHousetype('housetype/getHousetype',{houseid:form4.getFieldValue('houseid')}).then(res=>{
          setDataSource2(res.data.data)
        })
      })
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
        form3.setFieldValue('url',info.file.response)
        message.success(`${info.file.name} 上传成功`);
        setAddhousetypeurl(info.file.response)
      console.log(form3.getFieldValue('url'));
      
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  const initialValues = {
    ishot: false, // 设置热门开关的初始值为 false
  };
  useEffect(()=>{
    getall('/newhome/getall').then((res)=>{
      console.log(res);
      setDataSource(res.data.data)
    })
  },[])
  const handleCallback = (data) => {
    setDetail(false)
    console.log(data);
    
  };
  const add=()=>{
    setIsModalOpen(true);
    form.resetFields()
  }
  const add2=()=>{
    setIsModalOpen3(true);
    form3.resetFields()
    form3.setFieldValue("houseid",houseid)
    setAddhousetypeurl(-1)
  }
  const handleSwitchChange = (checked) => {
    form.setFieldsValue({ ishot: checked });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Success:', values);
    const data={...values,kp:values.kp.format('YYYY-MM-DD'),jf:values.jf.format('YYYY-MM-DD')}
    console.log(data);
    setTimeout(() => {
      addNewhome('newhome/addNewhome',data).then(res=>{
        setLoading(false);
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: '添加成功',
        });
        getall('/newhome/getall').then((res)=>{
          setDataSource(res.data.data)
        })
      })
      
    }, 1000);


  };
  const onFinish3 = (values: any) => {
    setLoading3(true);
    console.log('Success:', values);
    setTimeout(() => {
      
      addHousetype('housetype/addHousetype',form3.getFieldsValue()).then(res=>{
        setLoading3(false);
        setIsModalOpen3(false);
        messageApi.open({
          type: 'success',
          content: '添加成功',
        });
        getHousetype('housetype/getHousetype',{houseid:form3.getFieldValue('houseid')}).then(res=>{
          setDataSource2(res.data.data)
        })
      })
      
    }, 1000);


  };
  const onFinish4 = (values: any) => {
    setLoading4(true);
    console.log('Success:', values);
    setTimeout(() => {
      updateHousetype('housetype/updateHousetype',values).then(res=>{
        setLoading4(false);
        setIsModalOpen4(false);
        messageApi.open({
          type: 'success',
          content: '编辑成功',
        });
        getHousetype('housetype/getHousetype',{houseid:values.houseid}).then(res=>{
          setDataSource2(res.data.data)
        })
      })
      
    }, 1000);


  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const onFinishFailed3 = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const onFinishFailed4 = (errorInfo: any) => {
    console.log('meaasgeFailed:', errorInfo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel4 = () => {
    setIsModalOpen4(false);
  };

  const doedit=(r)=>{
    setActiveKey("1")
    console.log(r);
    const data={...r,ishot:r.ishot==='true'?true:false,kp:moment(r.kp),jf:moment(r.jf)}
    Object.keys(data).forEach(key => {
      form2.setFieldValue(key, data[key]);
    });
    setIsModalOpen2(true)
    setHouseid(r.id)
    const data2={houseid:r.id,area:imagetype,type:'Newhomevr'}
    getimgTosee('image/getimgTosee',data2).then(res=>{
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
  const doedit2=(r)=>{

    console.log(r);
    Object.keys(r).forEach(key => {
      form4.setFieldValue(key, r[key]);
    });  
    setIsModalOpen4(true)

  }
  
  const tabshandleChange = (key) => {
    setActiveKey(key);
  }
  const dodelete=(r)=>{
    console.log(r);
    
  }
  const todetail=(r)=>{
    setDetail(true)
    setName(r.name)
    setHouseid(r.id)
    getHousetype('housetype/getHousetype',{houseid:r.id}).then(res=>{
      setDataSource2(res.data.data)
    })
  }
  
  const Popconfirmconfirm=(r)=>{
    console.log(r);
    message.success('删除成功');
  }

  const Popconfirmconfirm2=(r)=>{
    console.log(r);
    message.success('删除成功');
  }

  const close=()=>{
    setDetail(false)
  }
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const onFinish2 = (values: any) => {
      
    setLoading2(true);
    console.log('Success:', values);
    const data={...values,kp:values.kp.format('YYYY-MM-DD'),jf:values.jf.format('YYYY-MM-DD')}
    console.log(data);
    setTimeout(() => {
      updateNewhome("newhome/updateNewhome",data).then(res=>{
        setLoading2(false);
        messageApi.open({
          type: 'success',
          content: '编辑成功',
        });
        getall('/newhome/getall').then((res)=>{
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
    let data={houseid:houseid,area:value,type:'Newhomevr'}
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
    const data={houseid:houseid,area:imagetype,direction:d,type:'Newhomevr'}
    getVrimg('image/getVrimg',data).then(res=>{
      console.log(res);
      if(res.data.data.length>0){
        setImageid(res.data.data[0].id)
      }
    })
  }

  return (
    <div className='newhome'>
      {contextHolder}
      <Searchpart type='newhome'  callback={handleCallback}/>
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} onClick={add} >添加楼盘</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />
      {detail&&  <div className="name">{name}</div> }
      {detail&&<Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'10px'}} onClick={add2} >添加户型</Button>}
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
          labelCol={{span:5}}
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
            label="尺寸范围/m²"
            name="size"
            rules={[{ required: true, message: '请输入尺寸范围' }]}
          >
             <Input  placeholder="请输入尺寸范围/m²" />
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
        title="编辑楼盘" 
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
              label="楼盘id"
              name="id"
              rules={[{ required: true, message: '请输入楼盘名称' }]}
            >
              <Input disabled placeholder="请输入楼盘名称" />
            </Form.Item>
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
              label="尺寸范围/m²"
              name="size"
              rules={[{ required: true, message: '请输入尺寸范围' }]}
            >
              <Input  placeholder="请输入尺寸范围/m²" />
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
      <Modal 
        title="添加户型" 
        open={isModalOpen3}
        onCancel={()=>handleCancel3()}
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel3()}>
            关闭
          </Button>,
            <Button key="submit" type="primary" loading={loading3} onClick={() => form3.submit()}>
            提交
          </Button>
        ]}
        >
          <Form
            form={form3}
            name="basic"
            labelCol={{span:4}}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish3}
            onFinishFailed={onFinishFailed3}
          >
            <Form.Item
              label="楼盘id"
              name="houseid"
              rules={[{ required: true}]}
            >
              <Input value={houseid} disabled  />
            </Form.Item>
            <Form.Item
              label="户型图"
              name="url"
            >
             <Upload {...file3}>
                    <img style={{width:"80px"}} src={addhousetypeurl===-1?nodata:addhousetypeurl} alt="" />
                    <br /><br /><Button size='small' icon={<UploadOutlined />}>上传户型图</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="户型"
              name="type"
              rules={[{ required: true, message: '请输入户型' }]}
            >
              <Input  placeholder="请输入户型" />
            </Form.Item>
            <Form.Item
              label="建面/m²"
              name="size"
              rules={[{ required: true, message: '请输入建面' }]}
            >
              <Input  placeholder="请输入建面/m²" />
            </Form.Item>
            <Form.Item
              label="单元位置"
              name="location"
              rules={[{ required: true, message: '请输入单元位置' }]}
            >
              <Input  placeholder="请输入单元位置" />
            </Form.Item>
            <Form.Item
              label="总价/万"
              name="price"
              rules={[{ required: true, message: '请输入总价' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
         
            <Form.Item
              label="单价/万"
              name="per"
              rules={[{ required: true, message: '请输入单价' }]}
            >
              <Input  placeholder="请输入单价" />
            </Form.Item>
          </Form>
      </Modal>
      <Modal 
        title="编辑户型" 
        confirmLoading={loading4} 
        open={isModalOpen4}
        onCancel={()=>handleCancel4()}
        footer={[
          // 注意这里使用的是 Form 组件的 submit 方法
          <Button  onClick={() => handleCancel4()}>
            关闭
          </Button>,
            <Button key="submit" type="primary" loading={loading4} onClick={() => form4.submit()}>
            提交
          </Button>
        ]}
        >
          <Form
            form={form4}
            name="basic"
            labelCol={{span:4}}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish4}
            onFinishFailed={onFinishFailed4}
          >
            <Form.Item
              label="户型id"
              name="id"
              rules={[{ required: true}]}
            >
              <Input disabled  />
            </Form.Item>
            <Form.Item
              label="楼盘id"
              name="houseid"
              rules={[{ required: true}]}
            >
              <Input  disabled  />
            </Form.Item>
            <Form.Item
              label="户型图"
              name="url"
              rules={[{ required: true}]}
            >
             <Upload {...file2}>
                    <img style={{width:"80px"}} src={form4.getFieldValue('url')||nodata} alt="" />
                    <br /><br /><Button size='small' icon={<UploadOutlined />}>上传户型图</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="户型"
              name="type"
              rules={[{ required: true, message: '请输入户型' }]}
            >
              <Input  placeholder="请输入户型" />
            </Form.Item>
            <Form.Item
              label="建面/m²"
              name="size"
              rules={[{ required: true, message: '请输入建面' }]}
            >
              <Input  placeholder="请输入建面/m²" />
            </Form.Item>
            <Form.Item
              label="单元位置"
              name="location"
              rules={[{ required: true, message: '请输入单元位置' }]}
            >
              <Input  placeholder="请输入单元位置" />
            </Form.Item>
            <Form.Item
              label="总价/万"
              name="price"
              rules={[{ required: true, message: '请输入总价' }]}
            >
              <Input  placeholder="请输入总价" />
            </Form.Item>
         
            <Form.Item
              label="单价/万"
              name="per"
              rules={[{ required: true, message: '请输入单价' }]}
            >
              <Input  placeholder="请输入单价" />
            </Form.Item>
          </Form>
      </Modal>
      </div>
  )
}
export default Newhome
