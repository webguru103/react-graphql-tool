export default (theme: Object) => ({
  content: {
    padding: '0 200px',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
  },
  header: {
    fontSize: 20,
    color: theme.palette.neutrals.secondaryText,
    width: 600,
  },
  signees: {
    width: 600,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 32,
  },
  signee: {
    display: 'flex',
    backgroundColor: theme.palette.neutrals.background,
    marginTop: 10,
    padding: '0 18px 0 42px',
    borderRadius: '4px',
  },
  inputs: {
    marginRight: 20,
    width: 200,
    paddingBottom: 12,
  },
  clearIcon: {
    display: 'flex',
    alignSelf: 'center',
  },
  addButton: {
    width: 'auto',
    margin: '20px 55px 20px 0',
    display: 'inline-flex',
    padding: '0px',
    background: 'transparent',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    color: theme.palette.semantic.mainBlue,
  },
  addIcon: {
    marginLeft: 10,
  },
});
