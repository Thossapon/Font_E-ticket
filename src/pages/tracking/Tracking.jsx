import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import './tracking.scss'
import { Button } from '@mui/material';
const Tracking = () => {
  const [data,setData] = useState({});
  const {currentUser} = useContext(AuthContext);


  const submitUser = {user:currentUser.UserID,role:currentUser.Role}
  const fetchTracking = async  () => {
     await axios.post('http://172.16.10.151:8800/api/task/tracking',submitUser,{withCredentials:true})
      .then((res) =>setData(res.data))
        .then(console.log(data))
        .catch((err) => console.log(err))
  }
  useEffect(()=>{
    fetchTracking()

  },[currentUser])
  
  const columns = [
    { field: "TrackID", headerName: "ลำดับ",width:50},
    { field: "CreateUserID", headerName: "รหัสผู้ใช้งาน",width:80},
    { field: "InventoryID", headerName: "รหัสสินค้า",width:90},
    { field: "TrackType", headerName: "ประเภทของรายการ",width:150 },
    { field: "TrackTopic", headerName: "หัวข้อ", width:200},
    { field: "TrackDescription", headerName: "	คำอธิบาย",width:200},
    { field: "RecipientName", headerName: "ชื่อผู้รับ" },
    { field: "RecipientTelephone", headerName: "หมายเลขโทรศัพท์", },
    { field: "ActiveStatus", headerName: "	สถานะการเปิด/ปิด",width:20},
    { field: "CreateDate", headerName: "วันที่แจ้ง", },
    { field: "UpdateDate", headerName: "วันที่อัพเดต", },
    { field: "RecipientUserID", headerName: "เจ้าหน้าที่ผู้รับรายการ",width:100},
  ];
  return (
    <div className='products'>
      <div className="info">
        <h1>Tracking</h1>
        <Button variant='outlined'>Create Repair</Button>
      </div>
      <DataTable
       columns={columns}
       rows={data}
       slug='tracking'
      />
    </div>
  )
}

export default Tracking