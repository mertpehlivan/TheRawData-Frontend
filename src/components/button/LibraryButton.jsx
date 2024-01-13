import { Icon } from '@iconify/react'
import { Badge, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';

export default function LibraryButton() {
  return (
    <Stack direction="row" alignItems="center" spacing={1} mx={2}>
      <Link to="/library">
        <Tooltip title="Author library">
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"

          >
            <Badge badgeContent={0} color="error">
              <BookIcon color='primary' />
            </Badge>
          </IconButton>
        </Tooltip>
      </Link>
    </Stack>
  )
}
