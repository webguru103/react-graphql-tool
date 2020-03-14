export default (theme: Object) => ({
  landing: {
    display: 'flex',
    backgroundColor: theme.palette.backgrounds.dashboard,
  },
  drawer: {
    height: '100%',
    minWidth: '180px',
    transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  drawerClosed: {
    height: '100vh',
    minWidth: '60px',
    transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  navbar: {
    position: 'relative',
    left: 60,
    height: '100px',
  },
  navbarDrawerClosed: {
    left: 60,
  },
  view: {
    width: '100%',
  },
  viewContent: {
    padding: '30px 50px',
  },
});
