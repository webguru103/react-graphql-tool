export default () => ({
  root: {
    gridColumn: 'span 4',
    padding: '15px',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      cursor: 'pointer',
    },
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
