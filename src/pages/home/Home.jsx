import React,{useContext} from 'react'
import {AuthContext} from '../../context/authContext';
import DataTable from '../../components/dataTable/DataTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Tracking from '../tracking/Tracking';
const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { logout  } = useContext(AuthContext);
  const columns = [
    {field:'order',headerName:"ลำดับ"},
    {field:'taskDetails',headerName:"รายละเอียด",flex:1},
    {field:'taskInformer',headerName:"ผู้แจ้งเคส",flex:1},
    // {field:'taskReceiver',headerName:"ผู้รับเคส"},
    {field:'taskDate',headerName:"วันที่รับเคส"},
  ]
  let tasks = [
      
      {
        order: 1,
        taskDetails: " คอมพิวเตอร์เริ่มช้าลง",
        taskInformer: "นายสุริยา ช่างคอม",
        taskDate: "2023-09-15",
      },
      {
        order: 2,
        taskDetails: " จอคอมพิวเตอร์ไม่แสดงภาพ",
        taskInformer: "นายพิษณุ ผู้ใช้คอม",
        taskDate: "2023-09-16",
      },
      {
        order: 3,
        taskDetails: " เครื่องพิมพ์ไม่ทำงาน",
        taskInformer: "นางสาวรุ่งฟ้า แผนกการเงิน",
        taskDate: "2023-09-17",
      },
      {
        order: 4,
        taskDetails: " มีไวรัสบนคอมพิวเตอร์",
        taskInformer: "นายชาญชัย พนักงานสำนักงาน",
        taskDate: "2023-09-18",
      },
      {
        order: 5,
        taskDetails: " อินเทอร์เน็ตไม่ทำงาน",
        taskInformer: "นางสาวอัศวินี บริหารโครงการ",
        taskDate: "2023-09-19",
      },
      {
        order: 6,
        taskDetails: " หน้าจอสีฟ้า",
        taskInformer: "นายประดิษฐ์ ผู้ใช้คอม",
        taskDate: "2023-09-20",
      },
      {
        order: 7,
        taskDetails: " ไม่สามารถเข้าระบบได้",
        taskInformer: "นางสาวสรัลชนา แผนกบุคคล",
        taskDate: "2023-09-21",
      },
      {
        order: 8,
        taskDetails: " ไม่สามารถเชื่อมต่อกับเครือข่าย",
        taskInformer: "นายสมชาย ผู้ใช้คอม",
        taskDate: "2023-09-22",
      },
      {
        order: 9,
        taskDetails: " คีย์บอร์ดมีปัญหา",
        taskInformer: "นางสาวพรรณวรรณ แผนกบัญชี",
        taskDate: "2023-09-23",
      },
      {
        order: 10,
        taskDetails: " หายหน้าจอที่ทำงาน",
        taskInformer: "นายสุรัตน์ ผู้ใช้คอม",
        taskDate: "2023-09-24",
      },
];
   const handleLogout = async (e) => {
    e.preventDefault();
    try {
      logout();
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {currentUser && <h1>{currentUser.FirstName}</h1>}
      <h3>Homepage</h3>
      <button onClick={handleLogout}>Log out</button>
      <Link to={`/tracking`} preventScrollReset target='_blank'>Tracking</Link>
    </div>
  )
}

export default Home