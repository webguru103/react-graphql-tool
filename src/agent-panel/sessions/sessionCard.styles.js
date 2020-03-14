const styles = (theme: Object) => ({
  cardContainer: {
    display: 'flex',
    maxWidth: 1000,
    minWidth: 1000,
    minHeight: 200,
  },
  card: {
    justifyContent: 'center',
    margin: '10px 0',
    width: '100%',
    color: theme.palette.neutrals.mainText,
    minWidth: 735,
    boxShadow: '0px 10px 19px rgba(163, 172, 186, 0.364756)',
  },
  cardHeader: {
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    backgroundColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    padding: '3px 10px',
    color: 'white',
    fontSize: 9,
  },
  downloadIcon: {
    marginRight: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'left',
    fontSize: '20px',
  },
  cardTitle: {
    margin: '0 0 10px 15px',
    color: theme.palette.neutrals.mainText,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'Work Sans',
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: 0,
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  signeeTitle: {
    fontSize: '10px',
    padding: '10px 15px',
    width: '50px',
  },
  signeeContainer: {
    display: 'flex',
    flexFlow: 'column',
    flexBasis: '100%',
  },
  documentContainer: {
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
  },
  loader: {
    color: theme.palette.primary.main,
    marginRight: '10px',
  },
});

export default styles;
