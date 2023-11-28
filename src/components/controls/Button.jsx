import React from 'react'
import { Button as MuiButton } from '@mui/material';

const classes = {
    root:{
        margin: "4px"
    },
    label: {
        textTransform: 'none'
    }
}
export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            >
            {text}
        </MuiButton>
    )
}