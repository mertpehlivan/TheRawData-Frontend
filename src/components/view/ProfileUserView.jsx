import { Icon } from '@iconify/react';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { useParams } from 'react-router-dom';
import FollowButton from '../button/FollowButton';

export default function ProfileUserView({ setUserStatus }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const prop = useUserContext();
    const [user, setUser] = useState({
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        country: "",
        followers: "",
        following: "",
        publications: ""
    });
    const [loading, setLoading] = useState(true);

    const { username } = useParams();
    const { token } = useUserContext();

    useEffect(() => {
        setLoading(true); // İstek başlatıldığında loading durumunu true olarak ayarla
        getUser(token, username)
            .then((res) => {
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
                    university: res.data.university,
                    department: res.data.department
                });
                setUserStatus({
                    id: res.data.id,
                    status: prop.user.uniqueName === username
                });
            })
            .catch(() => { })
            .finally(() => {
                setLoading(false); // İstek tamamlandığında loading durumunu false olarak ayarla
            });
    }, [token, username]);
    const sliceTre = (string) => {
        if (string) {
            const parts = string.split("-");
            if (parts.length > 1) {
                const result = parts[1].toLowerCase();
                console.log(result);
                return result;
            }
        }
        return "";
    }
    return (
        <Stack direction="row" spacing={2} bgcolor="background.default" borderRadius={3} p={2} justifyContent="space-between">
            <Stack direction="row" spacing={2}>
                {loading ? (
                    <Skeleton variant="circular" width={50} height={50} />
                ) : (
                    <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${user.image}`} sx={{ width: '100px', height: '100px' }} />
                )}

                <Stack>
                    <Typography variant="h6">
                        {loading ? <Skeleton width={100} /> : `${user.firstname} ${user.lastname}`}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={200} /> : user.department && user.academicDegree && `in ${user.department} ${user.academicDegree}`}
                    </Typography>
                    <Typography color="gray">
                        {loading ? <Skeleton width={250} /> : user.university && `at ${user.university}`}
                    </Typography>
                    <Stack direction="row">
                        <Stack direction="row" spacing={1} alignItems="center">
                            {loading ? <Skeleton width={15} /> : <img
                                loading="lazy"
                                width="20"
                                height="15"
                                srcSet={`https://flagcdn.com/w40/${sliceTre(user.country).toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${sliceTre(user.country).toLowerCase()}.png`}
                                alt=""
                            />}
                            {loading ? <Skeleton width={100} /> : user.country && <Typography> {user.country}</Typography>}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack>
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                    <Stack alignItems="center" direction="row" p={2} spacing={1} border="1px solid" borderRadius={2} borderColor="primary.main">
                        <Stack alignItems="center">
                            <Typography>
                                Followers
                            </Typography>
                            <Typography>
                                {loading ? <Skeleton width={50} /> : user.followers}
                            </Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography>
                                Following
                            </Typography>
                            <Typography>
                                {loading ? <Skeleton width={50} /> : user.following}
                            </Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography>
                                Publications
                            </Typography>
                            <Typography>
                                {loading ? <Skeleton width={50} /> : user.publications}
                            </Typography>
                        </Stack>
                    </Stack>
                    {(prop.user.uniqueName !== username && !loading) && <FollowButton followingId={user.id} />}
                </Stack>
            </Stack>

        </Stack>
    );
}
