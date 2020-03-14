import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  controlButtons: sharedCss.controlButtons,
  controlButton: sharedCss.controlButton,
  passwordInput: {
    marginBottom: '40px',
  },
  options: {
    display: 'flex',
  },
  stayLoggedIn: {
    lineHeight: '1.29',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.neutrals.secondaryText,
  },
  forgotPassword: {
    display: 'block',
    lineHeight: '1.29',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.neutrals.main,
    alignSelf: 'center',
  },
  snackbar: {
    background: theme.palette.secondary.main,
  },
  emailVerification: {
    lineHeight: '1.29',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.semantic.alert,
  },
});
