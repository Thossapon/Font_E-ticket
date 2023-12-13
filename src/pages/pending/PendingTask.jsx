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
const PendingTask = () => {
    const ROLES = { Admin: 1, User: 3 }

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [data, setData] = useState({});
    const { currentUser } = useContext(AuthContext);
    const checkRole = currentUser?.Role === ROLES.Admin;
    const fetchPending = async () => {
        await axios.get('http://172.16.10.151:8800/api/task/pending', { withCredentials: true })
            .then((res) => setData(res.data))
            .then(console.log(data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchPending()
    }, [currentUser])
    const columns = [
        { field: "TrackID", headerName: "ลำดับ", flex: 0.1 },
        { field: "TrackTopic", headerName: "หัวข้อ", flex: 0.7 },
        { field: "FirstName", headerName: "ชื่อผู้แจ้ง", flex: 0.3 },
        {
            field: "CreateDate", headerName: "วันที่แจ้ง", flex: 0.3,
            valueGetter: (params) => {
                // Assume 'birthDate' is a valid Date object or a string representing a date
                const date = moment(params.row.CreateDate);
                return date.isValid() ? date.format('DD/MM/YYYY') : 'Invalid Date';
            },
        },

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
                            rows={data}
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