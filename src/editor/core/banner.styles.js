const styles = (theme: Object) => ({
  banner: {
    left: 0,
    zIndex: theme.zIndex.toolbar,
    backgroundColor: theme.palette.neutrals.mainText,
    color: theme.palette.backgrounds.toolbar,
    width: '100%',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default styles;
