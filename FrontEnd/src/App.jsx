import React, { useEffect, useState } from 'react';
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
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box style={{ backgroundColor: darkMode ? '#121212' : 'inherit' }}>
        <LayoutMain toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
