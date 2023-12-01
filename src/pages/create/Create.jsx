import React, { useState, useContext } from 'react'
import { Autocomplete, TextField, Select, MenuItem, Button } from '@mui/material'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Create = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    let devices_type = ["คอมพิวเตอร์", "โน๊ตบุ๊ค", "เครื่องพิมพ์", "สแกนเนอร์", "เซิร์ฟเวอร์", "โทรศัพท์ IP", "อินเทอร์เน็ต"]
    const [taskData, setTaskData] = useState({
        CreateUserID: currentUser.UserID,
        InventoryID: '',
        // StickerID:'',
        TrackType: '',
        TrackTopic: '',
        TrackDescription: '',
    })
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setTaskData((prev) => ({ ...prev,[e.target.name]: e.target.value }))
        console.log(taskData);
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
           await axios.post('http://172.16.10.151:8800/api/create/task',taskData);
           alert('sucka create');
           navigate('/create');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1 style={{color:'darkblue'}}>แจ้งซ่อม</h1>
            <Autocomplete
                disablePortal
                options={devices_type}
                sx={{ width: '100%',marginBottom:2,marginTop:'30px' }}
                onChange={(event,newValue) => {
                    setValue(newValue)
                    setTaskData((prev) => ({...prev,TrackType:newValue}))
                }}
                renderInput={(params) => <TextField {...params} label="ประเภท" />}
            />
            <TextField label='เลขพัสดุคุรุภัณฑ์' name='InventoryID' onChange={handleChange} sx={{width:'100%',marginBottom:2}}/>
            {/* <TextField label='เลขสติกเกอร์'/> */}
            <TextField label='เรื่อง' name='TrackTopic' onChange={handleChange} sx={{width:'100%',marginBottom:2}}/>
            <TextField label='รายละเอียด' multiline name='TrackDescription' onChange={handleChange} sx={{width:'100%',marginBottom:2}}/>
            <br />
            <Button
            onClick={handleClick}
            variant='contained'
            color='warning'
            sx={{
                width:'100%'
            }}

            >
                แจ้งซ่อม
            </Button>
            {/* <TextField label='ที่อยู่ - เบอร์โทร ติดต่อกลับ'multiline/> */}
        </div>
    )
}

export default Create