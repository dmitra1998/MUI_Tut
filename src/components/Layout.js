import React from 'react'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { AddCircleOutline, SubjectOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {format} from 'date-fns'
import Avatar from '@mui/material/Avatar'

const drawerWidth = '240px';

const Layout = ({children}) => {

    const location = useLocation();

    const navigate = useNavigate();

    const menuItems = [
        { text: 'My Notes', icon: <SubjectOutlined color="secondary"/>, path: '/' },
        { text: 'Create Note', icon: <AddCircleOutline color="secondary"/>, path: '/create' }
    ]

  return (
    <div style={{display: 'flex'}}>
        <AppBar
            sx={{width: `calc(100% - ${drawerWidth})`, ml: `${drawerWidth}`}}
            elevation={0}
        >
            <Toolbar>
                <Typography sx={{flexGrow: 1}}>
                    Today is {format(new Date(), 'do MMMM yyyy')}
                </Typography>
                <Typography>
                    Mario
                </Typography>
                <Avatar src="/mario.avif" sx={{marginLeft: '16px'}}/>
            </Toolbar>
        </AppBar>
        <Drawer
            style={{width: drawerWidth}}
            variant="permanent"
            anchor="left"
            classes={{ paper: 'drawerPaper' }}
            sx={{
                '& .drawerPaper': {
                width: drawerWidth,
                },
            }}
        >
            <div>
                <Typography variant="h5" sx={{padding: '16px'}}>
                    Notes
                </Typography>
            </div>

            <List>
                {menuItems.map(item => (
                    <ListItem button key={item.text} onClick={() => navigate(item.path)} style={location.pathname === item.path ? { backgroundColor: '#f4f4f4' } : {}}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>

        </Drawer>
        <div style={{background: '#f9f9f9', width:'100%', padding: '24px'}}>
            <Toolbar />
            {children}
        </div>
    </div>
  )
}

export default Layout
