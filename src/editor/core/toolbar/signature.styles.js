import shared from './shared.styles';

export default (theme: Object) => ({
  ...shared(theme),
  signatureFieldIcon: {
    color: theme.palette.neutrals.mainText,
  },
  startSigningIcon: {
    color: theme.palette.neutrals.background,
  },
});
