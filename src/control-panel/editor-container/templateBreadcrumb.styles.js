export default (theme: Object) => ({
  groupName: {
    fontSize: '12px',
    color: theme.palette.neutrals.secondaryText,
  },
  formName: {
    color: theme.palette.neutrals.mainText,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    '& span + span': {
      marginLeft: 5,
    },
  },
});
