import React, { useState, useEffect, useContext } from 'react'
import DataTable from '../../components/dataTable/DataTable'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import { Box } from '@mui/system';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { selectAllUsers } from '../../features/users/usersApiSlice';
import { useSelector, useStore } from 'react-redux';
const Manage = () => {

  const columns = [
    { field: "UserID", headerName: "ลำดับ", flex: 0.2 },
    { field: "FirstName", headerName: "ชื่อ", flex: 0.2},
    { field: "LastName", headerName: "นามสกุล", flex: 0.2},
    { field: "Telephone", headerName: "เบอร์โทรศัพท์", flex: 0.3},
    { field: "OfficeName", headerName: "สำนักงาน", flex: 0.7 },
    { field: "Role", headerName: "สิทธิ์", flex: 0.1 },
  ]
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
    , } = useGetUsersQuery({
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    })
  const { ids, entities } = users || { ids: [], entities: {} };
  const rows = Object.values(entities).map((user) => ({
    ...user
  }));
  
  return (
    <div>
      <h1 style={{ color: 'darkblue' }}>จัดการผู้ใช้งาน</h1>
      <DataTable
        columns={columns}
        rows={rows}
        slug='manage'
      />
    </div>
  )
}

export default Manage