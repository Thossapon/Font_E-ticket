import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { selectCurrentToken } from '../auth/authSlice';
import './ticket.scss'
import useAuth from '../../hooks/useAuth';
import { useGetTicketQuery } from './ticketApiSlice';
import { useSelector } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';
const TicketList = () => {
  const { UserID, Role, isAdmin, isStaff } = useAuth();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const token = useSelector(selectCurrentToken);
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTicketQuery({ token, UserID, Role }, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })


  // Set Initial Column for MUI Datagrid;
  const columns = [
    { field: "TrackID", headerName: "ลำดับ", flex: 0.1 },
    { field: "TrackTopic", headerName: "หัวข้อ", flex: 0.5 },
    { field: "CreateName", headerName: "ชื่อผู้แจ้ง", flex: 0.3 },
    { field: "RecipientName", headerName: "ชื่อผู้รับ", flex: 0.4 },
    { field: "StatusName", headerName: "	สถานะ", flex: 0.3 },
  ];

  // get entities to use as rows for MUI Datagrid;
  const { ids, entities } = tickets || { ids: [], entities: {} };
  const rows = Object.values(entities).map((ticket) => ({
    id: ticket.TrackID,
    ...ticket,
  }));

  return (
    <div className='products'>
      <div className="info">
        <h1 style={{ color: 'darkblue' }}>ติดตามงาน 📌</h1>
      </div>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="some might say"
          >
            <Tab value='1' label='กำลังดำเนินการ' />
            <Tab value='2' label='งานเสร็จแล้ว' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <DataTable
            columns={columns}
            rows={rows}
            slug={isAdmin || isStaff ? 'tracking' : 'userTracking'}
          />
        </TabPanel>
        <TabPanel value='2'>
          <p>งานเสร็จแล้ว</p>
        </TabPanel>
      </TabContext>
    </div>
  )
}
export default TicketList;
