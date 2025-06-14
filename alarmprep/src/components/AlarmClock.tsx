import React, { useState } from 'react';
import { Box, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

interface AlarmClockProps {
  onTestSelect: (test: 'GMAT' | 'LSAT' | null) => void;
}

const AlarmClock: React.FC<AlarmClockProps> = ({ onTestSelect }) => {
  const [alarmTime, setAlarmTime] = useState<Date | null>(new Date());
  const [selectedTest, setSelectedTest] = useState<'GMAT' | 'LSAT' | ''>('');

  const handleTestChange = (event: any) => {
    const value = event.target.value;
    setSelectedTest(value);
    onTestSelect(value || null);
  };

  const handleSetAlarm = () => {
    if (alarmTime && selectedTest) {
      // TODO: Implement alarm setting logic
      console.log(`Alarm set for ${format(alarmTime, 'HH:mm')} with ${selectedTest} questions`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Set Your Alarm
      </Typography>
      <Box sx={{ mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Alarm Time"
            value={alarmTime}
            onChange={(newValue) => setAlarmTime(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Test Type</InputLabel>
        <Select
          value={selectedTest}
          label="Select Test Type"
          onChange={handleTestChange}
        >
          <MenuItem value="GMAT">GMAT</MenuItem>
          <MenuItem value="LSAT">LSAT</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSetAlarm}
        disabled={!alarmTime || !selectedTest}
      >
        Set Alarm
      </Button>
    </Paper>
  );
};

export default AlarmClock; 