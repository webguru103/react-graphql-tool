const styles = (theme: Object) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.backgrounds.main,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      margin: 0,
      padding: 0,
      height: '100%',
      overflow: 'auto',
    },
    html: {
      height: '100%',
    },
    '#mainapp': {
      position: 'relative',
      height: '100%',
    },
  },
});

export default styles;
