import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AlarmClock from './components/AlarmClock';
import QuestionBank from './components/QuestionBank';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [selectedTest, setSelectedTest] = useState<'GMAT' | 'LSAT' | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            AlarmPrep
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
            Wake up smarter with test prep questions
          </Typography>
          <AlarmClock onTestSelect={setSelectedTest} />
          {selectedTest && <QuestionBank testType={selectedTest} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
