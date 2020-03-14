import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core';
import { DialogContext } from './dialogContext';

type PropType = {
  children: React.Element,
  classes: Object,
}

type StateType = {
  isDialogOpen: boolean,
  dialogContent: React.Element,
  isBackdropClickdisabled: boolean,
  isTransparent: boolean,
  isEscDisabled: boolean,
}

const styles = (theme: Object) => ({
  root: {
    zIndex: theme.zIndex.modal,
  },
  rootTransparent: {
    zIndex: theme.zIndex.modal,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  paper: {
    boxShadow: 'none',
    position: 'relative',
  },
  paperTransparent: {
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    position: 'relative',
  },
});

class DialogProviderC extends React.Component<PropType, StateType> {

  state = {
    isDialogOpen: false,
    dialogContent: '',
    isBackdropClickdisabled: false,
    isTransparent: false,
    isEscDisabled: false,
  };

  componentDidMount() {
    window.onpopstate = () => {
      if (this.state.isDialogOpen) {
        this.closeDialog();
      }
    };
  }

  createDialog = ({
    dialogContent,
    disableClickOutside,
    isTransparent,
    disableEsc,
  }: {
    dialogContent: React.Element,
    disableClickOutside?: boolean,
    isTransparent: boolean,
    disableEsc?: boolean,
  }) => {
    this.setState({
      dialogContent,
      isDialogOpen: true,
      isBackdropClickdisabled: (disableClickOutside || false),
      isTransparent,
      isEscDisabled: (disableEsc || false),
    });
  };

  closeDialog = () => {
    this.setState({
      isDialogOpen: false,
      dialogContent: '',
    });
  };

  render() {
    const { children, classes } = this.props;
    const {
      isDialogOpen,
      dialogContent,
      isBackdropClickdisabled,
      isTransparent,
      isEscDisabled,
    } = this.state;
    return (
      <DialogContext.Provider value={{ createDialog: this.createDialog, closeDialog: this.closeDialog }}>
        {children}
        <Dialog
          maxWidth="md"
          open={isDialogOpen}
          onClose={this.closeDialog}
          PaperProps={{ square: true }}
          disableBackdropClick={isBackdropClickdisabled}
          disableEscapeKeyDown={isEscDisabled}
          classes={{
            root: isTransparent ? classes.rootTransparent : classes.root,
            paper: isTransparent ? classes.paperTransparent : classes.paper,
          }}
        >
          {dialogContent && dialogContent}
        </Dialog>
      </DialogContext.Provider>
    );
  }

}

export default withStyles(styles, { withTheme: true })(DialogProviderC);
