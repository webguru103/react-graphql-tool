const styles = () => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawer: {
    height: '100%',
    minWidth: 180,
    transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  drawerClosed: {
    minWidth: 60,
  },
  view: {
    width: '100%',
  },
  viewContent: {
    padding: '30px 50px',
  },
});

export default styles;
