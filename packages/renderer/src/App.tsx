import React, { useState, createContext, useMemo } from 'react';
import {
  AppBar,
  Box,
  Container,
  createTheme,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  ThemeProvider,
} from '@mui/material';
import { Brightness4, Brightness7, Close, Done } from '@mui/icons-material';

import {
  firstRemindear,
  secondRemindear,
  thirdRemindear
} from './remindear';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  
  const [firstRemindearField, setFirstRemindearField] = useState(10);
  const [secondRemindearField, setSecondRemindearField] = useState(20);
  const [thirdRemindearField, setThirdRemindearField] = useState(30);

  const [firstTimer, setFirstTimer] = useState<NodeJS.Timeout>();
  const [secondTimer, setSecondTimer] = useState<NodeJS.Timeout>();
  const [thirdTimer, setThirdTimer] = useState<NodeJS.Timeout>();

  const setFirstRemindear = (count: number) => {
    const timer = setInterval(() => {
      new Notification('Remindear', { body: firstRemindear.message });
    }, count * 60000);

    setFirstTimer(timer);

    new Notification('Remindear', { body: 'Your remindear has been set' });

  };

  const setSecondRemindear = (count: number) => {
    const timer = setInterval(() => {
      new Notification('Remindear', { body: secondRemindear.message });
    }, count * 60000);

    setSecondTimer(timer);

    new Notification('Remindear', { body: 'Your remindear has been set' });
  };

  const setThirdRemindear = (count: number) => {
    const timer = setInterval(() => {
      new Notification('Remindear', { body: thirdRemindear.message });
    }, count * 60000);

    setThirdTimer(timer);

    new Notification('Remindear', { body: 'Your remindear has been set' });
  };

  const clearFirstRemindear = () => {
    firstTimer && clearInterval(firstTimer);

    new Notification('Remindear', { body: 'Your remindear has been cleared' });
  };

  const clearSecondRemindear = () => {
    secondTimer && clearInterval(secondTimer);

    new Notification('Remindear', { body: 'Your remindear has been cleared' });
  };

  const clearThirdRemindear = () => {
    thirdTimer && clearInterval(thirdTimer);

    new Notification('Remindear', { body: 'Your remindear has been cleared' });
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ flexGrow: 1 }}>
                <AppBar>
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Remindear
                    </Typography>
                    <Tooltip title="Color mode"> 
                      <IconButton
                        sx={{ ml: 1 }}
                        onClick={colorMode.toggleColorMode}
                        color="inherit"
                      >
                          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                      </IconButton>
                    </Tooltip>
                  </Toolbar>
                </AppBar>
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Container sx={{ mt: 20, maxWidth: 300 }}>
              <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container direction="row">
                  <TextField
                    id="standard-basic"
                    label={`${firstRemindear.title} (m)`}
                    value={firstRemindearField}
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setFirstRemindearField(Number(e.target.value))}
                    fullWidth
                    InputProps={{
                      type: "number",
                      endAdornment: (
                        <>
                          <Tooltip title="Set">
                            <IconButton onClick={() => {
                              setFirstRemindear(firstRemindearField);
                            }}>
                              <Done />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Clear">
                            <IconButton onClick={() => {
                              clearFirstRemindear();
                            }}>
                              <Close />
                            </IconButton>
                          </Tooltip>
                        </>
                      ),
                    }}
                  />
                </Grid>
                <Grid container direction="row" sx={{ mt: 2 }}>
                  <TextField
                    id="standard-basic"
                    label={`${secondRemindear.title} (m)`}
                    value={secondRemindearField}
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSecondRemindearField(Number(e.target.value))}
                    fullWidth
                    InputProps={{
                      type: "number",
                      endAdornment: (
                        <>
                          <Tooltip title="Set">
                            <IconButton onClick={() => {
                              setSecondRemindear(secondRemindearField);
                            }}>
                              <Done />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Clear">
                            <IconButton onClick={() => {
                              clearSecondRemindear();
                            }}>
                              <Close />
                            </IconButton>
                          </Tooltip>
                        </>
                      ),
                    }}
                  />
                </Grid>
                <Grid container direction="row" sx={{ mt: 2 }}>
                  <TextField
                    id="standard-basic"
                    label={`${thirdRemindear.title} (m)`}
                    value={thirdRemindearField}
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setThirdRemindearField(Number(e.target.value))}
                    fullWidth
                    InputProps={{
                      type: "number",
                      endAdornment: (
                        <>
                          <Tooltip title="Set">
                            <IconButton onClick={() => {
                              setThirdRemindear(thirdRemindearField);
                            }}>
                              <Done />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Clear">
                            <IconButton onClick={() => {
                              clearThirdRemindear();
                            }}>
                              <Close />
                            </IconButton>
                          </Tooltip>
                        </>
                      ),
                    }}
                  />
                </Grid>
              </Box>
            </Container>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
