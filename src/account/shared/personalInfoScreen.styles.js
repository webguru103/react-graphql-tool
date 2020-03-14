import sharedCss from './shared.styles';

export default (theme: Object) => ({
  screenContainer: {
    width: '315px',
  },
  screenTitle: sharedCss.screenTitle(theme),
  controlButton: sharedCss.controlButton,
  controlButtons: {
    ...sharedCss.controlButtons,
    marginBottom: '20px',
  },
  asterisk: {
    color: theme.palette.semantic.mainRed,
  },
  requiredText: {
    color: theme.palette.neutrals.secondaryText,
  },
  phoneNumber: {
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
});
