import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import styles from './formActionsButton.styles';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import FormSettingsDialog from './formSettingsDialog';
import type { Form } from '../../flowTypes';
import FormDuplicateDialog from './formDuplicateDialog';

type PropType = {
  classes: Object,
  createDialog: (React.Element) => void,
  history: RouterHistory,
  form: Form,
  refetch: () => void,
};

class FormActionsButtonC extends React.PureComponent<PropType, { open: boolean }> {

  state = {
    open: false,
  };

  handleToggle = (e) => {
    e.stopPropagation();
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  anchorEl: React.Element;

  render() {
    const { open } = this.state;
    const {
      classes, history, createDialog, form, refetch,
    } = this.props;
    return (
      <React.Fragment>
        <IconButton
          data-testid={`form-actions-${form.id}`}
          disableRipple
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          onClick={this.handleToggle}
        >
          <MoreHorizIcon />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal className={classes.menu}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    {
                      form.publishedVersionId
                      && (
                        <MenuItem
                          data-testid={`view-published-version-${form.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            history.push(`/cp-user/editor/view?formId=${form.id}`, {
                              draftId: form.id,
                            });
                            this.handleClose(e);
                          }}
                        >
                          View Published Version
                        </MenuItem>
                      )
                    }
                    <MenuItem
                      data-testid={`edit-draft-${form.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/cp-user/editor/edit?formId=${form.id}`);
                        this.handleClose(e);
                      }}
                    >
                      Edit Draft
                    </MenuItem>
                    <MenuItem
                      data-testid={`duplicate-form-${form.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        createDialog({
                          dialogContent: <FormDuplicateDialog form={form} />,
                        });
                        this.handleClose(e);
                      }}
                    >
                      Duplicate
                    </MenuItem>
                    <MenuItem
                      data-testid={`edit-form-settings-${form.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        createDialog({
                          dialogContent: <FormSettingsDialog form={form} refetch={refetch} />,
                        });
                        this.handleClose(e);
                      }}
                    >
                      Settings
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter, withDialog)(FormActionsButtonC);
