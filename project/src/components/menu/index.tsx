import React,{ useEffect, useState } from 'react';
import './index.scss'
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Menu, Row, type MenuProps, Col, Modal,message, Statistic, Upload } from 'antd';
import { ContainerOutlined, TeamOutlined,HomeOutlined,CommentOutlined,BankOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import type { UploadProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('新房管理', '/Newhome',<HomeOutlined />),
  getItem('二手房管理', '/Used',<BankOutlined />),
  getItem('出租房管理', '/Rent',<ContainerOutlined />),
  getItem('问答管理', '4',<CommentOutlined />),
  getItem('账户管理', '5',<TeamOutlined />),
];

 const Menus=()=> {
    let  history = useHistory() //将useHistory()钩子赋值给history方便使用
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        console.log(e.key);
        history.push(`${e.key}`)
      };
  return (
    <div className='menu'>
        <Menu
            onClick={onClick}
            defaultSelectedKeys={['/Newhome']}
            mode="inline"
            items={items}
        />
    </div>
  );
}
export default Menus