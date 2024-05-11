import { Icon } from '@iconify/react';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { useParams } from 'react-router-dom';
import FollowButton from '../button/FollowButton';

export default function ProfileUserView({setUserStatus}) {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const prop = useUserContext()
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

    const { token} = useUserContext();

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
                    image: res.data.profileImageUrl,
                    publications: res.data.publications,
                    academicDegree: res.data.academicDegree,
                    university : res.data.university,
                    department: res.data.department
                });
                setUserStatus({
                    id:prop.user.id,
                    status: prop.user.uniqueName == username
                })
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
                    <Avatar  src={`${baseUrl}/api/v1/auth/profileImage/${user.image}`} sx={{ width: '100px', height: '100px' }} />
                )}

                <Stack>
                    <Typography variant="h6">
                        {loading ? <Skeleton width={100} /> : `${user.firstname} ${user.lastname}`}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={200} /> : user.department && user.academicDegree  && `in ${user.department} ${user.academicDegree}`}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={250} /> : user.university  && `at ${user.university}`}
                    </Typography>
                    <Stack direction="row">
                        <Icon icon="mdi:location" />
                        <Typography color="gray">
                            {loading ? <Skeleton width={100} /> : user.country && user.country}
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
                            {user.publications}
                        </Typography>
                    </Stack>

                </Stack>
                {prop.user.uniqueName != username && <FollowButton followingId={user.id} />}
            </Stack>

        </Stack>
    );
}
