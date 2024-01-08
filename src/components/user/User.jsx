import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/th'
import {
    Avatar,
    Typography,
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
    Stack,
    Autocomplete,
} from '@mui/material'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation, useSuspendUserMutation } from '../../features/users/usersApiSlice'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const User = () => {



    // useLocation for stable data :D
    const state = useLocation()?.state;
    const [user, setUser] = useState(state ? state : {})
    const [checked, setChecked] = useState(false);
    const handleCheck = async (event) => {
        setChecked(event.target.checked);
        try {
            await suspendUser(user.UserID);
            toast.success(`Toggle Successfully`)
        } catch (error) {
            console.log(error);
        }
    };
    const [updateUserData, { isLoading, isSuccess, isError, error },] = useUpdateUserMutation({
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [suspendUser, { userLoading, userSuccess, userError, checkError }] = useSuspendUserMutation({})
    const [update, setUpdate] = useState({
        UserID: user.UserID
    });
    const handleChange = (e) => {
        setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            toast.success('อัพเดตสำเร็จ')
            setUpdate({
                UserID: user.UserID,
                FirstName: '',
                LastName: '',
                Email: '',
                Telephone: ''
            })
            navigate(`/manage`)
        } else if (userSuccess) {
            toast.success('อัพเดตสำเร็จ')
            navigate(`/manage`)
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
            await suspendUser(user.UserID);
            toast.success(`Update Successfully`)
        } catch (error) {
        }
    }
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
                                                src={user.avatar}
                                                sx={{
                                                    height: 80,
                                                    mb: 2,
                                                    width: 80
                                                }}
                                            />
                                            <h2>{user.FirstName}</h2>
                                            <p>สำนักงานอัยการภาค 8</p>
                                            <p style={{ color: 'grey' }}>นักเจ้าคอมพิวเตอร์</p>
                                        </Box>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant="text"
                                            color={user.ActiveStatus === 0 ? 'warning' : 'primary'}
                                            onClick={handleSuspend}
                                        >
                                            {user.ActiveStatus === 0 ? 'ระงับผู้ใช้' : 'เปิดการใช้งาน'}
                                        </Button>
                                        <Switch
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
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
                                                <TextField defaultValue={user.FirstName} onChange={handleChange} name='FirstName' fullWidth label="ชื่อ" placeholder={user.FirstName} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={6}>
                                                <TextField defaultValue={user.LastName} onChange={handleChange} name="LastName" fullWidth label="นามสกุล" placeholder={user.LastName} />
                                            </Grid>
                                            {/* <Grid item md={6} xs={12} lg={12}>
                                                <TextField defaultValue={user.PersonID} onChange={handleChange} fullWidth label="เลขบัตรประชาชน" placeholder={''} />
                                            </Grid> */}
                                            {/* <Grid item md={6} xs={12} lg={7}>
                                                <Autocomplete
                                                    disablePortal
                                                    options={classicHipHopAlbums}
                                                    sx={{ width: '100%' }}
                                                    onChange={``}
                                                    // onChange={(event, newValue) => {
                                                    //     // console.log(newValue);
                                                    //     // setTaskData((prev) => ({ ...prev, InventoryTypeName: newValue }))
                                                    // }}
                                                    renderInput={(params) => <TextField {...params} label="สำนักงาน" />}
                                                />
                                            </Grid> */}
                                            <Grid item md={6} xs={12} lg={7}>
                                                <TextField defaultValue={user.Email} onChange={handleChange} type="email" name="Email" fullWidth label="อีเมลล์" placeholder={''} />
                                            </Grid>
                                            <Grid item md={6} xs={12} lg={5}>
                                                <TextField defaultValue={user.Telephone} onChange={handleChange} type="text" fullWidth name="Telephone" label="เบอร์โทรศัพท์" placeholder={user.Telephone} />
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



            {/* <div>
                <Grid container>
                    <Grid item>
                        <TextField
                        defaultValue={user.Username}
                        onChange={handleChange}
                        name='Username'
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        defaultValue={user.FirstName}
                        onChange={handleChange}
                        name='FirstName'
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        defaultValue={user.LastName}
                        onChange={handleChange}
                        name='LastName'
                        />
                    </Grid>
                </Grid>
            </div> */}

        </>

    )
}

export default User