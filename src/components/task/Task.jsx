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
  const state = useLocation().state;
  const [task, setTask] = useState(state ? state : {});
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
  const trackIdString = task.TrackID.toString();
  const numberOfDigits = trackIdString.length;
  const leadingZeros = numberOfDigits < 4 ? '0'.repeat(4 - numberOfDigits) : '';
  const formattedTrackID = `${leadingZeros}${trackIdString}`;  // Concatenate leading zeros and the original TrackID

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  let MockTask = {
    info: {
      productId: "Ps5SDF1156d",
      color: "white",
      price: "$250.99",
      producer: "Sony",
      export: "Japan",
    },
    activities: [
      {
        text: "John Doe purchased Playstation 5 Digital Edition",
        time: "3 day ago",
      },
      {
        text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
        time: "1 week ago",
      },
      {
        text: "Mike Doe purchased Playstation 5 Digital Edition",
        time: "2 weeks ago",
      },
      {
        text: "Anna Doe reviewed the product",
        time: "1 month ago",
      },
      {
        text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
        time: "1 month ago",
      },
      {
        text: "Helen Doe reviewed the product",
        time: "2 months ago",
      },
    ],
  }
  useEffect(() => {
    console.log(task);
    const updateTracking = async () => {
      console.log(taskID);
      await axios.put(`http://172.16.10.151:8800/`)
    }
    const fetchTracking = async () => {
      console.log(taskID);
      await axios.post(`http://172.16.10.151:8800/api/task/tracking/${taskID}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setTask(res.data)
        })
        .catch((err) => console.log(err))
    }
    //  fetchTracking();
  }, [taskID])

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  console.log(openPopup);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="single">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <h1 style={{color:'#023047'}}># {formattedTrackID}</h1>
            </div>
            <div className="details">
              <div className="item">
                <span className="itemTitle">รหัสคุรุภัณฑ์</span>
                <span className="itemValue">{task.InventoryID}</span>
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
        <div className="activities">
          <div>
            <h2 style={{color:"#023047",marginTop:'10px'}}>รายละเอียดการดำเนินการ</h2>
            {/* <Button onClick={handleOpen} sx={{ borderRadius: 10 }} variant="contained" startIcon={<AddIcon />} color='warning'>
              Add
            </Button> */}
            <Modal aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}>
              <Fade in={open}>
                <Box sx={{ ...style }} >
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
          <Progress
            StatusName='กำลังดำเนินการ'
            StatusDescription='ทดสอบการใช้งาน UAT '
            UpdateDate='3 hours ago'
          />
          {/* <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => { setOpenPopup(true); }}
          /> */}
          <Button onClick={() => setOpenPopup(true)}>
            Add New
          </Button>
        </div>
      </div>

    </>
    //  <form action="">
    //     <input type="text" defaultValue={task.TrackID} name='TrackID' onChange={handleChange} />
    //     <input type="text" defaultValue={task.CreateUserID} name='CreateUserID'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.InventoryID} name='InventoryID'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.TrackType} name='TrackType'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.TrackTopic} name='TrackTopic'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.TrackDescription} name='TrackDescription'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.RecipientName} readOnly name='RecipientName'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.RecipientTelephone} name='RecipientTelephone'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.ActiveStatus} name='ActiveStatus' onChange={handleChange}/>
    //     <input type="date" defaultValue={task.UpdateDate} name='UpdateDate'onChange={handleChange}/>
    //     <input type="text" defaultValue={task.RecipientUserID} name='RecipientUserID'onChange={handleChange}/>
    //   </form> 
  )
}

export default Task;