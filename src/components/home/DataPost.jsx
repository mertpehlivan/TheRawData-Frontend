import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Backdrop, Box, Button, Chip, Divider, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';
import FollowButton from '../button/FollowButton';
import PdfPreViewerImage from './PdfPreViewerImage';
import FriendComponent from '../view/FriendComponent';
import BackdropImage from '../view/BackdropImage';
import { Image } from '@mui/icons-material';

function getFirst50Words(text) {
  const words = (text || '').split(' ');
  if (words.length > 30) {
    const first50Words = words.slice(0, 30);
    const result = first50Words.join(' ');
    return result;
  }
  
  return words.join(' ');
  
}

const Spacer = () => <div style={{ flexGrow: 1 }} />;

export default function DataPost({ data }) {
  const fullText = data.comment;
  console.log("image: "+ data.profileImage)
  const summaryText = getFirst50Words(fullText)
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(summaryText);
  const [isToggle, setIsToggle] = useState(false)
  const [imageList, setImageList] = useState([])
  const [selectImageSrc, setSelectImageSrc] = useState("");
  const handleToggle = () => {
    setIsActive(!isActive);
    setText(isActive ? summaryText : fullText);
  };

  return (

    <Box p={2} borderRadius={3} boxShadow={2} bgcolor="white">
      <Stack spacing={2} direction="column" >
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" justifyItems="center" >

          <Stack
            direction="row"
            spacing={1}
            component="a"
            href={`${data.uniqueName}`}
            p={1}
            borderRadius={1}
            sx={{
              textDecoration: "none",
              color: "black",
              ":hover": {
                bgcolor: "#EAFAFA"
              }
            }}

          >
            <Avatar src={`http://localhost:8080/api/v1/auth/profileImage/${data.profileImage}`}/>
            <Stack >
              <Typography variant="subtitle1">{data.fullname}</Typography>
              <Typography color="gray">{data.creationTime}</Typography>
            </Stack>
          </Stack>

          <Spacer />
          <Icon icon="mdi:ellipsis-vertical" style={{ fontSize: '20px' }} />
        </Stack>


        <Typography component="a" href={`/publications/${data.id}`} variant="h6">{data.title}</Typography>

        <Typography>{text} <Link onClick={handleToggle}>see more</Link></Typography>
        <Stack direction="row" spacing={1}>
          <Chip sx={{ color: "white", bgcolor: "primary.main" }} label={data.publicationType} />
        </Stack>
        <Stack direction="row">
          <Stack direction="row" justifyContent="space-between">

            {data.rawdatafiles !=null && data.rawdatafiles.slice(0, 3).map((item, index) => (
              <Stack key={index} p={2} >
                <Typography variant='h6'>{item.title}</Typography>
                <Divider sx={{ mb: 1 }} />
                {item.rawDatas !=null && item.rawDatas.slice(0, 2).map((rawdata, rawIndex) => (
                  <Stack key={rawIndex} spacing={1} mt={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box width={20}>
                        <FileIcon extension={rawdata.rawDataExtension} {...defaultStyles.docx} />
                      </Box>
                      <Typography variant='body2'>{rawdata.title}</Typography>

                      <Tooltip title={<Box
                        width={200}
                        height={200}
                        component="img"
                        src={`http://localhost:8080/api/v1/auth/previewImage/${rawdata.previewImageUrl}`}
                        style={{
                          objectFit: 'scale-down'
                        }}

                      >
                      </Box>} arrow>
                        <IconButton
                          onClick={() => {
                            setIsToggle(prev => !prev);
                            setSelectImageSrc(`${index}${rawIndex}`);
                            setImageList(prevList => [
                              ...prevList,
                              {
                                index: `${index}${rawIndex}`,
                                src: `http://localhost:8080/api/v1/auth/previewImage/${rawdata.previewImageUrl}`
                              }
                            ]);
                          }}
                        >
                          <Image />
                        </IconButton>
                      </Tooltip>

                    </Stack>
                    <BackdropImage setIsToggle={setIsToggle} open={isToggle} src={() => {
                      const selectedImage = imageList.find(data => data.index === selectImageSrc);
                      return selectedImage ? selectedImage.src : null;
                    }} />
                  </Stack>
                ))}
                {item.rawDatas.length > 2 && <Button>More Raw Data ({item.rawDatas.length - 2})</Button>}
              </Stack>
            ))}
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
