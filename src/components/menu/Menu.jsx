import React, { useContext } from 'react'
// icons
import HandymanIcon from '@mui/icons-material/Handyman';
import TableChartIcon from '@mui/icons-material/TableChart';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import './menu.scss'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {ROLES} from '../../config/roles'
const Menu = () => {
    
    const { UserID, Role, isAdmin, isStaff } = useAuth();
    
    const checkRole = Role === ROLES.Admin ||  Role === ROLES.Staff;
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
        {
            id: 6,
            title: "คู่มือการใช้งาน",
            url: '/manual',
            icon: < BookIcon />
        },
    ]
    return (
        <div className='menu'>
            {menus.map((item) => (
                (isAdmin ? item.id !== 6 : isStaff ? item.id !== 5 : item.id !== 4 && item.id !== 5 ) && (
                    <div className='item' key={item.id}>
                        <Link to={item.url} className='listItem'>
                            {item.icon}
                            <span className="listItemTitle">{item.title}</span>
                        </Link>
                    </div>
                )
            ))}
        </div>
    )
}

export default Menu