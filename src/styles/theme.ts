import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  font: {
    bodyMedium: `
      font-size: 16px;
      line-height: 24px;
    `,
    captionMedium: `
      font-size: 14px;
      line-height: 22px;
    `,
  },
  colors: {
    common: {
      black: '#222222',
      white: '#ffffff',
      gray: '#8D94A0',
      lightGray: '#B1B8C0',
      blue: '#4880EE',
      lightBlue: '#EAF3FE',
    },
    text: {
      default: '#353C49',
      title: '#1A1E27',
      unselected: '#6D7582',
      caption: '#8D94A0',
    },
    primary: {
      main: '#4880EE',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#F2F4F6',
      contrast: '#6D7582',
    },
    tertiary: {
      main: '#8D94A0',
      contrast: '#ffffff',
    },
  },
};
