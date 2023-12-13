import React, { useState, useEffect, useContext } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbar } from "@mui/x-data-grid";
import { useNavigate, Link } from 'react-router-dom'
import "./datatable.scss";
import { Box, Button } from '@mui/material';
import axios from 'axios';
import './datatable.scss'
import { AuthContext } from '../../context/authContext';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
const DataTable = (props) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const submitUser = { user: currentUser.UserID, userName: currentUser.Username, role: currentUser.Role }

  // for sent trackID 


  const makeApiRequest = (data) => {
    // Make an API request with the selected data
    // For example, if your API endpoint is http://localhost:8800/api, you can use Axios like this:
    axios.post(`http://172.16.10.151:8800/api/task/${props.slugdata}`)
      .then((response) => {
        // Handle the API response
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('API Error:', error);
      });
  };
  const handleAccept = async (params) => {
    try {
      console.log(params);
      await axios.put(`http://172.16.10.151:8800/api/task/accept/${params}`, submitUser, { withCredentials: true })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const handleFinish = async (params) => {
    try {
      console.log(params);
      await axios.put(`http://172.16.10.151:8800/api/task/finish/${params}`,{ withCredentials: true })
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
  const actionColumn = {
    field: 'action',
    headerName: 'การจัดการ',
    flex: 0.5,
    renderCell: (params) => {
      // const handleClick = () => {
      //   makeApiRequest(params.row.TrackID)
      // }
      return (
        <div>
          {props.slug === 'tracking' ?
            (
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* กำหนดค่า state เท่ากับ current row */}
                <Link to={`/tracking/${params.row.TrackID}`} state={params.row}>
                  <Button variant='contained' color='primary'>
                    แก้ไข
                  </Button>
                </Link>
                <Button variant='contained' color='success' state={params.row}>
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
                      แก้ไข
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