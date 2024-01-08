import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGetInventoryQuery, useUpdateTicketDataMutation } from '../../features/ticket/ticketApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Modal, Container, Button, Box, Autocomplete, Typography, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Avatar } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import { object, string, number, date, InferType } from 'yup';

const UpdateTicket = ({ task }) => {
    console.log(task);
    const navigate = useNavigate();
    const { UserID, Role, FirstName } = useAuth();
    const token = useSelector(selectCurrentToken)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [taskData, setTaskData] = useState({
        token: token,
        UserID: UserID,
        TrackID: task.TrackID,
        InventoryTypeID: '',
        Sticker: '',
        SerialNo: '',
        TrackTopic: '',
        TrackDescription: '',
        ContactDetail: ''
    })
    let taskSchema = object({
        token: string().required(),
        UserID: number().nullable(),
        TrackID: number().required(),
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
    const style = {
        position: "absolute",
        top: "48%",
        left: "50%",
        height: "90vh",
        transform: "translate(-50%, -50%)",
        width: "60%",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        p: 2,
    };
    const {
        data: tickets,
        Loading,
        Success,
        Error,
        errorDetect
    } = useGetInventoryQuery()
    const options = tickets?.map(item => item.InventoryTypeName);
    const [updateTicketData, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTicketDataMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success('อัพเดตสำเร็จ')
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
            navigate('/tracking', { replace: true })
        }
    }, [isSuccess, navigate])
    // if (isError) toast.error(`Error Creating Ticket `)

    const handleChange = (e) => {
        setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(taskData);
    }
    const handleOnChange = (event, value) => {

        // Find the index of the selected value in the options array
        const selectedIndex = options.indexOf(value);
        // add 1 to current index
        const adjustedIndex = selectedIndex + 1;
        console.log(adjustedIndex);
        setTaskData((prev) => ({ ...prev, InventoryTypeID: adjustedIndex }))
    };
    const handleClick = async (e) => {
        try {
            e.preventDefault();
            await validateForm()
            await updateTicketData(taskData);
        } catch (error) {
            toast.error('อัพเดตไม่สำเร็จ')
            console.log(error)
        }
    }
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ gap: 1 }} color='info'>
                <EditIcon />แก้ไข
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Container sx={{ m: 0, p: 0 }}>
                        <Box sx={style}>
                            <Avatar sx={{ m: 1, bgcolor: "orange" }}>
                                <HandymanIcon color='primary' />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                แก้ไขข้อมูล
                            </Typography>
                            <Box component="form"
                                noValidate
                                sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <Autocomplete
                                            disablePortal
                                            options={options}
                                            sx={{ width: '100' }}
                                            onChange={handleOnChange}
                                            renderInput={(params) => <TextField {...params} label="ประเภท"placeholder={`เลือกอุปกรณ์`} />}
                                            defaultValue={options ? options[task?.InventoryTypeID - 1] : null}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField label='เลขสติกเกอร์' defaultValue={task.Sticker} name='Sticker' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ตัวอย่าง เช่น 4601-010002' />
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField label='เลข Serial Number' defaultValue={task.SerialNO} name='SerialNo' onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} placeholder='ดูจากตัวเครื่อง' />
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField required label='เรื่อง' name='TrackTopic' defaultValue={task.TrackTopic} onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField label='รายละเอียด' multiline name='TrackDescription' defaultValue={task.TrackDescription} onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />

                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField required label='ติดต่อกลับ' multiline name='ContactDetail' defaultValue={task.ContactDetail} onChange={handleChange} sx={{ width: '100%', marginBottom: 2 }} />
                                    </Grid>
                                    <Grid item md={12}>
                                        <Button type="submit" fullWidth variant="contained" onClick={handleClick}>
                                            อัพเดตข้อมูล
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    </Container>
                </Fade>

            </Modal>
            {/* <TextField label='ที่อยู่ - เบอร์โทร ติดต่อกลับ'multiline/> */}
        </div>
    )
}

export default UpdateTicket;