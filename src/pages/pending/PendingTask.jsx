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
import { useGetPendingQuery, useAcceptTicketMutation } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
const PendingTask = () => {

    const token = useSelector(selectCurrentToken);
    const {
        data: tickets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPendingQuery({ token }, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })



    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    useEffect(() => {
    }, [])

    const options = tickets ? tickets : []

    const columns = [
        { field: "TrackID", headerName: "ลำดับ", flex: 0.1 },
        { field: "TrackTopic", headerName: "หัวข้อ", flex: 0.5 },
        { field: "CreateName", headerName: "ชื่อผู้แจ้ง", flex: 0.3 },
        { field: "CreateDate", headerName: "วันที่สร้าง", flex: 0.3 },
        { field: "StatusName", headerName: "สถานะ", flex: 0.3 },
    ];

    return (
        <Box>
            <TabContext value={value}>
                <Box>
                    <TabList
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="Ticket List"
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