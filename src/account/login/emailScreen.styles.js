import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  controlButtons: sharedCss.controlButtons,
  controlButton: sharedCss.controlButton,
  emailInput: {
    marginBottom: '20px',
  },
});
