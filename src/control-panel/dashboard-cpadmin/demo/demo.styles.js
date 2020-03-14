export default () => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
  },
  content: {
    color: '#8D8A8F',
    display: 'grid',
    gridGap: '20px',
    gridTemplate: 'auto 300px 300px / repeat(4, 1fr)',
    justifyContent: 'center',
    minWidth: '1155px',
    maxWidth: '1155px',
    margin: '20px 0',
  },
  transactionCard: {
    gridColumn: 'span 2',
  },
  topAgentsCard: {
    gridColumn: 'col 3 / span 2',
  },
});
