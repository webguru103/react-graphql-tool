import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  noticeText: sharedCss.noticeText(theme),
  singleButton: sharedCss.singleButton,
  notice: sharedCss.notice,
  noticeImageContainer: sharedCss.noticeImageContainer,
  noticeImage: sharedCss.noticeImage,
  controlButtons: sharedCss.controlButtons,
  controlButton: {
    ...sharedCss.controlButton,
    padding: '0 25px',
  },
});
