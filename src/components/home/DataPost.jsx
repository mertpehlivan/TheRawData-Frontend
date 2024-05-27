import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, Backdrop, Box, Button, Chip, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';
import FollowButton from '../button/FollowButton';
import PdfPreViewerImage from './PdfPreViewerImage';
import FriendComponent from '../view/FriendComponent';
import BackdropImage from '../view/BackdropImage';
import { BookOnline, Download, Image, LinkOff, LinkOutlined, Paid, PictureAsPdf, PictureAsPdfOutlined, Repeat, Replay, Reply, ShoppingCart, Timelapse, Today } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChipIconComponent from '../view/ChipIconComponent';
import { useUserContext } from '../../hooks/AuthProvider';


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

  const baseUrl = process.env.REACT_APP_BASE_URL
  const fullText = data.comment;
  console.log("data: " + data.addOnly)
  const summaryText = getFirst50Words(fullText)
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(summaryText);
  const [isToggle, setIsToggle] = useState(false)
  const [imageList, setImageList] = useState([])
  const [selectImageSrc, setSelectImageSrc] = useState("");
  const { token, user } = useUserContext()
  console.log("data: ", data)
  const handleDownload = (publicationId, name) => {
    axios.get(`${baseUrl}/api/v1/files/pdf/${publicationId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
      .then(response => {
        console.log(response); // Yanıtı konsola yazdır
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Dosya indirilemedi:', error);
      });
  };
  const handleToggle = () => {
    setIsActive(!isActive);
    setText(isActive ? summaryText : fullText);
  };
  function buyukHarfleYazdir(cumle) {
    // Cümlenin kelimelerini boşluklara göre ayır
    if (cumle) {
      var kelimeler = cumle.split(' ');

      // Her bir kelimenin baş harfini büyük yap
      for (var i = 0; i < kelimeler.length; i++) {
        kelimeler[i] = kelimeler[i].charAt(0).toUpperCase() + kelimeler[i].slice(1).toLowerCase();
      }

      // Yeni cümleyi oluştur ve döndür
      var yeniCumle = kelimeler.join(' ');
      return yeniCumle;
    }
    return "null"
  }
  return (
    <>
      <Divider orientation='horizontal' />
      <Stack p={2} borderRadius={3} boxShadow={2} bgcolor="white">



        {data.shareUserId && <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" justifyItems="center" >

          <Stack
            direction="row"
            spacing={1}
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

            {data.shareUserId && <Chip icon={<Repeat color="background.default" />} size='small' sx={{ bgcolor: "primary.main", color: "white", }} label="Re-shared by" />}

            <Stack direction="row" alignItems="center" spacing={0.5} ml={10}>
              <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${data.shareProfileImage}`} />
              <Stack>
                <Link to={`/users/${data.shareUniqueName}`}><Typography variant="subtitle1">{buyukHarfleYazdir(data.shareFullName)}</Typography></Link>
                <Typography color="gray">{data.creationTime}</Typography>
              </Stack>
            </Stack>



          </Stack>

          <Spacer />
          <Icon icon="mdi:ellipsis-vertical" style={{ fontSize: '20px' }} />
        </Stack>}

        <Stack spacing={2} direction="column" borderRadius={2} p={1} boxShadow={data.shareUserId && " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}>

          <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" justifyItems="center" >

            <Stack
              direction="row"
              spacing={1}
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
              <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${data.profileImage}`} />
              <Stack >
                <Link to={`/users/${data.uniqueName}`}><Typography variant="subtitle1">{buyukHarfleYazdir(data.fullname)}</Typography></Link>
                {!data.shareUserId && <Typography color="gray">{data.creationTime}</Typography>}
              </Stack>
            </Stack>

            <Spacer />
            {!data.shareUserId && <Icon icon="mdi:ellipsis-vertical" style={{ fontSize: '20px' }} />}
          </Stack>




          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Stack>
              <Link replace={false} to={`/publications/${data.id}`}> <Typography mb={2} variant='h5'>{data.title} </Typography></Link>
              <Typography >{text} <Link onClick={handleToggle}>see more</Link></Typography>
            </Stack>
            {data.addOnly && <Stack alignItems="end">

              <Stack width={60} height={100} alignItems="center" >



                <Icon icon="ri:file-pdf-2-line" style={{ color: "#091582" }} width="100%" />

                <IconButton onClick={() => handleDownload(data.id, data.pdfFileName)} style={{ color: "#091582" }}>
                  <Download />
                </IconButton>

              </Stack>


            </Stack>}

          </Stack>


          <Stack direction="row" spacing={1}>
            <Chip icon={<ChipIconComponent publicationType={data.publicationType} />} sx={{ color: "white", bgcolor: "primary.main", p: 1 }} label={data.publicationType} />
            {data.year && <Chip sx={{ bgcolor: "primary.main", color: "white", p: 1 }} label={`${data.year}`} />}
            {data.url && <Chip icon={<LinkOutlined color='white' />} sx={{ color: "white", bgcolor: "primary.main", p: 1 }} label={<Link target='_blank' to={data.url} style={{ color: "white" }}>Link of the paper</Link>} />}

            {(((user.id !== data.userId) && user.id != data.shareUserId) || (user.id != data.userId)) && (
              <Stack spacing={1} direction="row" sx={{ width: "100%" }} justifyContent="flex-end" alignItems="flex-end">
                <Button size='small' variant='outlined' color='success' startIcon={<BookOnline />}>Request full-text</Button>
                <Link replace={false} to={`/publications/${data.id}`}>
                  <Button size='small' variant='outlined' startIcon={<ShoppingCart />}>Purchase Data</Button>
                </Link>
              </Stack>
            )}
          </Stack>
          <Stack direction="row">
            <Stack direction="row" justifyContent="space-between">

              {data.rawdatafiles != null && data.rawdatafiles.slice(0, 4).map((item, index) => (
                <Stack key={index} p={2} spacing={1}>

                  <Typography variant='h6'>{item.title}</Typography>
                  <Divider sx={{ mb: 1 }} />
                  {item.rawDatas != null && item.rawDatas.slice(0, 2).map((rawdata, rawIndex) => (
                    <Stack key={rawIndex} spacing={1} mt={1} >
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" >
                        <Box width={20}>
                          <FileIcon extension={rawdata.rawDataExtension} {...defaultStyles.docx} />
                        </Box>
                        <Typography variant='body1'>{rawdata.title}</Typography>

                        <Tooltip title={<Box
                          width={200}
                          height={200}
                          component="img"
                          src={`${baseUrl}/api/v1/auth/previewImage/${rawdata.previewImageUrl}`}
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
                                  src: `${baseUrl}/api/v1/auth/previewImage/${rawdata.previewImageUrl}`
                                }
                              ]);
                            }}
                          >
                            <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" component="img" width={40} height={40} src={`${baseUrl}/api/v1/auth/previewImage/${rawdata.previewImageUrl}`} />
                          </IconButton>
                        </Tooltip>

                      </Stack>
                      <BackdropImage setIsToggle={setIsToggle} open={isToggle} src={() => {
                        const selectedImage = imageList.find(data => data.index === selectImageSrc);
                        return selectedImage ? selectedImage.src : null;
                      }} />
                    </Stack>
                  ))}
                  {item.rawDatas.length > 2 && <Link replace={false} to={`/publications/${data.id}`}> <Button size='small'> More Raw Data ({item.rawDatas.length - 2})</Button></Link>}
                </Stack>
              ))}
            </Stack>
          </Stack>


          <Divider my={2} />

          <Stack direction="row" spacing={1} alignItems="center">
            {data.authors && data.publicationType != "Thesis" ? (

              data.authors.map((author, index) => (
                index <= 2 ?
                  <FriendComponent
                    key={index}
                    imageUrl={author.profileImageName}
                    fullname={`${author.firstName} ${author.lastName}`}
                    uniqueName={author.uniqueName}
                  /> : null
              ))
            ) : (
              <Typography color="textSecondary">No authors available</Typography>
            )}

            <Stack>
              {data.authors ? (
                data.authors.map((author, index) => (
                  index === 3 ?
                    (<Stack key={index} direction="row" spacing={-1}>
                      <FriendComponent
                        key={author.id}
                        imageUrl={author.profileImageName}
                      />
                      <Avatar sx={{ width: "25px", height: "25px", bgcolor: "primary.main" }}>
                        {`+${data.authors.length - 4}`}
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
      </Stack>
    </>
  );
}

