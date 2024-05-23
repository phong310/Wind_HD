import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LayoutMain from './Components/Layouts/LayoutMain';
import { Box } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',

    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',

    },
  });


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box style={{ backgroundColor: darkMode ? '#121212' : 'inherit' }}>
        <LayoutMain toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
