export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '64px',
    padding: '0 150px 0 250px',
    position: 'sticky',
  },
  logo: {
    height: '31px',
    width: '111px',
  },
  screenTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.palette.neutrals.mainText,
    backgroundColor: 'transparent',
    fontFamily: theme.typography.fontFamily,
  },
  button: {
    margin: '10px auto',
    padding: '20px 0 40px 0',
    justifyContent: 'center',
  },
  card: {
    textAlign: 'center',
    justifyContent: 'center',
    maxWidth: '910px',
    width: '660px',
  },
  titleContainer: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '10px 0 10px 0',
  },
  cardTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: theme.palette.neutrals.mainText,
    fontFamily: theme.typography.fontFamily,
  },
  screenIcon: {
    width: '50px',
    height: '50px',
    color: theme.palette.semantic.mainGreen,
    margin: '10px 10px auto auto',
  },
  cardContent: {
    fontSize: '16px',
    color: theme.palette.neutrals.mainText,
    fontFamily: theme.typography.fontFamily,
    maxWidth: '460px',
    margin: '0 auto',
    textAlign: 'center',
  },
  landing: {
    display: 'flex',
  },
  view: {
    width: '100%',
  },
  viewContent: {
    paddingTop: '80px',
    display: 'flex',
    justifyContent: 'center',
  },
});
