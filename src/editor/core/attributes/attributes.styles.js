export const ATTRIBUTE_PANEL_MIN_WIDTH = 250;

export default (theme: Object) => ({
  root: {
    padding: '17px 20px 0 25px',
    height: '100%',
    overflow: 'hidden',
    minWidth: ATTRIBUTE_PANEL_MIN_WIDTH,
  },
  header: {
    display: 'flex',
    minHeight: 40,
    alignItems: 'center',
    background: theme.palette.neutrals.background,
  },
  headerTitle: {
    flexGrow: '2',
  },
  headerTitleInput: {
    fontSize: 19,
    fontWeight: 600,
  },
  headerIcons: {
    display: 'flex',
    flexFlow: 'row',
  },
  content: {
    height: '100%',
    background: theme.palette.neutrals.background,
  },
});
