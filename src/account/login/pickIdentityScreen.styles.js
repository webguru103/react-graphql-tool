import sharedCss from '../shared/shared.styles';

export default (theme: Object) => ({
  screenContainer: sharedCss.screenContainer,
  screenTitle: {
    ...sharedCss.screenTitle(theme),
    fontSize: 16,
  },
  selectionButton: {
    marginBottom: '20px',
  },
});
