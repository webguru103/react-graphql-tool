export default (theme: Object) => ({
  dragContainer: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: theme.zIndex.tooltip,
    top: 0,
    left: 0,
  },
});
