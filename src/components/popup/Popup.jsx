import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Controls from '../controls/Controls';
import { styled } from '@mui/material/styles'

const classes = {
    dialogWrapper: {
        padding: '16px',
        position: 'absolute',
        top: '40px'
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
    

    return (
            <Dialog open={openPopup} 
            sx={{
                padding:'16px',
                position:'absolute',
                top:'40px',
            }}
            maxWidth="md"
            >
                <DialogTitle
                    sx={{ paddingRight: '0' }}
                >
                    <div style={{ display: 'flex'}}>
                        <Typography variant='h6' style={{ flexGrow: 1 }}>{title}</Typography>
                        <Button onClick={()=>setOpenPopup(false)}>
                            x
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        // <Dialog open={openPopup} maxWidth="md" sx={{
        //     position: 'absolute', top: '40px', padding: '16px'
        // }}>
        //     <DialogTitle sx={{
        //         paddingRight: '0px'
        //     }}>
        //         <div style={{ display: 'flex' }}>
        //             <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
        //                 {title}
        //             </Typography>
        //             <Controls.ActionButton
        //                 color="secondary"
        //                 onClick={() => { setOpenPopup(false) }}>
        //                 <CloseIcon />
        //             </Controls.ActionButton>
        //         </div>
        //     </DialogTitle>
        //     <DialogContent dividers>
        //         {children}
        //     </DialogContent>
        // </Dialog>
    )
}

export default Popup