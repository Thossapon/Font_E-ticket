import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGetInventoryQuery, useAddNewTicketMutation } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const Create = () => {
    const navigate = useNavigate();
    const { UserID, Role } = useAuth();
    const token = useSelector(selectCurrentToken)
    // const {
    //     data: tickets,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetInventoryQuery()
    // const options = tickets?.map(item => item.InventoryTypeName).sort();

    const [addNewTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTicketMutation()

    useEffect(() => {
        if (isSuccess) {
            setTaskData({
                token: token,
                UserID: UserID,
                InventoryTypeID: '',
                Sticker: '',
                SerialNo: '',
                TrackTopic: '',
                TrackDescription: '',
                ContactDetail: ''
            })
        }
    }, [])

    const [taskData, setTaskData] = useState({
        token: token,
        UserID: UserID,
        InventoryTypeID: '',
        Sticker: '',
        SerialNo: '',
        TrackTopic: '',
        TrackDescription: '',
        ContactDetail: ''
    })

    const handleChange = (e) => {
        setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await addNewTicket(taskData);
            toast.success('แจ้งซ่อมสำเร็จ')

            navigate('/tracking')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1 style={{ color: 'darkblue', marginBottom: "2rem" }}>แจ้งซ่อม</h1>
            {/* <Autocomplete
                disablePortal
                options={options}
                sx={{ width: '100%', marginBottom: 2, marginTop: '30px' }}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    setValue(newValue)
                    setTaskData((prev) => ({ ...prev, InventoryTypeName: newValue }))
                }}
                renderInput={(params) => <TextField {...params} label="ประเภท" />}
            /> */}
            <TextField label='เลขพัสดุคุรุภัณฑ์' name='InventoryTypeID' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ตัวอย่าง เช่น 7440-009-0002/47.168' />
            <TextField label='เลขสติกเกอร์' name='Sticker' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ตัวอย่าง เช่น 4601-010002' />
            <TextField label='เลข Serial Number' name='SerialNo' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ดูจากตัวเครื่อง' />
            <TextField label='เรื่อง' name='TrackTopic' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />
            <TextField label='รายละเอียด' multiline name='TrackDescription' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />
            <TextField label='ติดต่อกลับ' multiline name='ContactDetail' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />
            <br />
            <Button
                onClick={handleClick}
                variant='contained'
                color='warning'
                sx={{
                    width: '100%'
                }}

            >
                แจ้งซ่อม
            </Button>
            {/* <TextField label='ที่อยู่ - เบอร์โทร ติดต่อกลับ'multiline/> */}
        </div>
    )
}

export default Create