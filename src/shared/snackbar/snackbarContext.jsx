import * as React from 'react';

export const SnackbarContext = (React.createContext({
  createSnackbar: () => { },
  closeSnackbar: () => { },
}): React.Context<{createSnackbar: Function, closeSnackbar: Function}>);
