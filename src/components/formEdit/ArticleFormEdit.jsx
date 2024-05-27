import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import SearchInput from '../input/SearchInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography } from '@mui/material';
import AlertDialog from '../view/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { getArticle, updateArticle } from '../../services/newData/articleService';
import { useUserContext } from '../../hooks/AuthProvider';
import SearchInputV2 from '../input/SearchInputV2';
import { Save } from '@mui/icons-material';
import { update } from '../../store/userSlice';
import { Icon } from '@iconify/react';
import PdfForm from './PdfForm';


export default function ArticleFormEdit() {
    const [title, setTitle] = useState('');
    const [journalName, setJournalName] = useState('');
    const [volume, setVolume] = useState('');
    const [issue, setIssue] = useState('');
    const [pages, setPages] = useState('');
    const [doi, setDoi] = useState('');
    const [authors, setAuthorIds] = useState([]);
    const [comment, setComment] = useState('');
    const { token } = useUserContext()
    const { publicationId } = useParams();
    const [loading, setLoading] = useState(false)
    const [year, setYear] = useState()
    const [url, setUrl] = useState('');
    const [errorUrl, setErrorUrl] = useState('');
    const [data,setData]=useState()
    const [change,setChange] = useState(false)
    const [only,setOnly] = useState(false)

    const [pdf, setPdf] = useState({
        pdfStatus: true,
        addOnly: true,
    })
    const [fileUrl, setFileUrl] = useState(null)
    const [fileEx, setFileEx] = useState("")

    useEffect(() => {
        const fetch = async () => {
            try {

                setLoading(true)
                const response = await getArticle(token, publicationId)
                const data = response.data;
                setData(data)
                console.log(data)
                setLoading(false)
                setTitle(data.title)
                setJournalName(data.journalName)
                setVolume(data.volume)
                setIssue(data.issue)
                setComment(data.comment)
                setPages(data.pages)
                setDoi(data.doi)
                setUrl(data.url)
                setYear(data.year)
                setOnly(data.only)
              
               

            } catch (error) {
                console.log(error)
            }

        }
        fetch()
    }, []);

    function validateUrl(url) {
        const urlRegex = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
            'i'
        );
        return urlRegex.test(url)
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setErrorUrl(validateUrl(e.target.value) ? null : 'Please enter a valid URL');
    };
    const handlerUpdate = async () => {
        try {
            const data = {
                title,
                journalName,
                volume,
                issue,
                pages,
                doi,
                authors,
                comment,
                year,
                url,
                pdf,
                fileEx,
                fileUrl,
                change

            }
            const response = await updateArticle(data, token, publicationId)
            window.location.href = window.location.href;
           
        } catch (error) {
            console.log(error)
        }

    }




    const handleDelete = (authorId) => {
        setAuthorIds(authors.filter((id) => id !== authorId));
    };
    if (loading) {
        return (<Typography>Loading...</Typography>)
    }

    return (
        <Stack borderRadius={5} spacing={2} p={3}>
            <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
                <Icon icon="material-symbols:article" color='#091582' width={50} height={50} />
                <Typography color="primary.main" variant='h3'>Article</Typography>
            </Stack>
            <Stack mx={4} spacing={5} mt={2} direction='row'>
                <TextField
                    size='small'
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    size='small'
                    fullWidth
                    label="Journal Name"
                    value={journalName}
                    onChange={(e) => setJournalName(e.target.value)}
                />
            </Stack>
            <Stack mx={4} spacing={5} mt={2} direction='row'>
                <TextField
                    size='small'
                    label="Volume"
                    fullWidth
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <TextField
                    size='small'
                    fullWidth
                    label="Issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                />
            </Stack>
            <Stack mx={4} spacing={5} mt={2} direction='row'>
                <TextField
                    size='small'
                    label="Pages"
                    fullWidth
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                />
                <TextField
                    size='small'
                    fullWidth
                    label="DOI"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                />
            </Stack>
            <Stack mx={4} spacing={5} mt={2} direction='row'>
                <TextField
                    size='small'
                    label="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    type="number"
                    InputProps={{
                        inputProps: {
                            min: 1000,
                            max: 9999,
                        },
                    }}
                />
                <TextField
                    size='small'
                    fullWidth
                    type="url"
                    label="Link of the paper"
                    value={url}
                    onChange={handleUrlChange}
                    error={!!errorUrl}
                    helperText={errorUrl}
                />

            </Stack>
            <TextField
                id="outlined-multiline-static"
                label="Abstract"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <SearchInputV2 setAuthorIds={setAuthorIds} />
            <PdfForm setChange={setChange} only={only} pdf={pdf} setFileEx={setFileEx} setFileUrl={setFileUrl} setPdf={setPdf} />
            <Button disabled={!(title.trim() !== '' &&
                journalName.trim() !== '' &&

                pages.trim() !== '' &&
                comment.trim() !== '')
            } startIcon={<Save />} variant='contained' onClick={handlerUpdate}>Save</Button>
        </Stack>


    );
}
