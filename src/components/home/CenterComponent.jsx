import React, { useEffect } from 'react'
import DataPost from './DataPost'
import { Stack } from '@mui/material'
import { getFirstPost } from '../../services/post/postService';
import { useUserContext } from '../../hooks/AuthProvider';
import ExploreComponent from './ExploreComponent';
export default function CenterComponent({activeItem}) {
    const {token} = useUserContext();

    if (activeItem === "Explore") {
        
        return(
            <Stack spacing={1}>
                <ExploreComponent/>
            </Stack>
        )
    }else if (activeItem === "Followed Channels") {
        return(
            <Stack spacing={1}>
                <DataPost />
                <DataPost />
            </Stack>
        )
        
    } else {
        return(
            <Stack spacing={1}>
                <DataPost />
                <DataPost />
                <DataPost />
            </Stack>
        )
    }

}
