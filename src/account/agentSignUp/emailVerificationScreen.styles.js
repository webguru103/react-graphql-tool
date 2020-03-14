import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    paddingTop: '32px',
    width: '365px',
  },
  controlButton: sharedCss.controlButton,
  controlButtons: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  screenHeader: {
    color: theme.palette.neutrals.mainText,
    fontSize: '18px',
    fontWeight: 500,
    textAlign: 'center',
  },
  screenContent: {
    color: theme.palette.neutrals.mainText,
    fontSize: '16px',
    marginBottom: '32px',
    textAlign: 'center',
  },
});
