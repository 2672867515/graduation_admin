import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './index.scss'
import banner1 from '../../img/banner1.jpg';
import banner2 from '../../img/banner2.png';
import banner3 from '../../img/banner3.png';
import { Button, Input, message, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import {
  ArrowUpOutlined
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';


const Used=(props)=> {
  
  return (
    <div className='used'>

      东方日升分为如风万人份
    </div>
  )
}
export default Used
