import { Typography, Box, useTheme } from "@mui/material";


const Header = ({ title, subtitle }) => {

    return (
        <Box>
            <Typography
                variant="h2"
                color='#141414'
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
           <Typography>
                {subtitle}
            </Typography> 
        </Box>
    )

}

export default Header;