import { STATIC_SERVER } from '../../configurations';

const loginBackground = `${STATIC_SERVER}/assets/loginBackground.png`;

export default (theme: Object) => ({
  root: {
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.neutrals.background,
  },
  pictureContainer: {
    width: '50%',
    backgroundImage: `url(${loginBackground})`,
    backgroundPosition: 'bottom right',
  },
  actionPanel: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  dealtapLogo: {
    color: theme.palette.neutrals.secondaryText,
  },
  content: {
    marginTop: '20px',
  },
});
