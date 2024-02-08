import { Icon } from '@iconify/react'
import { Avatar, AvatarGroup, Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import FriendComponent from '../view/FriendComponent'
import ContinuesDeveloped from './ContinuesDeveloped'


export default function LibraryBox() {
  return (
    <>
    <ContinuesDeveloped/>
    <Stack spacing={1} bgcolor="background.default" p={2} borderRadius={3} flexWrap="wrap">
        
        
        <Link to="/publications">
            <Typography variant='h6'>
                Investigation of the Structural Behavior of Reinforced Concrete Columns Produced With Natural Perlite 
                under Cyclic Loading Test
            </Typography>
        </Link>
       
        <Stack spacing={1} direction="row" justifyContent="flex-start">
            <Chip label="Company Test Report"/>
            <Typography variant='body2' color="gray">May 2023 - 4th International Symposium of Engineering Applications on</Typography>
        </Stack>
        <Divider sx={{my:2}}/>
        <Stack spacing={1} direction="row" justifyContent="flex-start">
            <FriendComponent name="Ali Çetin"/>
            <FriendComponent name="Berke Kolcak"/>
            <FriendComponent name="Cahit Burdurlu"/>
            <Link><Typography>see more</Typography></Link>
        </Stack>
        <Stack direction="column" spacing={3} pt={2}> 
            <Stack spacing={1}>
                <Typography variant='h6'>Load-displacement files</Typography>
                <Divider/>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{bgcolor:"primary.main",width:"25px",height:"25px"}}><Icon width={20} height={20} icon="vscode-icons:file-type-excel" /></Avatar>
                    <Typography>A1</Typography>
                    <Button size='small' color='success' variant='outlined'>Download</Button>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{bgcolor:"primary.main",width:"25px",height:"25px"}}><Icon width={20} height={20} icon="vscode-icons:file-type-excel" /></Avatar>
                    <Typography>A2</Typography>
                    <Button size='small' color='success' variant='outlined'>Download</Button>
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Typography variant='h6'>Load-displacement files</Typography>
                <Divider/>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{bgcolor:"primary.main",width:"25px",height:"25px"}}><Icon width={20} height={20} icon="vscode-icons:file-type-excel" /></Avatar>
                    <Typography>A1</Typography>
                    <Button size='small' color='success' variant='outlined'>Download</Button>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{bgcolor:"primary.main",width:"25px",height:"25px"}}><Icon width={20} height={20} icon="vscode-icons:file-type-excel" /></Avatar>
                    <Typography>A2</Typography>
                    <Button size='small' color='success' variant='outlined'>Download</Button>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{bgcolor:"primary.main",width:"25px",height:"25px"}}><Icon width={20} height={20} icon="vscode-icons:file-type-excel" /></Avatar>
                    <Typography>A3</Typography>
                    <Button size='small' color='success' variant='outlined'>Download</Button>
                </Stack>
            </Stack>
            

                
         
        
            
            
        </Stack>
    </Stack>
    </>
  )
}
