
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {BiErrorCircle} from "react-icons/bi"

const drawerWidth = 240;

function UserList(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [userData, setUserData] = useState([])
    const [user, setuser] = useState([])
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: "" })


    useEffect(() => {
        setLoading(true)
        axios("https://602e7c2c4410730017c50b9d.mockapi.io/users").then((res) => {
            setUserData(res.data)
            setLoading(false)
        }).catch((err) => {
          
            setLoading(false)
            setError({ status: true, message: err.message })

        })
    }, [])
   
    const handleClick = (e) => {
        setuser(e)
        setMobileOpen(!mobileOpen);
     
    }
    if (Loading) {
        return (
            <div className='d-flex flex-column gap-2 justify-content-center vh-100 align-items-center'>
                <FadeLoader color="#4066ff" />
                <span> loading...</span>
            </div>
        )
    }
    if (error.status) {
        return (
            <div className='d-flex flex-column gap-2 justify-content-center vh-100 align-items-center'>
                <BiErrorCircle color="#4066ff" size={60} />
                <span>{error.message}</span>
            </div>
        )
    }


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);

    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar >
                <Typography >
                    Users
                </Typography>
                </Toolbar>
            <Divider />

            {/* user list */}
            <List>
                {userData.map((data, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemButton className='d-flex flex-row gap-2 ' style={{ background: `${user == data ? "#0070FF" : ""}` }} onClick={() => handleClick(data)}>

                            <ListItemIcon>
                                <img src={data.avatar} alt="" className='rounded-circle' width={70} height={70} />
                            </ListItemIcon>
                            <ListItemText>
                                {data?.profile?.firstName} {data?.profile?.lastName}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </div>
    );
    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        User deatils
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {user.length !== 0 ?
                    <div className=' w-100 vh-100 row justify-content-md-center  px-5  align-items-center' >
                        <div className='border h-50 w-50 border-black p-2 '>
                            <img src={user.avatar} className='rounded w-100 h-100' alt="No image" />
                        </div>
                        <div className=' d-flex fs-5 flex-column gap-4'>
                            <Typography className='fs-4 fw-bold'>
                                <label >Name: </label>
                                <span className=''> {user?.profile?.firstName} {user?.profile?.lastName}</span>
                            </Typography>
                            <Typography>
                                <label className='fw-semibold'>Username: </label>

                                <span> {user?.profile?.username}</span>
                            </Typography>
                            <Typography>
                                <label className='fw-semibold'>Bio: </label>

                                <span> {user?.Bio}</span>
                            </Typography>
                            <Typography>
                                <label className='fw-semibold'>Job Title: </label>

                                <span> {user?.jobTitle}</span>
                            </Typography>
                            <Typography>
                                <label className='fw-semibold'>Email:</label>
                                <span className=''> {user?.profile?.email}</span>
                            </Typography>
                        </div>

                    </div>
                    : <div className='d-flex justify-content-center w-100 vh-100 align-items-center'>
                        <span>Select one User</span>
                    </div>}


            </Box>
        </Box>
    );
}

UserList.propTypes = {

    window: PropTypes.func,
};

export default UserList;