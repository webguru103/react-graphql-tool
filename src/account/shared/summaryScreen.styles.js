import sharedCss from './shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  controlButton: sharedCss.controlButton,
  controlButtons: sharedCss.controlButtons,
  screenTitle: sharedCss.screenTitle(theme),
  listHeader: {
    fontSize: `${theme.typography.fontSize}`,
    fontWeight: 500,
    lineHeight: '1.22',
    color: theme.palette.neutrals.mainText,
    margin: '15px 0 5px',
    '&:firstChild': {
      marginTop: 0,
    },
  },
  listContent: {
    marginBottom: '5px',
    fontSize: `${theme.typography.fontSize}`,
    wordWrap: 'break-word',
    minHeight: '20px',
  },
  bottomSection: {
    marginTop: '40px',
  },
  errorWrapper: {
    margin: '0 0 30px',
  },
  helperText: {
    '&$errorMessage': {
      color: `${theme.palette.semantic.mainRed}`,
      fontSize: `${theme.typography.fontSize}`,
    },
  },
  errorMessage: {},
});
