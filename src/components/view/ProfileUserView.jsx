import { Icon } from '@iconify/react';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { useParams } from 'react-router-dom';
import FollowButton from '../button/FollowButton';

export default function ProfileUserView() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [user, setUser] = useState({
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        country: "",
        followers: "",
        following: ""
    });
    const { username } = useParams();
    const [loading, setLoading] = useState(true);

    const { token } = useUserContext();

    useEffect(() => {
        getUser(token, username)
            .then((res) => {
                console.log(res);
                setUser({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    email: res.data.email,
                    country: res.data.country,
                    followers: res.data.followers,
                    following: res.data.following,
                    id: res.data.id,
                    image: res.data.profileImageUrl
                });
            })
            .catch(() => { })
            .finally(() => {
                setLoading(false);
            });
    }, [token,username]);

    return (
        <Stack direction="row" spacing={2} bgcolor="background.default" borderRadius={3} p={2} justifyContent="space-between">
            <Stack direction="row" spacing={2}>
                {loading ? (
                    <Skeleton variant="circular" width={50} height={50} />
                ) : (
                    <Avatar  src={`${baseUrl}/api/v1/auth/profileImage/${user.image}`} sx={{ width: '50px', height: '50px' }} />
                )}

                <Stack>
                    <Typography variant="h6">
                        {loading ? <Skeleton width={100} /> : `${user.firstname} ${user.lastname}`}
                    </Typography>
                    <Typography color="gray" fontSize="sm">
                        {loading ? <Skeleton width={80} /> : "Professor"}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={200} /> : "in Civil Engineering Professor (Full)"}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={250} /> : "at Erzincan Binali Yildirim University"}
                    </Typography>
                    <Stack direction="row">
                        <Icon icon="mdi:location" />
                        <Typography color="gray">
                            {loading ? <Skeleton width={100} /> : user.country}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack>

            </Stack>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Stack alignItems="center" direction="row" p={2} spacing={1} border="1px solid" borderRadius={2} borderColor="primary.main">
                    <Stack alignItems="center">
                        <Typography>
                            Followers
                        </Typography>
                        <Typography>
                            {user.followers}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <Typography>
                            Following
                        </Typography>
                        <Typography>
                            {user.following}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <Typography>
                            Publications
                        </Typography>
                        <Typography>
                            {user.following}
                        </Typography>
                    </Stack>

                </Stack>
                <FollowButton followingId={user.id} />
            </Stack>

        </Stack>
    );
}
