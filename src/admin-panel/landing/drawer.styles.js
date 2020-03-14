const drawerWidth = 200;

const styles = (theme: Object) => ({
  root: {
    zIndex: 1,
    height: '100%',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& $drawerInner': {
      width: 60,
    },
    '& $listItem': {
      justifyContent: 'center',
    },
    '& $listItemIcon': {
      marginRight: 0,
    },
  },
  drawerInner: {
    width: drawerWidth,
    color: 'secondary',
  },
  header: {
    padding: '15px',
  },
  headerClosed: {
    width: 60,
    padding: '15px 0',
    textAlign: 'center',
  },
  headerText: {
    color: theme.palette.neutrals.background,
  },
  listItem: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  listItemText: {
    padding: 0,
  },
  listItemIcon: {
    color: theme.palette.neutrals.background,
    height: '27px',
    width: '27px',
    fontSize: 16,
  },
  listItemContent: {
    color: theme.palette.neutrals.background,
    fontSize: 15,
  },
  listSubheader: {
    color: theme.palette.primary.contrastText,
    textTransform: 'uppercase',
    paddingLeft: '10px',
    fontSize: '0.8rem',
    lineHeight: '30px',
  },
  divider: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
});

export default styles;
