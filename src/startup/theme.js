import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  custom: 'default',
  typography: {
    fontSize: '14px',
    fontFamily: 'Work Sans, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    display1: {
      fontFamily: 'Work Sans, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.8rem',
    },
    display2: {
      fontFamily: 'Work Sans, Helvetica, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '0.5rem',
    },
  },
  palette: {
    primary: {
      main: '#BA7EC4',
      light: '#EEEAFB',
    },
    secondary: {
      main: '#8E57CF',
      light: '#F1EEF8',
    },
    semantic: {
      alert: '#FD9D05',
      mainRed: '#DC143C',
      mainBlue: '#565BEE',
      mainGreen: '#03A678',
      tooltips: '#49565F',
      hover: '#9A68A3',
      error: '#F44336',
    },
    intent: {
      green: '#53C49A',
    },
    highlight: {
      blue: '#77A7D8',
    },
    neutrals: {
      background: '#FFFFFF',
      mainText: '#3D3157',
      secondaryText: '#757B81',
      secondaryGrey: '#D8D8D8',
      mainAndButtonGrey: '#CECDD0',
      tertiaryGrey: '#767486',
      greyUI: '#EAE8ED',
      secondaryGreyUI: '#F7F6F8',
      greenIcon: '#4CB589',
      blueGrey: '#D0D8E4',
      lightGrey: '#EFEFEF',
    },
    backgrounds: {
      dashboard: '#ECEBF2',
      toolbar: '#F7F6F8',
      main: '#F3F7FD',
    },
    temp: {
      cpDrawer: '#7E8DC4',
      cpDrawerSecondary: '#5468B1',
    },
  },
  zIndex: {
    stampField: 1,
    toolbar: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    footer: 1600,
    activeItem: 1700,
    loading: 2000,
  },
  table: {
    fontSize: '0.825rem',
  },
});

export default theme;
