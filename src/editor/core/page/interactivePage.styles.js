export default (theme: Object) => ({
  page: {
    position: 'relative',
    outline: 'none',
  },
  selectionBox: {
    position: 'absolute',
    zIndex: theme.zIndex.selectionBox,
    border: '1px dotted #000',
    visibility: 'hidden',
  },
  isDragging: {
    visibility: 'visible',
  },
});
