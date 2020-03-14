const styles = (theme: Object) => ({
  cardContainer: {
    display: 'flex',
  },
  timeCard: {
    width: '100px',
    margin: '10px 0',
    padding: ' 0 5px',
    fontSize: '10px',
    opacity: 0.5,
    font: `${theme.typography.fontFamily}`,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
  },
  time: {
    fontSize: '20px',
    padding: '5px 0',
  },
  card: {
    justifyContent: 'center',
    margin: '10px 0',
    width: '100%',
  },
  cardContent: {
    display: 'block',
    justifyContent: 'left',
    fontSize: '20px',
    padding: '0 0 0 0',
    color: theme.palette.neutrals.mainText,
    opacity: 0.7,
    fontFamily: theme.typography.fontFamily,
  },
  titleBar: {
    fontSize: '14px',
    padding: '10px 15px',
    color: theme.palette.primary.contrastText,
    textAlign: 'left',
    verticalAlign: 'middle',
    backgroundImage: 'linear-gradient(to right, #B468BD, #D77B7B)',
  },
  signeeTitle: {
    fontSize: '10px',
    padding: '10px 15px',
    width: '50px',
  },
  signeeContainer: {
    padding: '0 0 15px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    alignContent: 'left',
    flexFlow: 'column wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottom: `1px solid ${theme.palette.neutrals.greyUI}`,
  },
  signee: {
    display: 'flex',
    width: '50%',
    padding: '0 0 10px 0',
  },
  avatarIcon: {
    width: '50px',
  },
  signeeDetails: {
    overflow: 'hidden',
  },
  detailLine1: {
    display: 'flex',
    paddingBottom: '2px',
  },
  signeeName: {
    fontSize: '12px',
    padding: '0 5px 0 0',
  },
  signeeEmail: {
    fontSize: '10px',
    opacity: 0.5,
    margin: 'auto 0',
  },
  detailLine2: {
    display: 'flex',
  },
  signeeStatus: {
    fontSize: '12px',
    margin: '0 5px 0 0',
    padding: '0 4px',
    border: '1px solid',
    borderRadius: '4px',
  },
  signed: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  viewed: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.neutrals.tertiaryGrey,
  },
  notViewed: {
    color: theme.palette.neutrals.tertiaryGrey,
    backgroundColor: '#FFFFFF',
  },
  signeeStatusTime: {
    fontSize: '10px',
    opacity: 0.5,
    margin: 'auto 0',
  },
  documentContainer: {
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  document: {
    display: 'flex',
    width: '100%',
    '&:hover $dlIcon': {
      opacity: 1,
    },
  },
  docIcon: {
    width: '30px',
    float: 'left',
    opacity: 0.7,
    padding: '0 10px',
  },
  docTitle: {
    color: theme.palette.neutrals.mainText,
    fontSize: '12px',
    opacity: 0.9,
    margin: 'auto 0',
    float: 'left',
    textDecoration: 'none',
  },
  transactionDl: {
    width: '30px',
    float: 'right',
    marginLeft: 'auto',
    color: '#fff',
  },
  dlIcon: {
    width: '30px',
    float: 'right',
    marginRight: '5px',
    marginLeft: 'auto',
    opacity: 0,
  },
  dlError: {
    fontSize: '12px',
    textAlign: 'right',
    float: 'right',
    marginLeft: 'auto',
  },
});

export default styles;
