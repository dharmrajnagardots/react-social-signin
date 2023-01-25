export type theme = { theme: 'outline'; text: 'signin_with'; shape: 'rectangular'; size: 'large'; width: '40px' };

export type GoogleProps = {
  callback: (d: any) => void;
  clientId: string;
  buttonTheme?: theme;
  promptEnable?: false;
};
