import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import SearchInput from '../input/SearchInput';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import AlertDialog from '../view/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';

export default function ArticleForm() {
    const [title, setTitle] = useState('');
    const [journalName, setJournalName] = useState('');
    const [volume, setVolume] = useState('');
    const [issue, setIssue] = useState('');
    const [pages, setPages] = useState('');
    const [doi, setDoi] = useState('');
    const [authors, setAuthorIds] = useState([]);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const handlerCancel = () => {
        dispatch(format())
        dispatch(clearData())
        dispatch(clearType())
        dispatch(clearRawData())
    }
    const data = {
        title,
        journalName,
        volume,
        issue,
        pages,
        doi,
        authors,
        comment
    }
    const isFormValid = () => {
        return title.trim() !== '' &&
            journalName.trim() !== '' &&
            volume.trim() !== '' &&
            issue.trim() !== '' &&
            pages.trim() !== '' &&
            doi.trim() !== '' &&
            comment.trim() !== ''

    };
    const handleDelete = (authorId) => {
        setAuthorIds(authors.filter((id) => id !== authorId));
    };
    const handleNext = () => {
        // Kontrol edilecek durumlar buraya eklenebilir
        if (!title || !journalName || !volume || !issue || !pages || !doi || authors.length === 0) {
            // Stateler boşsa bir uyarı göster veya bir işlem gerçekleştirme

        } else {
            // Stateler doluysa veriyi ekleyip sayacı arttır
            dispatch(addData(data));
            dispatch(increase());
        }
    };
    return (
        <Stack borderRadius={5} spacing={2} p={3}>
            <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
                <Icon icon="material-symbols:article" width={50} height={50} />
                <Typography variant='h3'>Article</Typography>
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
            <TextField
                id="outlined-multiline-static"
                label="Abstract"
                multiline
                rows={4}
                onChange={(e) => setComment(e.target.value)}
            />
            <SearchInput setAuthorIds={setAuthorIds} authorIds={authors} />
            <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
                <Button
                    color='error'
                    variant='outlined'
                    onClick={handlerCancel}
                    href='/'
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    disabled={!isFormValid()} // Butonu devre dışı bırak
                    onClick={() => {
                        if (isFormValid()) {
                            dispatch(addData(data));
                            dispatch(increase());
                        } else {
                            // Form geçerli değilse bir uyarı göster veya istediğiniz bir işlemi gerçekleştirin
                            console.log('Lütfen tüm alanları doldurun.');
                        }
                    }}
                >
                    Next
                </Button>
            </Stack>

        </Stack>
    );
}
