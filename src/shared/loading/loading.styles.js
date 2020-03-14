export default (theme: Object) => ({
  root: {
    zIndex: theme.zIndex.loading,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.73)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayMessage: {
    marginTop: 30,
    fontWeight: 300,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
