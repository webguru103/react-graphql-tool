export const ATTRIBUTE_PANEL_WIDTH_DEFAULT = 360;

const styles = (theme: Object) => ({
  panels: {
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
  panel: {
    display: 'flex',
    flexFlow: 'column',
  },
  formPanel: {
    flex: '3 3 0',
    alignItems: 'center',
    backgroundColor: theme.palette.backgrounds.main,
  },
  attributePanel: {
    width: ATTRIBUTE_PANEL_WIDTH_DEFAULT,
    backgroundColor: theme.palette.neutrals.background,
  },
});

export default styles;
