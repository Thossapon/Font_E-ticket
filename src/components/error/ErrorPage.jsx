import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Box, Button, Container, SvgIcon} from '@mui/material';
import { Link } from 'react-router-dom';
const ErrorPage = ({message,path}) => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    marginTop:2
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            sx={{
                                mb: 3,
                                textAlign: 'center'
                            }}
                        >
                            <img
                                alt="error"
                                src="illustration_404.svg"
                                style={{
                                    display: 'inline-block',
                                    maxWidth: '100%',
                                    width: 400
                                }}
                            />
                        </Box>
                        <h1>
                           {message}
                        </h1>
                        <p>
                           {path ? message : 'Page Not Found'}
                        </p>
                        <Link to={path ? `/${path}` : `/`} >
                            <Button
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                        {
                                            path ? <EastIcon /> : <WestIcon />
                                        }
                                    </SvgIcon>
                                )}
                                sx={{ marginTop:2,p:2}}
                                variant="contained"
                                size='large'
                                color='warning'
                            >
                                {path ? 'Go to Login Page' : 'Go back to dashboard'}
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </>

    )
}

export default ErrorPage;