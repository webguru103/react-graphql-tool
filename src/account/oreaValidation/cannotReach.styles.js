import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: sharedCss.screenTitle(theme),
  button: {
    textTransform: 'none',
    width: '100%',
    marginTop: 30,
    fontSize: 16,
    fontWeight: 300,
    height: 38,
  },
  controlButtons: {
    ...sharedCss.controlButtons,
  },
  controlButton: sharedCss.controlButton,
  notice: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  noticeText: {
    fontSize: 16,
    color: theme.palette.neutrals.mainText,
  },
  noticeImageContainer: {
    minWidth: 70,
    minHeight: 70,
  },
  noticeImage: {
    width: '120%',
    height: '120%',
    transform: 'translate(-18px, -12px)',
  },
});
