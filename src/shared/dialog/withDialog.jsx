import * as React from 'react';
import { DialogContext } from './dialogContext';

export function withDialog(Component: React.Element) {
  return function DialogCreatorInjector(props: any) {
    return (
      <DialogContext.Consumer>
        {({ createDialog, closeDialog }) => <Component {...props} createDialog={createDialog} closeDialog={closeDialog} />}
      </DialogContext.Consumer>
    );
  };
}
