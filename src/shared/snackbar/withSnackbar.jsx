import * as React from 'react';
import { SnackbarContext } from './snackbarContext';

export function withSnackbar(Component: React.Element) {
  return function SnackbarCreatorInjector(props: any) {
    return (
      <SnackbarContext.Consumer>
        {({ createSnackbar, closeSnackbar }) => <Component {...props} createSnackbar={createSnackbar} closeSnackbar={closeSnackbar} />}
      </SnackbarContext.Consumer>
    );
  };
}
