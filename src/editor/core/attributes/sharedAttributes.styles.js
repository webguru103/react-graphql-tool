export default (theme: Object) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    padding: '0 10px',
    minHeight: 60,
    alignItems: 'center',
    background: theme.palette.neutrals.background,
  },
  headerTitle: {
    flexGrow: '2',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
    padding: '10px',
    background: theme.palette.neutrals.greyUI,
  },
});
