import { AppBar, Toolbar, Stack, Button} from '@mui/material'
import ImageEl from '../../components/utils/ImageEl'
import LogoImg from "../../assets/logox.svg";
import LogoutIcon from '@mui/icons-material/ExitToApp' 

function Topbar() {
  return (
    <AppBar position='static'> 
        <Toolbar sx={{
            justifyContent: 'space-between',
        }}>
            <ImageEl sx={{
                height: '35px'
            }} src={LogoImg} alt="Flowboard" />
            <Stack direction="row" spacing={2}>
                <Button variant="contained">Create Board</Button>
                <Button startIcon={<LogoutIcon />} color="inherit" >Logout</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Topbar