import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  noticeText: sharedCss.noticeText(theme),
  controlButtons: sharedCss.controlButtons,
  controlButton: sharedCss.controlButton,
  notice: {
    ...sharedCss.notice,
    marginTop: 26,
  },
});
