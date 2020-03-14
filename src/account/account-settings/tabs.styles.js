const styles = (theme: Object) => ({
  header: {
    padding: '7px 8px',
    marginTop: '16px',
    borderBottom: '1px solid #d8d8d8',
    color: theme.palette.neutrals.mainText,
    fontWeight: '500',
    fontSize: '1.5rem',
  },
  tabsRoot: {
    borderRadius: '6px',
    boxShadow: '0 1px 1px 0 rgba(118, 116, 134, 0.5)',
    backgroundColor: theme.palette.neutrals.background,
  },
  tabRoot: {
    textTransform: 'capitalize',
  },
  tabSelected: {
    color: theme.palette.primary.main,
  },
  tabsIndicator: {
    height: '2px',
    backgroundColor: theme.palette.primary.main,
  },
  tabContainer: {
    width: '860px',
    height: '418px',
    borderRadius: '6px',
    boxShadow: '0 1px 1px 1px #767486',
    marginTop: '17px',
    backgroundColor: theme.palette.neutrals.background,
  },
  tabs: {
    width: '264px',
  },
  agentTabs: {
    width: '600px',
  },
});

export default styles;
