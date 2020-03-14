const styles = (theme: Object) => ({
  contentHeader: {
    backgroundColor: 'transparent',
    display: 'grid',
    marginTop: '20px',
    width: '100%',
    grid: '1fr / 2fr 1fr 1fr',
  },
  contentTransactionIcon: {
    margin: '20px',
  },
  transaction: {
    display: 'grid',
    color: theme.palette.neutrals.secondaryText,
    grid: '1fr / 2fr 1fr 1fr',
    marginBottom: '20px',
    width: '100%',
    cursor: 'pointer',
  },
  contentCell: {
    display: 'flex',
    alignItems: 'center',
  },
  contentCellWithButton: {
    justifyContent: 'space-between',
  },
  tableRowHovered: {
    cursor: 'pointer',
  },
});

export default styles;
