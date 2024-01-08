import React, { useState, useEffect, useContext } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbar } from "@mui/x-data-grid";
import { useNavigate, Link } from 'react-router-dom'
import "./datatable.scss";
import { Box, Button } from '@mui/material';
import axios from 'axios';
import './datatable.scss'
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import useAuth from '../../hooks/useAuth';
import { useAcceptTicketMutation } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { orange } from '@mui/material/colors';
import Edit from '@mui/icons-material/Edit';
import { Stack } from '@mui/system';
const DataTable = (props) => {

  const color = orange[400];
  const { Username, Role, UserID, FistName } = useAuth();
  const token = useSelector(selectCurrentToken)

  const navigate = useNavigate();
  // const submitUser = { user: currentUser.UserID, userName: currentUser.Username, role: currentUser.Role }
  // for sent trackID 

  const [acceptTicket, {
    acceptLoading,
    acceptSuccess,
    isAcceptError,
    acceptError
  }] = useAcceptTicketMutation()

  const handleAccept = async (params) => {
    try {
      await acceptTicket({ params: params, data: { token, UserID } });
      toast.success(`รับงานสำเร็จ`)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const handleFinish = async (params) => {
    try {
      console.log(params);
      await axios.put(`http://172.16.10.151:8800/api/task/finish/${params}`, { withCredentials: true })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const { data } = {
    dataSet: 'Tracking',
    rowLength: props.rows?.length,
    maxColumns: props.columns.length,
  };
  const defaultSortModel = [
    {
      field: 'UserID', // Specify the field you want to sort by
      sort: 'desc', // Set the sort order to 'desc' for descending
    },
  ];
  const actionColumn = {
    field: 'action',
    headerName: 'การจัดการ',
    flex: 0.5,
    renderCell: (params) => {
      return (
        <div>
          {props.slug === 'tracking' ?
            (
              <div style={{ display: 'flex', gap: '10px' }}>

                {/* กำหนดค่า state เท่ากับ current row */}
                  <Link to={`/tracking/${params.row.TrackID}`} state={params.row}>
                    <Button variant='contained' size="small" color="warning" startIcon={<EditIcon/>}>
                      แก้ไข
                    </Button>
                  </Link>
                  <Button variant='contained' size="small" color='success' state={params.row} startIcon={<DoneIcon/>}>
                    เสร็จงาน
                  </Button>
              </div>
            ) : props.slug === 'pending' ?
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* Staff/Admin กดยอมรับงาน */}
                <Button variant='contained' color='primary' onClick={() => handleAccept(params.row.TrackID)}>
                  รับงาน
                </Button>
                <Button variant='contained' color='success'>
                  แก้ไข
                </Button>
              </div>
              : props.slug === 'userTracking' ? <div style={{ display: 'flex', gap: '10px' }}>
                {/* send state to ongoing location  */}
                <Link to={`/tracking/${params.row.TrackID}`} state={params.row}>
                  <Button variant='contained' color='primary' size='medium'>
                    ติดตาม
                  </Button>
                </Link>
              </div>
                : props.slug === 'manage' ? <div style={{ display: 'flex', gap: '10px' }}>
                  {/* send state to ongoing location  */}
                  <Link to={`/manage/${params.row.UserID}`} state={params.row} >
                    <Button variant='contained' color='primary' size='medium'>
                      แก้ไขผู้ใช้งาน
                    </Button>
                  </Link>
                </div> : false
          }
        </div>
      )
    }
  }

  return (
    <div className='dataTable'>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: '#2e7c67',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "darkblue",
            borderBottom: "none",
            color: 'whitesmoke'
          },


          "& .MuiCheckbox-root": {
            color: `b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `e0e0e0 !important`,
          },
        }}
      >
        <DataGrid
          {...data}
          sortModel={defaultSortModel}
          sx={{ overflowX: 'scroll' }}
          className="dataGrid"
          columns={[...props.columns, actionColumn]}
          rows={props.rows}
          getRowId={(row) => row[props.columns[0].field]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          hideScrollBar={false}
          slots={{
            toolbar: GridToolbar,
          }}

        />
      </Box>
    </div >
  )
}

export default DataTable