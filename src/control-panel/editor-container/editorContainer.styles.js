export default () => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  editorContainer: {
    paddingTop: '60px',
    height: 'calc(100% - 86px)',
    width: '100%',
    '&.editorContainer--withBanner': {
      height: 'calc(100% - 136px)',
    },
  },
});
