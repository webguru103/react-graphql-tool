import * as React from 'react';
import type { Match, RouterHistory } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { compose } from '../../utility';
import styles from './forms.styles';
import ViewForms from './viewForms';
import c from './constants';
import { withDialog } from '../../shared/dialog/withDialog';
import CreateFormDialog from './create-form-dialog/createFormDialog';

type PropType = {
  classes: Object,
  createDialog: Function,
  closeDialog: () => {},
  match: Match,
  history: RouterHistory,
};

class FormsC extends React.PureComponent<PropType, null> {

  render() {
    const {
      classes,
      match,
      createDialog,
      closeDialog,
      history,
    } = this.props;
    return (
      <React.Fragment>
        <div className={classes.nav}>
          <Button
            data-testid="new-form"
            variant="raised"
            color="primary"
            onClick={() => createDialog({
              dialogContent:
                (
                  <CreateFormDialog
                    closeDialog={closeDialog}
                    groupId={match.params.id}
                    history={history}
                  />
                ),
              disableClickOutside: true,
            })}
          >
            {c.NEW_FORM}
          </Button>
        </div>
        <ViewForms />
      </React.Fragment>
    );
  }

}

export default compose(
  withDialog,
  withStyles(styles, { withTheme: true }),
)(FormsC);
