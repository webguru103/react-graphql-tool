import * as React from 'react';

export const DialogContext = (React.createContext({
  createDialog: () => { },
  closeDialog: () => { },
}): React.Context<{ createDialog: Function, closeDialog: Function }>);
