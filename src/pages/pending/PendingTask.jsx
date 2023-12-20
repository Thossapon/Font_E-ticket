import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { Box } from '@mui/system';
import moment from 'moment';
import './pendingtask.scss'
import Create from '../create/Create';
import { useGetPendingQuery } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
const PendingTask = () => {

    const token = useSelector(selectCurrentToken);
    const ROLES = { Admin: 1, User: 3 }
    const {
        data: tickets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPendingQuery({ token })
    
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [data, setData] = useState({});
    const { currentUser } = useContext(AuthContext);
    const checkRole = currentUser?.Role === ROLES.Admin;

    const options = tickets ? tickets : []

    const columns = [
        { field: "TrackID", headerName: "ลำดับ", flex: 0.5 },
        { field: "TrackTopic", headerName: "หัวข้อ", flex: 1 },
        { field: "CreateName", headerName: "ชื่อผู้แจ้ง", flex: 1 },
        { field: "RecipientName", headerName: "ชื่อผู้รับ", flex: 1 },
        { field: "StatusName", headerName: "	สถานะ", flex: 1 },
    ];

    return (
        <Box>
            <TabContext value={value}>
                <Box>
                    <TabList
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="some might say"
                    >
                        <Tab value='1' label='งานรอรับ' />
                        <Tab value='2' label='เพิ่มข้อมูลแจ้งซ่อม' />

                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <div className='products'>
                        <div className="info">
                            <h1 style={{ color: 'darkblue' }}>งานรอรับ ⌛</h1>
                        </div>
                        <DataTable
                            slug="pending"
                            columns={columns}
                            rows={options}
                        />
                    </div>
                </TabPanel>
                <TabPanel value='2'>
                    <Create />
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default PendingTask