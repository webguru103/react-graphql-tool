export default (theme: Object) => ({
  landing: {
    display: 'flex',
    background: `radial-gradient(#e47fe6, ${theme.palette.primary.main})`,
    minHeight: '100%',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '42px',
    width: '148px',
    padding: '20px 50px',
  },
  button: {
    display: 'block',
    backgroundColor: 'transparent',
    border: `solid 1px ${theme.palette.neutrals.background}`,
    boxShadow: 'none',
    margin: '0px auto 20px auto',
    padding: '10px 40px',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  screenIcon: {
    width: '288px',
    height: '405px',
    marginBottom: '40px',
  },
  text: {
    display: 'block',
    margin: '20px auto',
    color: theme.palette.neutrals.background,
    textAlign: 'center',
    fontSize: '32px',
  },
});
