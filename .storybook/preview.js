import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components'
import GlobalCSS from '../src/styles/global.css';
import { defaultTheme as theme } from '../src/styles/theme';

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalCSS />
    {story()}
  </ThemeProvider>
))

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}