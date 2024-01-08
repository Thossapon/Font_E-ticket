import React, { useState, useEffect } from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGetInventoryQuery, useAddNewTicketMutation } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { object, string, number } from 'yup';
import toast from 'react-hot-toast';
const Create = () => {
    const navigate = useNavigate();
    const { UserID, Role, FirstName } = useAuth();
    const token = useSelector(selectCurrentToken)
    const {
        data: tickets,
        Loading,
        Success,
        Error,
        errorDetect
    } = useGetInventoryQuery()
    const options = tickets?.map(item => item.InventoryTypeName);
    const [addNewTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTicketMutation()

    const [taskData, setTaskData] = useState({
        token: token,
        UserID: UserID,
        InventoryTypeID: '',
        TrackIDL:'',
        Sticker: '',
        SerialNo: '',
        TrackTopic: '',
        TrackDescription: '',
        ContactDetail: ''
    })
    let taskSchema = object({
        token: string().required(),
        UserID: number().nullable(),
        TrackID: number().nullable(),
        InventoryTypeID: number().required(),
        Sticker: string().ensure(null).nullable(),
        SerialNo: string().ensure(null).nullable(),
        TrackTopic: string().required(),
        TrackDescription: string().ensure(null).nullable(),
        ContactDetail: string().required()
    })
    const validateForm = async () => {
        try {
            // Validate the taskData against the schema
            await taskSchema.validate(taskData, { abortEarly: false });
            console.log('Validation successful');
            // Perform other actions if validation is successful
        } catch (error) {
            toast.error('กรอกข้อมูลไม่ครบ')
            console.error('Validation failed:', error.errors);
            // Handle validation errors (display errors, prevent form submission, etc.)
        }
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success('แจ้งซ่อมสำเร็จ')
            setTaskData({
                token: token,
                InventoryTypeID: '',
                Sticker: '',
                SerialNo: '',
                TrackTopic: '',
                TrackDescription: '',
                ContactDetail: ''
            })
            navigate('/tracking')
        }
    }, [isSuccess])


    const handleChange = (e) => {
        setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(taskData);
    }
    const handleOnChange = (event, value) => {
        // Find the index of the selected value in the options array
        const selectedIndex = options.indexOf(value);
        const adjustedIndex = selectedIndex + 1;
        console.log(adjustedIndex);
        setTaskData((prev) => ({ ...prev, InventoryTypeID: adjustedIndex }))
    };
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await validateForm()
            await addNewTicket(taskData);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1 style={{ color: 'darkblue', marginBottom: "2rem" }}>แจ้งซ่อม</h1>
            <Autocomplete
                disablePortal
                options={options}
                sx={{ width: '100%', marginBottom: 2, marginTop: '30px' }}
                onChange={handleOnChange}
                // onChange={(event, newValue) => {
                //     // console.log(newValue);
                //     // setTaskData((prev) => ({ ...prev, InventoryTypeName: newValue }))
                // }}
                renderInput={(params) => <TextField {...params} label="ประเภท" />}
            />
            {/* <TextField label='เลขพัสดุคุรุภัณฑ์' name='InventoryTypeID' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ตัวอย่าง เช่น 7440-009-0002/47.168' /> */}
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