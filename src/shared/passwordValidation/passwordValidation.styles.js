export default (theme: Object) => ({
  passwordToggle: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  nonValidatedText: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.neutrals.tertiaryGrey,
  },

  validatedText: {
    fontSize: theme.typography.fontSize,
    color: '#03a678',
  },

  validIcon: {
    fill: '#03a678',
  },

  invalidIcon: {
    fill: '#767486',
  },

  validationGrid: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginTop: '10px',
  },

  validationCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '&:nth-child(odd)': {
      marginRight: '5px',
    },
    '&:nth-child(even)': {
      marginLeft: '5px',
    },
  },
});
