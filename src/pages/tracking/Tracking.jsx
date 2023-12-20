import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import './tracking.scss'
import useAuth from '../../hooks/useAuth';

const Tracking = () => {

  const { UserID,Role } = useAuth();
  console.log(UserID,Role);
  const [data,setData] = useState({});

  const ROLES = {Admin:1,User:3}
  const checkRole = Role === ROLES.Admin;
  
  const fakeUser = {user:UserID,role: Role}
  const fetchTracking = async  () => {
     await axios.post('http://172.16.10.151:8800/api/task/tracking',fakeUser,{withCredentials:true})
      .then((res) =>setData(res.data))
        .then(console.log(data))
        .catch((err) => console.log(err))
  }
  useEffect(()=>{
    fetchTracking()
  },[UserID])
  
  const columns = [
    { field: "TrackID", headerName: "ลำดับ",flex:0.1},
    { field: "TrackTopic", headerName: "หัวข้อ", flex:0.5},
    { field: "FirstName", headerName: "ชื่อผู้แจ้ง", flex:0.3},
    { field: "RecipientName", headerName: "ชื่อผู้รับ",flex:0.3},
    { field: "ActiveStatus", headerName: "	สถานะ",flex:0.1},
  ];
  return (
    <div className='products'>
      <div className="info">
        <h1 style={{color:'darkblue'}}>ติดตามงาน 📌</h1>
      </div>
      <DataTable
       columns={columns}
       rows={data}
       slug= {checkRole ? 'tracking' : 'userTracking'} 
      />
    </div>
  )
}

export default Tracking