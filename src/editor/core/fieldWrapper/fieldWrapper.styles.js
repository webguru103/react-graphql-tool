export default (theme: Object) => ({
  field: {
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    cursor: 'move',
    outline: 'none',
    border: '1px dotted rgba(0,0,0,0)',
  },
  locked: {
    cursor: 'default',
    userSelect: 'none',
  },
  viewOnly: {
    backgroundColor: 'transparent',
  },
  dragging: {
    cursor: 'grab',
    opacity: 0,
  },
  resizeDragging: {
    opacity: 0,
  },
  notSelected: {
    opacity: 0,
  },
  dragHandle: {
    cursor: 'grab',
    margin: 5,
  },
  resizeHandle: {
    position: 'absolute',
    zIndex: theme.zIndex.activeItem,
    color: '#f7ce5e',
    margin: 0,
    padding: 0,
    height: 6,
    width: 6,
    cursor: 'nwse-resize',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 50,
  },
  blank: {
    visibility: 'hidden',
    width: 0.5,
    height: 0.5,
  },
  activeSelection: {
    border: '1px dotted #33CC33',
  },
  temporary: {
    opacity: '0.7',
  },
  signatureField: {
    borderRadius: 25,
  },
  initialsField: {
    borderRadius: 5,
  },
});
