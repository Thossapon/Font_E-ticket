import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/th'
import './task.scss';
import "react-quill/dist/quill.snow.css";
import { Box, Button, Fade, LinearProgress, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import Progress from '../progress/Progress';
import { AuthContext } from '../../context/authContext';
import UpdateTicket from '../../features/ticket/UpdateTicket';
const Task = () => {

  //# รับค่ามาจาก state มาจาก ROW ของ Datagrid โดยใช้ useLocation (react-router-dom)
  const state = useLocation().state;
  const [task, setTask] = useState(state ? state : {});
  const { isAdmin, isStaff } = useAuth();
  //# status ของแต่ละ task 
  const [status, setStatus] = useState([
    {
      TrackID: '',
      StatusName: '',
      StatusDescription: '',
      UpdateDate: '',
    }
  ]);


  //useless

  // for all location reference
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/'); // Split the pathname into parts
  const taskID = parts[parts.length - 1]; // Get the last part

  // Format Date & TrackID

  const trackIdString = task.TrackID?.toString();
  const numberOfDigits = trackIdString.length;
  const leadingZeros = numberOfDigits < 4 ? '0'.repeat(4 - numberOfDigits) : '';
  const formattedTrackID = `${leadingZeros}${trackIdString}`;  // Concatenate leading zeros and the original TrackID

  const inventory = [
    { "InventoryTypeID": "1", "InventoryTypeName": "CPU", "ActiveStatus": "0" },
    { "InventoryTypeID": "2", "InventoryTypeName": "MONITOR", "ActiveStatus": "0" },
    { "InventoryTypeID": "3", "InventoryTypeName": "UPS", "ActiveStatus": "0" },
    { "InventoryTypeID": "4", "InventoryTypeName": "PRINTER", "ActiveStatus": "0" },
    { "InventoryTypeID": "5", "InventoryTypeName": "SCANNER", "ActiveStatus": "0" },
    { "InventoryTypeID": "6", "InventoryTypeName": "SERVER", "ActiveStatus": "0" },
    { "InventoryTypeID": "7", "InventoryTypeName": "SWITCH", "ActiveStatus": "0" },
    { "InventoryTypeID": "8", "InventoryTypeName": "VOIP BOX", "ActiveStatus": "0" },
    { "InventoryTypeID": "9", "InventoryTypeName": "NOTEBOOK", "ActiveStatus": "0" },
    { "InventoryTypeID": "10", "InventoryTypeName": "BLADE", "ActiveStatus": "0" },
    { "InventoryTypeID": "11", "InventoryTypeName": "STORAGE", "ActiveStatus": "0" },
    { "InventoryTypeID": "12", "InventoryTypeName": "ACCESS POINT", "ActiveStatus": "0" },
    { "InventoryTypeID": "13", "InventoryTypeName": "FIREWALL", "ActiveStatus": "0" },
    { "InventoryTypeID": "14", "InventoryTypeName": "CACHING PROXY", "ActiveStatus": "0" },
    { "InventoryTypeID": "15", "InventoryTypeName": "IPS", "ActiveStatus": "0" },
    { "InventoryTypeID": "16", "InventoryTypeName": "ALL IN ONE", "ActiveStatus": "0" },
    { "InventoryTypeID": "17", "InventoryTypeName": "PC", "ActiveStatus": "0" },
    { "InventoryTypeID": "18", "InventoryTypeName": "RACK", "ActiveStatus": "0" },
    { "InventoryTypeID": "19", "InventoryTypeName": "LOAD BALANCE", "ActiveStatus": "0" },
    { "InventoryTypeID": "20", "InventoryTypeName": "TAPE BACKUP", "ActiveStatus": "0" },
    { "InventoryTypeID": "21", "InventoryTypeName": "MEDIABOX", "ActiveStatus": "0" },
    { "InventoryTypeID": "22", "InventoryTypeName": "BANDWIDTH MANAGEMENT", "ActiveStatus": "0" },
    { "InventoryTypeID": "23", "InventoryTypeName": "PAD PANEL", "ActiveStatus": "0" },
    { "InventoryTypeID": "24", "InventoryTypeName": "SSL-VPN", "ActiveStatus": "0" },
    { "InventoryTypeID": "25", "InventoryTypeName": "Anti-Virus Gateway", "ActiveStatus": "0" },
    { "InventoryTypeID": "26", "InventoryTypeName": "HSM", "ActiveStatus": "0" },
    { "InventoryTypeID": "27", "InventoryTypeName": "KEYBOARD", "ActiveStatus": "0" },
    { "InventoryTypeID": "28", "InventoryTypeName": "MOUSE", "ActiveStatus": "0" },
    { "InventoryTypeID": "29", "InventoryTypeName": "TABLET", "ActiveStatus": "0" },
    { "InventoryTypeID": "30", "InventoryTypeName": "อื่นๆ", "ActiveStatus": "0" }
  ]

  const progress = task

  const convertInvent = task.InventoryTypeID?.toString();
  console.log(`this is convert ${convertInvent}`);
  const matchingInventory = inventory.find(item => item.InventoryTypeID === convertInvent);
  const inventoryTypeName = matchingInventory ? matchingInventory.InventoryTypeName : 'Not Found';

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <h1 style={{ color: '#023047' }}># {formattedTrackID}</h1>
            {isAdmin || isStaff
              ? <UpdateTicket task={task} />
              : null}
          </div>
          <div className="details">
            <div className="item">
              {/* แสดงข้อมูลจาก oag_track  */}
              <span className="itemTitle">ประเภท</span>
              <span className="itemValue">{inventoryTypeName}</span>
              <span className="itemTitle">ชื่อเรื่อง</span>
              <span className="itemValue">{task.TrackTopic}</span>
              <span className="itemTitle">รายละเอียด</span>
              <span className="itemValue">{task.TrackDescription}</span>
              <span className="itemTitle">วันที่อัพเดตเคส</span>
              <span className="itemValue">{task.CreateDate}</span>
              <span className="itemTitle">เจ้าของเรื่อง</span>
              <span className="itemValue">{task.CreateName}</span>
              <span className="itemTitle">ผู้รับเคส</span>
              <span className="itemValue">{task.RecipientName ? task.RecipientName : 'ยังไม่มีคนรับเคส'}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className="activities">
        <h2 style={{ color: "#023047", marginTop: '10px' }}>รายละเอียดการดำเนินการ</h2>
        <Progress
          // ส่ง status ของ task ที่เลือก {   }
          data={progress}
          // ส่งวันที่รับเคสไปในกรณีที่ยังไม่มีการอัพเดตสถานะ
          UpdateDate={task.CreateDate}
          // สำหรับเช็คโรล
          slug={isAdmin || isStaff}
        />
      </div>
    </div>
  )
}

export default Task;