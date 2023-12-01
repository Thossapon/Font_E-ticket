import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Button } from '@mui/material';
import moment from 'moment';
import './pendingtask.scss'
const PendingTask = () => {
    const ROLES = { Admin: 1, User: 3 }

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
    return (
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
    )
}

export default PendingTask