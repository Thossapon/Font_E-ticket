import React from 'react'
import { Button, ThemeProvider, createTheme } from '@mui/material';

const classes = {
    root: {
        minWidth: 0,
        margin: '4px'
    },
    secondary: {
        backgroundColor: '#f8324526',
        '& .MuiButton-label': {
            color: '#f83245',
        }
    },
    primary: {
        backgroundColor: '#42a5f5',
        '& .MuiButton-label': {
            color: '#333996',
        }
    },
}
    const theme = createTheme({
        palette:{
            background:{
                paper:"#fff"
            }
        }
    })
export default function ActionButton(props) {

    const { color, children, onClick } = props;
    // const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Button
                sx={{bgcolor:'background.paper'}}
                className={`${classes.root} ${classes[color]}`}
                onClick={onClick}>
                {children}
            </Button>
        </ThemeProvider>
    )
}