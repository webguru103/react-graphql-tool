export const PAGE_BOTTOM_MARGIN = 30;

export default (theme: Object) => ({
  listContainer: {
    height: '100%',
    width: '100%',
  },
  formContainer: {
    paddingTop: '30px',
  },
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    marginBottom: PAGE_BOTTOM_MARGIN,
  },
  pageHeaderContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    fontSize: 11,
    fontWeight: 300,
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.light,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
