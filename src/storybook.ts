/**
 * Hide the arguments in a control panel
 * Example) 
 * argTypes: {
    color: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
 */
export const hideArgs = (...argNames: string[]) => {
  const json: { [key: string]: any } = {};

  for (const name of argNames) {
    json[name] = {
      table: {
        disable: true,
      },
    };
  }
  return json;
};
