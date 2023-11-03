import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
const Tracking = () => {
  const [data,setData] = useState({});
  const {currentUser} = useContext(AuthContext);


  const submitUser = {user:currentUser.UserID}
  const fetchTracking = async  () => {
     await axios.post('http://172.16.10.151:8800/api/task/tracking',submitUser,{withCredentials:true})
      .then((res) =>setData(res.data))
        .catch((err) => console.log(err))
  }
  useEffect(()=>{
    fetchTracking()

  },[])
  
  const columns = [
    { field: "TrackID", headerName: "ลำดับ",},
    { field: "CreateUserID", headerName: "รหัสผู้ใช้งาน"},
    { field: "InventoryID", headerName: "รหัสสินค้า",},
    { field: "TrackType", headerName: "ประเภทของรายการ", },
    { field: "TrackTopic", headerName: "หัวข้อ", },
    { field: "TrackDescription", headerName: "	คำอธิบาย"},
    { field: "RecipientName", headerName: "ชื่อผู้รับ" },
    { field: "RecipientTelephone", headerName: "หมายเลขโทรศัพท์", },
    { field: "ActiveStatus", headerName: "	สถานะการเปิด/ปิด", },
    { field: "CreateDate", headerName: "วันที่แจ้ง", },
    { field: "UpdateDate", headerName: "วันที่อัพเดต", },
    { field: "RecipientUserID", headerName: "เจ้าหน้าที่ผู้รับรายการ", },
  ];
  return (
    <div>
      Tracking ✔️
      <DataTable
       columns={columns}
       rows={data}
       slug='tracking'
      />
    </div>
  )
}

export default Tracking