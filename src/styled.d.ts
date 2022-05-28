// styled.d.ts
import 'styled-components';
interface IPalette {
  main: string;
  contrast: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      bodyMedium: string;
      captionMedium: string;
    };
    colors: {
      common: {
        black: string;
        white: string;
        lightGray: string;
        blue: string;
        lightBlue: string;
        gray: string;
      };
      text: {
        default: string;
        title: string;
        unselected: string;
        caption: string;
      };
      primary: IPalette;
      secondary: IPalette;
      tertiary: IPalette;
    };
  }
}
