import React, { useContext } from 'react'
import HandymanIcon from '@mui/icons-material/Handyman';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableChartIcon from '@mui/icons-material/TableChart';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import GroupIcon from '@mui/icons-material/Group';
import './menu.scss'
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
const Menu = () => {

    const ROLES = {
        Admin: 1,
        User: 3
    }
    const { currentUser } = useContext(AuthContext);
    const checkRole = currentUser?.Role === ROLES.Admin;
    const menus = [
        {
            id: 1,
            title: "การแจ้งซ่อม",
            url: checkRole ? '/pending' : '/create',
            icon: <HandymanIcon />
        },
        {
            id: 2,
            title: "ติดตามสถานะการซ่อม",
            url: '/tracking',
            icon: <ContentPasteSearchIcon />
        },
        // {
        //     id: 3,
        //     title: "คู่มือการใช้งาน",
        //     url: '/',
        //     icon: <AssignmentIcon />
        // },
        {
            id: 4,
            title: "รายงานการแจ้งซ่อม",
            url: '/report',
            icon: <TableChartIcon />
        },
        {
            id: 5,
            title: "การจัดการข้อมูลผู้ใช้งาน",
            url: '/manage',
            icon: <GroupIcon />
        },
    ]
    return (
        <div className='menu'>
            {menus.map((item) => (
                <div className='item' key={item.id}>
                    <Link to={item.url} className='listItem'>
                        {item.icon}
                        <span className="listItemTitle">{item.title}</span>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Menu