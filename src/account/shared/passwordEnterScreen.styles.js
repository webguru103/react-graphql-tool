import sharedCss from './shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  controlButton: sharedCss.controlButton,
  controlButtons: sharedCss.controlButtons,
});
