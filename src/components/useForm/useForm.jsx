import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl } from '@mui/material/FormControl';
export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}


const PREFIX = 'MuiFormControl';
const classes = {
    root: `${PREFIX}-root`
}

const CustomForm = styled('form')(({ theme }) => ({
    [`&.${classes.root}`]: {
        width: '80%',
        margin: theme.spacing(1),
        height:'auto'
    },
}))
export function Form(props) {

    const { children, ...other } = props;
    return (
        <CustomForm className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </CustomForm>
    )
}

