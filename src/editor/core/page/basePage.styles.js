const styles = (theme: Object) => ({
  page: {
    position: 'relative',
    backgroundColor: theme.palette.neutrals.background,
    boxShadow: '0 14px 28px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.05)',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  pdfPageRendered: {
    opacity: '100%',
    animation: 'loaded 0.8s linear',
  },
  '@keyframes loaded': {
    '0%': { opacity: 0 },
    '25%': { opacity: '40%' },
    '50%': { opacity: '70%' },
    '75%': { opacity: '90%' },
    '100%': { opacity: '100%' },
  },
});

export default styles;
