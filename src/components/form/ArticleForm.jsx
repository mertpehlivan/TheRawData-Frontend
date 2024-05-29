import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import SearchInput from '../input/SearchInput';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography } from '@mui/material';
import AlertDialog from '../view/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import Dropzone from 'react-dropzone';
import { PictureAsPdf, Visibility, VisibilityOff } from '@mui/icons-material';
import PdfForm from './PdfForm'
import SearchInputV2 from '../input/SearchInputV2';

export default function ArticleForm() {
    const [title, setTitle] = useState('');
    const [journalName, setJournalName] = useState('');
    const [volume, setVolume] = useState('');
    const [issue, setIssue] = useState('');
    const [pages, setPages] = useState('');
    const [doi, setDoi] = useState('');
    const [authors, setAuthorIds] = useState([]);
    const [comment, setComment] = useState('');
    const [year, setYear] = useState('');
    const [url, setUrl] = useState('');
    const [errorUrl, setErrorUrl] = useState('');
    const history = useSelector((state) => state.data.value);
    const [pdf, setPdf] = useState({
        pdfStatus: true,
        addOnly: true,
    });
    const [fileUrl, setFileUrl] = useState(null);
    const [fileEx, setFileEx] = useState("");

    useEffect(() => {
        if (history) {
            setTitle(history.title || '');
            setJournalName(history.journalName || '');
            setVolume(history.volume || '');
            setIssue(history.issue || '');
            setPages(history.pages || '');
            setDoi(history.doi || '');
            setComment(history.comment || '');
            setYear(history.year || '');
            setUrl(history.url || '');
            setPdf({
                pdfStatus: history.pdfStatus !== undefined ? history.pdfStatus : true,
                addOnly: history.addOnly !== undefined ? history.addOnly : true
            });
            setFileUrl(history.fileUrl || null);
            setFileEx(history.fileEx || "");
        }
    }, [history]);

    const dispatch = useDispatch();
    
    const handlerCancel = () => {
        dispatch(format());
        dispatch(clearData());
        dispatch(clearType());
        dispatch(clearRawData());
    };

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
        fileUrl
    };

    const isFormValid = () => {
        return title.trim() !== '' &&
            journalName.trim() !== '' &&
            pages.trim() !== '' &&
            comment.trim() !== '' &&
            (pdf.pdfStatus ? (fileUrl != null && fileEx === 'pdf') : true);
    };

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
        return urlRegex.test(url);
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setErrorUrl(validateUrl(e.target.value) ? null : 'Please enter a valid URL');
    };

    const handleDelete = (authorId) => {
        setAuthorIds(authors.filter((id) => id !== authorId));
    };

    const handleNext = () => {
        if (isFormValid()) {
            dispatch(addData(data));
            dispatch(increase());
        } else {
            console.log('Lütfen tüm alanları doldurun.');
        }
    };

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
                value={comment}
                id="outlined-multiline-static"
                label="Abstract"
                multiline
                rows={4}
                onChange={(e) => setComment(e.target.value)}
            />
            <SearchInputV2 setAuthorIds={setAuthorIds} />
            <PdfForm pdf={pdf} setFileEx={setFileEx} setFileUrl={setFileUrl} setPdf={setPdf} />
            <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
                <Link to='/'>
                    <Button
                        color='error'
                        variant='outlined'
                        onClick={handlerCancel}
                    >
                        Cancel
                    </Button>
                </Link>
                <Button
                    variant='contained'
                    disabled={!isFormValid()}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Stack>
        </Stack>
    );
}
