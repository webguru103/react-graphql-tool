import sharedCss from './shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  passwordInput: {
    marginBottom: '40px',
  },
  controlButton: sharedCss.controlButton,
  controlButtons: sharedCss.controlButtons,
  headerSection: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: `${theme.typography.fontSize}`,
    fontWeight: 500,
    lineHeight: '1.22',
    color: theme.palette.neutrals.mainText,
    margin: '15px 0 5px',
  },
  headerContent: {
    fontSize: `${theme.typography.fontSize}`,
    marginBottom: '5px',
  },
  disabledField: {
    color: theme.palette.neutrals.mainText,
  },
});
