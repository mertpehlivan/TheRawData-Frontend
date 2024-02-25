import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../hooks/AuthProvider';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { BackHand, Refresh } from '@mui/icons-material';
import { changeEmail, changeEmailStatus } from '../../services/userService';
import VerificationInput from 'react-verification-input';
import { sendCode, sendEmailCode } from '../../services/emailCodeService';
import { Navigate, useNavigate } from 'react-router-dom';

function NewEmail({ setSuccess, success }) {
  const [text, setText] = useState("")
  const [code, setCode] = useState("")
  const { setUser, user, token, setIsAuthenticated } = useUserContext()
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOkey,setIsOkey] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [page, setPage] = useState(0)

  const againSend = async (email) => {
    setLoading(true)
    await sendEmailCode(token,email);
    setLoading(false)
  }
  const changeEmailFetch = async () => {
    setLoading(true);
    try {
      const res = await changeEmail(token, text, code);
      setLoading(false);
      setErrorMessage("")
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data); // Hatanın tamamını konsola yazdırır
    }
  }
  const changeEmailStatusFetch = async () => {
    setLoading(true);
    try {
      const res = await changeEmailStatus(token, text, code);

      console.log(res.data)
      if (res.data) {
        setPage(0)

      } else {
        await sendEmailCode(token, text)
        setPage(1)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

    }
  }
  const refreshPage = async () =>{
    window.location.reload(false);
  }
  const handleVerifyClick = async () => {
    setLoading(true);
    await sendCode(token, text, code).then(async res => {
      setLoading(false);
      console.log(res.data)
      setSuccess(true)
      await changeEmailFetch()
      setIsOkey(true)
      refreshPage()
      setUser(prev =>({ ...prev, email: text }));

    }).catch(() => {
      setLoading(false);
      setErrorMessage("Code entered is not correct could not be verified");
    }).finally(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    setSuccess(false)
  }, []);

  if (loading) {
    return (
      <Stack justifyContent="center" alignItems="center" p={1}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack>


      {
        page == 0 &&
        <Stack spacing={1}>
          <TextField type='email' autoComplete='false' size='small' label="New E-mail" onChange={(e) => setText(e.target.value)} />
          <Typography color="error">{errorMessage}</Typography>
          <Stack direction="row" spacing={1}>
            <Button startIcon={loading && <CircularProgress />} onClick={changeEmailStatusFetch} disabled={text === ""} variant='contained' color='success'>Change Email</Button>

          </Stack>
        </Stack>
      }
      {
        page == 1 && !isOkey &&

        <Stack spacing={1}>

          <Stack spacing={1} >
            <Typography>Enter the code sent to <b>{text}</b> email address.</Typography>
            <VerificationInput

              value={code}
              onChange={(value) => (setCode(value))}
              classNames={{
                container: "container",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
            />
            <Typography color="error">{errorMessage}</Typography>
            <Stack direction="row" spacing={1}>
              <Button onClick={handleVerifyClick} disabled={code.length < 6} variant='outlined' color='success'>Confirm</Button>
              <Button onClick={()=>againSend(text)} variant='contained' startIcon={<Refresh />} color='error'>send again</Button>
            </Stack>

          </Stack>
        </Stack>
      }
      
    </Stack>
  )
}

export default NewEmail
