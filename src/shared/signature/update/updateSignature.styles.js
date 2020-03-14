export default () => ({
  root: {
    width: 507,
    padding: '0 37px 0 37px',
  },
  labeledPicture: {
    fontSize: 10,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  picture: {
    marginTop: 20,
    maxHeight: '100%',
    maxWidth: '100%',
  },
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    marginLeft: 5,
  },
  header: {
    fontSize: 23,
    fontWeight: 600,
    margin: '23px 0 17px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stamps: {
    width: '100%',
    display: 'flex',
    marginBottom: 20,
  },
});
