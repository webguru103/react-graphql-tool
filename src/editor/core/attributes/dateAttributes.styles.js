export default (theme: Object) => ({
  generalAttributes: {
    display: 'flex',
    flexDirection: 'column',
  },
  subheading: {
    color: '#7C7C80',
    fontSize: '18px',
    fontWeight: '500',
    textTransform: 'uppercase',
    margin: '10px 0',
  },
  sectionRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
  },
  formLabel: {
    width: 60,
    marginRight: 10,
  },
  input: {
    width: 50,
  },
  autoPopulateCheckbox: {
    padding: 5,
  },
  autoPopulateLabel: {
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.neutrals.mainText,
  },
});
