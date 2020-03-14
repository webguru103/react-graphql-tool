export const FIELD_MARGIN = 10;

export default (theme: Object) => ({
  field: {
    backgroundColor: '#000000',
    outline: 'none',
    padding: 0,
  },
  fieldContainer: {
    margin: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    cursor: 'move',
    outline: 'none',
    padding: 0,
  },
  dragging: {
    cursor: 'grab',
    opacity: 0,
  },
  resizeHandle: {
    position: 'absolute',
    zIndex: theme.zIndex.activeItem,
    color: '#f7ce5e',
    margin: '-5px -5px -5px -5px',
    height: 10,
    width: 10,
    cursor: 'nwse-resize',
  },
  activeSelection: {
    boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.2)',
  },
  temporary: {
    opacity: '0.7',
  },
});
