import sharedCss from './shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: {
    ...sharedCss.screenContainer,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    paddingTop: '32px',
  },
  screenHeader: {
    color: theme.palette.neutrals.mainText,
    fontSize: '18px',
    fontWeight: 500,
    textAlign: 'left',
  },
  screenContent: {
    color: theme.palette.neutrals.mainText,
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '32px',
  },
  controlButton: {
    marginTop: '32px',
  },
});
