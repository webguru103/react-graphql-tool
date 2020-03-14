export default {
  screenContainer: {
    width: '290px',
  },
  controlButton: {
    marginLeft: '20px',
    textTransform: 'none',
  },
  controlButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '40px',
  },
  singleButton: {
    textTransform: 'none',
    width: '100%',
    marginTop: 30,
    fontSize: 16,
    fontWeight: 300,
    height: 38,
  },
  screenIcon: {
    width: '70px',
    height: '70px',
  },
  screenTitle: (theme: Object) => ({
    fontSize: '26px',
    lineHeight: '1.15',
    color: theme.palette.neutrals.mainText,
    marginBottom: '30px',
  }),
  noticeText: (theme: Object) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    color: theme.palette.neutrals.mainText,
  }),
  notice: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  noticeImageContainer: {
    minWidth: 90,
    minHeight: 90,
  },
  noticeImage: {
    width: '120%',
    height: '120%',
    transform: 'translate(-18px, -12px)',
  },
};
