import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import { Button, Input, message, Table, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import Searchpart from '../../components/searchpart/index.tsx'
const Rent=(props)=> {


  const dataSource = [
    {
      id: '胡彦斌',
      name: 32,
      address: '西湖区湖底公园1号',
    },
    {
      id: '胡彦祖',
      name: 42,
      address: '西湖区湖底1wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww公园1号',
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
  const dodelete=(r)=>{
    console.log(r);
    
  }
  return (
    <div className='newhome'>
      <Searchpart type='newhome' />
      <Button style={{color:'rgb(82,196,26)',borderColor:'rgb(82,196,26)' ,marginTop:'20px'}} >添加</Button>
      <Table style={{marginTop:'10px'}} dataSource={dataSource} columns={columns} />;
    </div>
  )
}
export default Rent
