import React from 'react'
import { DataGrid} from "@mui/x-data-grid";
import {useNavigate,Link} from 'react-router-dom'
import "./datatable.scss";
import { Button } from '@mui/material';
import axios from 'axios';
import './datatable.scss'
const DataTable = (props) => {

  const navigate = useNavigate();

  const makeApiRequest = (data) => {
    // Make an API request with the selected data
    // For example, if your API endpoint is http://localhost:8800/api, you can use Axios like this:
    axios.post(`http://172.16.10.151:8800/api/task/${props.slug}/${data}`)
      .then((response) => {
        // Handle the API response
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('API Error:', error);
      });
  };
  const actionColumn = {
    field:'action',
    headerName:'การจัดการ',
    flex:1,
    renderCell:(params) => {
      const handleClick = () => {
        makeApiRequest(params.row.TrackID)
      }
      return (
      <div>
          {props.slug === 'tracking' ? (
            <div>

                 {/* send state to ongoing location  */}
                 
                <Link to={`/tracking/${params.row.TrackID}`} state={params.row}>
                  <Button variant='outlined' color='success'>
                    Google
                  </Button>
                </Link>
            </div>
          ): <div>wibbb</div>}
      </div>
      )
    }
  }
  return (
    <div className='dataTable'>
        <DataGrid
        autoHeight={true}
        className="dataGrid"
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        columns={[...props.columns,actionColumn]}
        rows={props.rows}
        getRowId={(row) => row[props.columns[0].field]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        />
    </div>
  )
}

export default DataTable