import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Chip, Divider, Link, Stack, Typography } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';
import FollowButton from '../button/FollowButton';
import PdfPreViewerImage from '../home/PdfPreViewerImage';
import FriendComponent from '../view/FriendComponent';

function getFirst50Words(text) {
  const words = text.split(/\s+/);
  const first50Words = words.slice(0, 50);
  const result = first50Words.join(' ');
  return result;
}

const Spacer = () => <div style={{ flexGrow: 1 }} />;

export default function ProfileDataPost({ data }) {
  const fullText = data.publicationResponse.comment;
  const summaryText = getFirst50Words(fullText);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(summaryText);
    console.log(data)
  const handleToggle = () => {
    setIsActive(!isActive);
    setText(isActive ? summaryText : fullText);
  };

  return (
    <Box p={2} borderRadius={3} boxShadow={2} bgcolor="white" mb={3}>
      <Stack spacing={2} direction="column" >
        <Box>
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" justifyItems="center">
            <Stack direction="row" spacing={1}>
              <Avatar />
              <Stack >
                <Typography variant="subtitle1">{data.publicationResponse.fullname}</Typography>
                <Typography color="gray">{data.publicationResponse.creationTime}</Typography>
              </Stack>
            </Stack>

            <FollowButton followingId={data.publicationResponse.userId} />
            <Spacer />
            <Icon icon="mdi:ellipsis-vertical" style={{ fontSize: '20px' }} />
          </Stack>
        </Box>

        <Link to="/publications">
          <Typography variant="h6">{data.title}</Typography>
        </Link>

        <Typography>{text} <Link onClick={handleToggle}>see more</Link></Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="start" width="100%">
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <Chip label={data.publicationType} />
            </Stack>

            <Stack p={2}>
              <Typography variant='h6'>{data.rawdatafile.title}</Typography>
              <Divider sx={{ mb: 1 }} />
              {data.rawdatafile.rawDatas.map((rawdata, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <Box width={20}>
                    <FileIcon extension={rawdata.rawDataExtension} {...defaultStyles.docx} />
                  </Box>
                  <Typography variant='body2'>{rawdata.title}</Typography>
                </Stack>
              ))}

              {parseInt(data.rawdatafile.filesLenght - 1 === 0) ? ("") : (
                <Button variant='text'>more files ({data.rawdatafile.filesLenght - 1})</Button>
              )}
            </Stack>
          </Stack>

          <Stack justifyContent="center">
            <PdfPreViewerImage />
          </Stack>
        </Stack>

        <Divider my={2} />

        <Stack direction="row" spacing={1} alignItems="center">
          {data.authors ? (
            data.authors.map((author, index) => (
              index <= 2 ?
                <FriendComponent
                  key={author.id}
                  imageUrl={author.profileImageUrl}
                  fullname={`${author.firstname} ${author.lastname}`}
                /> : null
            ))
          ) : (
            <Typography color="textSecondary">No authors available</Typography>
          )}

          <Stack>
            {data.authors ? (
              data.authors.map((author, index) => (
                index === 2 ?
                  (<Stack key={index} direction="row" spacing={-1}>
                    <FriendComponent
                      key={author.id}
                      imageUrl={author.profileImageUrl}
                    />
                    <Avatar sx={{ width: "25px", height: "25px", bgcolor: "primary.main" }}>
                      {`+${data.authors.length - 3}`}
                    </Avatar>
                  </Stack>
                  ) : null
              ))
            ) : (
              <Typography color="textSecondary">No authors available</Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
