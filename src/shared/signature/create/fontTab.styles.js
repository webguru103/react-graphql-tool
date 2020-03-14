export default (theme: Object) => ({
  root: {
    width: 510,
  },
  fullNameFonted: {
    fontSize: 25,
    whiteSpace: 'nowrap',
  },
  initialsFonted: {
    fontSize: 25,
    whiteSpace: 'nowrap',
  },
  disclaimer: {
    padding: '0 37px 8px 37px',
    fontSize: 10,
    color: theme.palette.semantic.tooltips,
    lineHeight: '150%',
  },
  dialogActions: {
    marginRight: 20,
    marginBottom: 18,
  },
  actionButtons: {
    marginLeft: 5,
  },
  fontInput: {
    marginBottom: 29,
    width: '100%',
    padding: '0 37px 0 37px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  fontList: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 37px 0 37px',
    maxHeight: 245,
    overflowY: 'auto',
    marginBottom: 14,
    maxWidth: 506,
  },
  fontItem: {
    display: 'flex',
    height: 50,
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.neutrals.lightGrey}`,
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:last-child': {
      borderBottom: `1px solid ${theme.palette.neutrals.lightGrey}`,
    },
  },
  signaturePreview: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  initialPreview: {
    width: 140,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: theme.palette.primary.main,
  },
  inActiveDot: {
    backgroundColor: theme.palette.neutrals.greyUI,
  },
  dot: {
    flex: '0 0 auto',
    width: 20,
    height: 20,
    padding: 0,
    marginRight: 30,
    borderRadius: 100,
  },
  initialInput: {
    width: 83,
  },
  signatureInput: {
    width: 310,
    marginRight: 38,
  },
});
