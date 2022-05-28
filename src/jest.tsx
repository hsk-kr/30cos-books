import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme as theme } from './styles/theme';
import GlobalCSS from './styles/global.css';

/**
 * Mount the theme and render
 */
export const mountWithTheme = (
  node: React.ReactNode | React.ReactNode[] | string
) => (
  <ThemeProvider theme={theme}>
    {node}
    <GlobalCSS />
  </ThemeProvider>
);
