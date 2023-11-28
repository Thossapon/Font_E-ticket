import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Controls from "../../components/controls/Controls";
import { Form } from '../useForm/useForm';
import TextField from '@mui/material/TextField';


const TaskForm = () => {
    return (
        <Form>
            <Grid container   >
                <Grid item xs={6} >
                    <TextField sx={{marginBottom:2}}/>
                    <TextField sx={{marginBottom:2}}/>
                    <TextField sx={{marginBottom:2}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{marginBottom:2}}/>
                    <TextField sx={{marginBottom:2}}/>
                    <TextField sx={{marginBottom:2}}/>
                </Grid>
            </Grid>
        </Form>
    )
}

export default TaskForm;