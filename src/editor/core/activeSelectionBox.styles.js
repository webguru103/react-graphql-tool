export default (theme: Object) => ({
  activeSelectionBox: {
    position: 'absolute',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: theme.zIndex.selectionBox,
  },
});
