export const theme = {
  palette: {
    background: {
      main: '#050816', // 深靛蓝科技背景
      paper: 'rgba(15,23,42,0.92)',
      card: 'rgba(24, 16, 48, 0.92)',
      overlay: 'radial-gradient(circle at 10% 0%, rgba(124, 77, 255, 0.45) 0%, transparent 55%),\
                 radial-gradient(circle at 90% 100%, rgba(244, 143, 177, 0.45) 0%, transparent 55%),\
                 radial-gradient(circle at 50% 50%, #020617 0%, #020617 100%)',
    },
    primary: {
      main: '#7C4DFF', // 类 MUI deepPurple.A200
      light: '#B47CFF',
      dark: '#651FFF',
    },
    secondary: {
      main: '#F48FB1', // 类 MUI pink.300
      light: '#F8BBD0',
      dark: '#EC407A',
    },
    text: {
      primary: '#EDE7F6',
      secondary: '#FCE4EC',
      muted: '#A5B4FC',
      dark: '#0F172A',
    },
    accent: {
      neonPurple: '#E040FB',
      neonPink: '#FF80AB',
      softBlue: '#7DD3FC',
    },
    divider: 'rgba(129, 140, 248, 0.45)',
  },
} as const;

export type Theme = typeof theme;

