import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { useThemeStore } from '@src/store';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);
type ThemeProviderWrapperProps = {
  children: React.ReactNode;
};

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = (props) => {
 // const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const curThemeName = useThemeStore((state:any)=>state.theme) || 'PureLightTheme';
 
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
