import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  controlButton: sharedCss.controlButton,
  controlButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  headerSection: {
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: `${theme.typography.fontSize}`,
    fontWeight: 500,
    lineHeight: '1.22',
    color: theme.palette.neutrals.mainText,
    margin: '15px 0 5px',
  },
  headerContent: {
    fontSize: `${theme.typography.fontSize}`,
    marginBottom: '5px',
  },
});
