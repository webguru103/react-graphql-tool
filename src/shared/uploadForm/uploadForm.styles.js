export default (theme: Object) => ({
  dropzone: {
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    color: theme.palette.neutrals.mainText,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 600,
    cursor: 'pointer',
    paddingBottom: 40,
    minHeight: 262,
  },
  otherDetails: {
    fontSize: 14,
    fontWeight: 400,
  },
  iconSmall: {
    maxHeight: 20,
    maxWidth: 20,
    margin: '0px',
    padding: '0 8px',
    color: theme.palette.neutrals.mainText,
  },
  iconSmallWhite: {
    maxHeight: 20,
    maxWidth: 20,
    margin: '0px',
    color: '#FFFFFF',
  },
  checkIcon: {
    marginRight: '14px',
    color: theme.palette.neutrals.greenIcon,
  },
  dropzoneContainer: {
    minHeight: 262,
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
  },
  paddingAnimationDropzone: {
    paddingBottom: 10,
    transition: 'all 1s ease',
  },
  paddingAnimationDropzoneOff: {
    paddingBottom: 40,
    transition: 'all 1s ease',
  },
  warningButton: {
    borderRadius: 0,
    textTransform: 'none',
    padding: '8px 0',
    minWidth: 20,
  },
  uploadListContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rejectedListContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rejectedList: {
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: '14px',
    color: theme.palette.semantic.error,
  },
  removeButton: {
    borderRadius: 0,
    textTransform: 'none',
    padding: '8px 0',
    minWidth: 20,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  truncateName: {
    width: '80%',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
  },
  dragOver: {
    opacity: 0.90,
  },
  processing: {
    margin: '0 10px',
  },
  tooltip: {
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    minWidth: 'fit-content',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hide: {
    display: 'none',
  },
});
