import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { selectCurrentToken } from '../auth/authSlice';
import './ticket.scss'
import useAuth from '../../hooks/useAuth';
import { useGetTicketQuery } from './ticketApiSlice';
import { useSelector } from 'react-redux';

const TicketList = () => {
  const { UserID, Role, isAdmin, isStaff } = useAuth();
  
  const token = useSelector(selectCurrentToken);
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTicketQuery({ token,UserID, Role })


  // Set Initial Column for MUI Datagrid;
  const columns = [
    { field: "TrackID", headerName: "ลำดับ", flex: 0.5 },
    { field: "TrackTopic", headerName: "หัวข้อ", flex: 1 },
    { field: "CreateName", headerName: "ชื่อผู้แจ้ง", flex: 1 },
    { field: "RecipientName", headerName: "ชื่อผู้รับ", flex: 1 },
    { field: "StatusName", headerName: "	สถานะ", flex: 1 },
  ];


  // get entities to use as rows for MUI Datagrid;
  const { ids, entities } = tickets || { ids: [], entities: {} };
  
  const rows = Object.values(entities).map((ticket) => ({
    id: ticket.TrackID,
    ...ticket,
  }));
  console.log(rows);

  return (
    <div className='products'>
      <div className="info">
        <h1 style={{ color: 'darkblue' }}>ติดตามงาน 📌</h1>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        slug={isAdmin || isStaff ? 'tracking' : 'userTracking'}
      />
    </div>
  )
}
export default TicketList;
