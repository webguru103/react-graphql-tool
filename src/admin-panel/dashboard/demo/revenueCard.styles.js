export default () => ({
  root: {
    height: '320px',
    gridColumn: 'span 4',
    padding: '15px',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      cursor: 'pointer',
    },
    position: 'relative',
  },
  header: {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '20px',
  },
  chartContainer: {
    height: '85%',
  },
});
