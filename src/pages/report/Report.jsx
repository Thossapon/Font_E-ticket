import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AuthContext } from '../../context/authContext';
import { Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import './report.scss'
import { Box } from '@mui/system';

const Report = () => {
    const ROLES = { Admin: 1, User: 3 }

    const [data, setData] = useState({});
    const { currentUser } = useContext(AuthContext);
    const { suckUser } = useContext(AuthContext);
    const checkRole = currentUser?.Role === ROLES.Admin;
    const columns = [
        { field: "TrackID", headerName: "ลำดับ" },
        { field: "TrackTopic", headerName: "หัวข้อ", flex: 1 },
        { field: "FirstName", headerName: "ชื่อผู้แจ้ง", flex: 1 },
        {
            field: "CreateDate", headerName: "วันที่แจ้ง", flex: 1,
            valueGetter: (params) => {
                // Assume 'birthDate' is a valid Date object or a string representing a date
                const date = moment(params.row.CreateDate);
                return date.isValid() ? date.format('DD/MM/YYYY') : 'Invalid Date';
            },
        },
    ];
    const classes = {
        root: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#bdbdbd', // Border color
                },
                '&:hover fieldset': {
                    borderColor: '#757575', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#4caf50', // Border color on focus
                },
            },
            '& .MuiInputBase-input': {
                fontFamily: 'Arial, sans-serif', // Set your desired font family
                fontSize: '16px', // Set your desired font size
                padding: '12px', // Set padding
                borderRadius: '10px', // Set border-radius
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
                backgroundColor: '#fff', // Background color
            },
        },
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='products'>
                <h1 style={{ color: 'darkblue', textAlign: 'center' }}>รายงานการแจ้งซ่อม</h1>
                    <Box sx={{backgroundColor:'#e8eaf6',padding:3,marginTop:2,borderRadius:'16px'}} >
                        <Grid container spacing={2}>
                            <Grid item sm={8} xs={6} md={7}>
                                <TextField fullWidth label="ชื่อสต๊าฟ" placeholder='ค้นหาจากชื่อผู้รับงาน' className={classes.root} />
                            </Grid>
                            <Grid item sm={4} xs={6} md={5}>
                                <TextField fullWidth label="ชื่อผู้แจ้ง" placeholder='ค้นหาจากชื่อผู้แจ้ง' />
                            </Grid>
                            <Grid item sx={{ display: "flex", gap: "16px" }}>
                                <DatePicker label='วันที่เริ่มต้น'  sx={{width:'100%'}}/>
                                <DatePicker label='วันที่เริ่มต้น'  sx={{width:'100%'}}/>
                                <Button variant='outlined' sx={{ marginTop: 0.5 }} fullWidth size='large'>ค้นหา</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className="info">
                    </div>
                    <Grid container>
                        <Grid item sm={12} xs = {12} md={8} lg={12}>
                            <DataTable
                                slug="pending"
                                columns={columns}
                                rows={data}
                            />
                        </Grid>
                    </Grid>
            </div>
        </LocalizationProvider>
    )
}

export default Report;