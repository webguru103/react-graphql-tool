export default () => ({
  textarea: {
    height: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: 0,
    background: 'transparent',
    color: '#000000',
  },
  textareaLive: {
    width: '100%',
  },
  textareaStatic: {
    // Extra space so that text does not wrap if off by a small number of pixels
    // on rendering, when not editing.
    width: '110%',
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
