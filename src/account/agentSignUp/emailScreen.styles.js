import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  emailInput: {
    marginBottom: '40px',
  },
  controlButton: sharedCss.controlButton,
  controlButtons: sharedCss.controlButtons,
});
