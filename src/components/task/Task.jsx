import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Task = () => {
  const state = useLocation().state;
  const [task, setTask] = useState(state ? state : {});
  const [editTask, setEditTask] = useState({
    TrackID: null,
    CreateUserID:null,
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
  // for all location reference
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/'); // Split the pathname into parts
  const taskID = parts[parts.length - 1]; // Get the last part

  useEffect(() => {
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
      setEditTask((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  return (
    <div>
      <form action="">
        <input type="text" defaultValue={task.TrackID} name='TrackID' onChange={handleChange}/>
        <input type="text" defaultValue={task.CreateUserID} name='CreateUserID'onChange={handleChange}/>
        <input type="text" defaultValue={task.InventoryID} name='InventoryID'onChange={handleChange}/>
        <input type="text" defaultValue={task.TrackType} name='TrackType'onChange={handleChange}/>
        <input type="text" defaultValue={task.TrackTopic} name='TrackTopic'onChange={handleChange}/>
        <input type="text" defaultValue={task.TrackDescription} name='TrackDescription'onChange={handleChange}/>
        <input type="text" defaultValue={task.RecipientName} readOnly name='RecipientName'onChange={handleChange}/>
        <input type="text" defaultValue={task.RecipientTelephone} name='RecipientTelephone'onChange={handleChange}/>
        <input type="text" defaultValue={task.ActiveStatus} name='ActiveStatus' onChange={handleChange}/>
        <input type="date" defaultValue={task.UpdateDate} name='UpdateDate'onChange={handleChange}/>
        <input type="text" defaultValue={task.RecipientUserID} name='RecipientUserID'onChange={handleChange}/>
      </form>
    </div>
  )
}

export default Task