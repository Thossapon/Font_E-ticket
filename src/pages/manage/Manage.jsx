import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import UsersList from '../../features/users/UserList'
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext'
const Manage = () => {
  const columns = [
    { field: "UserID", headerName: "ลำดับ",flex:0.1},
    { field: "FirstName", headerName: "ชื่อ", flex:0.5},
    { field: "LastName", headerName: "นามสกุล", flex:0.3},
    { field: "Telephone", headerName: "เบอร์โทรศัพท์",flex:0.3},
    { field: "Role", headerName: "สิทธิ์",flex:0.1},
  ]
  
  const {currentUser} = useContext(AuthContext)
  const [data,setData] = useState({})

  const fetchTracking = async  () => {
    await axios.get('http://172.16.10.151:8800/api/users',{withCredentials:true})
     .then((res) =>setData(res.data))
       .then(console.log(data))
       .catch((err) => console.log(err))
 }
 useEffect(()=>{
   fetchTracking()
 },[currentUser])
  return (
    <div>
      <h1 style={{ color: 'darkblue' }}>จัดการผู้ใช้งาน</h1>
      <DataTable
      columns={columns}
      rows={data}
      slug='manage'
      />
      <UsersList/>
    </div>
  )
}

export default Manage