export default (theme: Object) => ({
  certificateContent: {
    width: '100%',
    padding: '2rem 0',
  },
  infoBlock: ({
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '0 0.5rem',
    [theme.breakpoints.up('sm')]: {
      padding: '0 4rem',
      marginBottom: '1.5rem',
    },
  }),
  infoTitle: {
    fontSize: '16px',
    lineHeight: '1.15',
    color: '#3D3F43',
    width: '40%',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      width: '30%',
    },
  },
  infoValue: {
    fontSize: '16px',
    lineHeight: '1.15',
    fontWeight: 'bold',
    color: '#3D3F43',
    width: '60%',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  divider: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ECEBF2',
    width: '100%',
    height: '1px',
    background: '#ECEBF2',
  },
});
