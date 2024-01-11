import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import 'moment-timezone'
import 'moment/locale/th'
import {
    Avatar,
    Grid,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Divider,
    TextField,
    Switch,
    Select,
    Autocomplete,
    MenuItem,
    Stack,
} from '@mui/material'
import { useUpdateUserMutation, useSuspendUserMutation, useGetUsersQuery } from '../../features/users/usersApiSlice'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { memo } from 'react'


const User = () => {

    // useLocation for stable data :D
    const state = useLocation()?.state;
    const [chillUser, setChillUser] = useState(state ? state : {})
    const [fakeUser, setFakeUser] = useState([]);
    let { id } = useParams();
    const userID = parseInt(id)
    const token = useSelector(selectCurrentToken)



    console.log(`check id : ${id}`);
    // const fetchUser = async (id, token) => {
    //     await axios.get(`http://172.16.10.151:3500/api/users/${id}`).then((res) => setFakeUser(res.data));
    // }
    const [checked, setChecked] = useState(false);

    const handleCheck = async (event) => {

        setChecked(event.target.checked);
        try {
            await suspendUser(user?.UserID);
            toast.success(`Toggle Successfully`)
        } catch (error) {
            console.log(error);
        }
    };
    const { user, suckID } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id],
            suckID: data?.ids,
        })
    });

    const [updateUserData, { isLoading, isSuccess, isError, error },] = useUpdateUserMutation({
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [suspendUser, { userLoading, userSuccess, userError, checkError }] = useSuspendUserMutation({
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [update, setUpdate] = useState({
        UserID: user?.UserID || userID
    });
    console.log(`this is update : ${update?.UserID}`);
    const [suspend, useSuspend] = useState({
        UserID: userID,
        ActiveStatus: user?.ActiveStatus || 0
    })
    const handleChange = (e) => {
        setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        if (isSuccess) {
            setUpdate({
                UserID: user?.UserID || userID,
                FirstName: "",
                LastName: "",
                Email: "",
                Telephone: ""
            })
            toast.success(`บันทึกสำเร็จ`)
        } else if (userSuccess) {
            toast.success('อัพเดตสำเร็จ')
        }
    }, [isSuccess])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await updateUserData(update);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSuspend = async (e) => {
        try {
            e.preventDefault();
            await updateUserData(suspend);
        } catch (error) {
            console.log(error)
        }
    }
    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    const labelStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '12px',
        fontSize: '14px',
        color: '#495057',
        transition: 'top 0.2s, font-size 0.2s',
    };
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 0.5
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <h1 style={{ color: 'darkblue' }}>จัดการผู้ใช้งาน</h1>
                        </div>
                        <Grid container columnGap={3} rowGap={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Card>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Avatar
                                                src={user?.avatar}
                                                sx={{
                                                    height: 80,
                                                    mb: 2,
                                                    width: 80
                                                    
                                                }}
                                            />
                                            <h2>{user?.FirstName}</h2>
                                            <p>{user?.OfficeName}</p>
                                        </Box>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant="text"
                                            color={user?.ActiveStatus === 0 ? 'warning' : 'primary'}
                                            onClick={handleSuspend}
                                        >
                                            {user?.ActiveStatus === 0 ? 'ระงับผู้ใช้' : 'เปิดการใช้งาน'}
                                        </Button>
                                        {/* <Switch
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        /> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={7} lg={7}>
                                <Card sx={{ width: 1 }} >
                                    <CardHeader subheader={<h4>แก้ไขข้อมูล</h4>}
                                        title={<h3>โปรไฟล์</h3>} sx={{ fontFamily: "kanit,sans-serif" }} />
                                    <CardContent sx={{ pt: 0 }} >
                                        <Grid container spacing={3}>
                                            <Grid item md={6} xs={12} lg={6}>
                                                <TextField defaultValue={user?.FirstName || ""} onChange={handleChange} name='FirstName' fullWidth label="ชื่อ" placeholder={user?.FirstName || ''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={6}>
                                                <TextField defaultValue={user?.LastName || ''} onChange={handleChange} name="LastName" fullWidth label="นามสกุล" placeholder={user?.LastName || ''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={7}>
                                                <TextField defaultValue={user?.Email || ''} onChange={handleChange} type="email" name="Email" fullWidth label="อีเมลล์" placeholder={user?.Email || ''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={5}>
                                                <TextField defaultValue={user?.Telephone || ''} onChange={handleChange} type="text" fullWidth name="Telephone" label="เบอร์โทรศัพท์" placeholder={user?.Telephone || ''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={5}>
                                                <TextField defaultValue={user?.PersonID || ''} onChange={handleChange} type="text" fullWidth name="PersonID" label="เลขบัตรประชาชน" placeholder={user?.PersonID || ''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={7}>
                                                {/* <Autocomplete
                                                    disablePortal
                                                    option={''}
                                                    fullWidth 
                                                    renderInput={(params) => <TextField {...params} label="สำนักงาน" />}
                                                /> */}
                                            </Grid>
                                            <Grid item md={12} xs={12} lg={12}>
                                                <Button variant='contained' fullWidth onClick={handleSubmit}>
                                                    ส่งข้อมูล
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
export default User
