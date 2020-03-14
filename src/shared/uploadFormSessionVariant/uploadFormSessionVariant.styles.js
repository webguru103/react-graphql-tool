export default (theme: Object) => ({
  dropzone: {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.neutrals.background,
    color: theme.palette.primary.mainText,
    fontSize: '11px',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    paddingBottom: 40,
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main,
    borderRadius: '10px',
    margin: '15px',
  },
  cloudUpload: {
    height: '60px',
    width: '60px',
    paddingTop: 15,
    transition: 'all 1s ease',
    color: theme.palette.primary.main,
    opacity: 0.7,
  },
  iconSmall: {
    maxHeight: 20,
    maxWidth: 20,
    margin: '0 10px 0 10px',
    color: theme.palette.primary.mainText,
  },
  iconSmallWhite: {
    maxHeight: 20,
    maxWidth: 20,
    margin: '0 10px 0 10px',
    color: '#FFFFFF',
  },
  dropzoneContainer: {
    minHeight: 145,
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
  },
  paddingAnimationCloud: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  paddingAnimationDropzone: {
    paddingBottom: 10,
  },
  warningButton: {
    display: 'flex',
    backgroundColor: '#F44336',
    borderRadius: 0,
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#F44336',
    },
  },
  removeButton: {
    borderRadius: 0,
    textTransform: 'none',
  },
  dragOver: {
    opacity: 0.90,
  },
});
