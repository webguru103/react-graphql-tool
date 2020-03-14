export default (theme: Object) => ({
  pageHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    backgroundColor: theme.palette.secondary.light,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  tooltip: {
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    minWidth: 'fit-content',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hide: {
    display: 'none',
  },
});
