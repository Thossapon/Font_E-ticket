import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/th'
import ReactQuill from "react-quill";
import useAuth from '../../hooks/useAuth';
import './task.scss';
import "react-quill/dist/quill.snow.css";
import { Box, Button, Fade, LinearProgress, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Progress from '../progress/Progress';
const Task = () => {

  //# รับค่ามาจาก state มาจาก ROW ของ Datagrid โดยใช้ useLocation (react-router-dom)
  const state = useLocation().state;
  const [task, setTask] = useState(state ? state : {});

  //# status ของแต่ละ task 
  const [status,setStatus] = useState([
    {
      TrackID:'',
      StatusName:'',
      StatusDescription:'',
      UpdateDate:'',
    }
  ]);

  const { currentUser } = useAuth();

  //useless
  const [editTask, setEditTask] = useState({
    TrackID: null,
    CreateUserID: null,
    InventoryID: null,
    TrackType: "",
    TrackTopic: "",
    TrackDescription: "",
    RecipientName: "",
    RecipientTelephone: "",
    ActiveStatus: 0,
    CreateDate: "",
    UpdateDate: "",
    RecipientUserID: ""

  })
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);

  // for  popup open
  const [openPopup, setOpenPopup] = useState(false)

  // for all location reference
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/'); // Split the pathname into parts
  const taskID = parts[parts.length - 1]; // Get the last part

  // Format Date & TrackID

  const momentDate = moment(task.CreateDate).locale('th');
  const formattedDate = momentDate.format('DD MMMM YYYY hh:mm:ss A');
  const trackIdString = task.TrackID?.toString();
  const numberOfDigits = trackIdString.length;
  const leadingZeros = numberOfDigits < 4 ? '0'.repeat(4 - numberOfDigits) : '';
  const formattedTrackID = `${leadingZeros}${trackIdString}`;  // Concatenate leading zeros and the original TrackID

  useEffect(() => {


    // สำหรับ fetch แต่ละ task ไม่ได้ใช้เพราะ ใช้ state ของ react-router-dom รับค่า row มาจาก MUI Datagrid
    const fetchTracking = async () => {
      console.log(taskID);
      await axios.post(`http://172.16.10.151:8800/api/task/tracking/${taskID}`, { withCredentials: true })
        .then((res) => {
          console.log(`some ${res.data}`);
          setTask(res.data)
        })
        .catch((err) => console.log(err))
    }

    // fetch status ของแต่ละ task
    const fetchStatus = async () => {
      await axios.get(`http://172.16.10.151:8800/api/task/status/${task.TrackID}`,{withCredentials:true})
         .then((res) => setStatus(res.data))
          .then(console.log(status))
    }
    //  fetchTracking();
    fetchStatus();
  }, [])

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
      <div className="single">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <h1 style={{ color: '#023047' }}># {formattedTrackID}</h1>
            </div>
            <div className="details">
              <div className="item">
                {/* แสดงข้อมูลจาก oag_track  */}
                <span className="itemTitle">รหัสคุรุภัณฑ์</span>
                <span className="itemValue">{task.InventoryTypeID}</span>
                <span className="itemTitle">ชื่อเรื่อง</span>
                <span className="itemValue">{task.TrackTopic}</span>
                <span className="itemTitle">รายละเอียด</span>
                <span className="itemValue">{task.TrackDescription}</span>
                <span className="itemTitle">วันที่อัพเดตเคส</span>
                <span className="itemValue">{formattedDate}</span>
                <span className="itemTitle">เจ้าของเรื่อง</span>
                <span className="itemValue">{task.CreateUserID}</span>
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
            data={status}
            // ส่งวันที่รับเคสไปในกรณีที่ยังไม่มีการอัพเดตสถานะ
            UpdateDate={task.CreateDate}
            // สำหรับเช็คโรล
            slug={currentUser?.Role}
          />
        </div>
      </div>
  )
}

export default Task;