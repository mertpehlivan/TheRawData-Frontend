import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const PercentageProgressBar = ({ percent, text }) => {
  const [progress, setProgress] = useState(0);

  // Yüzde değeri değiştikçe progress bar'ı güncelle
  React.useEffect(() => {
    setProgress(percent);
  }, [percent]);

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {text}
      </Typography>
      
      <LinearProgress variant="determinate" value={progress} sx={{height:10,borderRadius:"10%"}}/>
      <Typography>{`${percent}%`}</Typography>
      
      
    </Stack>
  );
};

export default PercentageProgressBar;
