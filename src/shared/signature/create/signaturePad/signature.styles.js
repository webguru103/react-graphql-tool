const styles = (theme: Object) => ({
  root: {
    border: `1px solid ${theme.palette.neutrals.blueGrey}`,
    backgroundColor: theme.palette.backgrounds.main,
    position: 'relative',
    borderRadius: 4,
    outline: 'none',
  },
  signature: {
    zIndex: 400,
  },
  button: {
    position: 'absolute',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
    zIndex: 500,
    userSelect: 'none',
  },
  clearButton: {
    bottom: 16,
    right: 16,
    color: theme.palette.neutrals.mainText,
    fontFamily: theme.typography.fontFamily,
    fontSize: 15,
  },
  signatureLine: {
    position: 'absolute',
    bottom: 5,
    left: 15,
    userSelect: 'none',
    zIndex: 100,
  },
  text: {
    color: theme.palette.neutrals.secondaryText,
  },
  x: {
    color: theme.palette.neutrals.secondaryText,
    position: 'absolute',
    bottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: theme.palette.neutrals.secondaryText,
    position: 'absolute',
  },
  drawNotice: {
    fontSize: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
});

export default styles;
