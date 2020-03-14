import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { RouterHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import CreateNewGroupDialog from './createNewGroupDialog';
import { withCreateNewGroup, withFormGroups } from './api/formGroup.service';
import { compose, paginationOptions } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import styles from './formGroups.styles';
import messages from './constants';
import { columns } from './columns';
import { Table } from '../../shared/table';
import SettingsDialog from './settingsDialog';
import TextButton from '../../shared/textButton/textButton';
import type { FormGroup, Pagination } from '../../flowTypes';
import { DEFAULT_PAGE_SIZE } from '../../constants';

type Props = {
  classes: Object,
  createDialog: Function,
  closeDialog: () => {},
  createSnackbar: (React.Element, { timer: number }) => void,
  createNewGroup: Function,
  refetch: Function,
  history: RouterHistory,
  formGroups: Array<FormGroup>,
  totalCount: number,
};

class FormGroupsC extends React.PureComponent<Props, { loading: boolean }> {

  state = {
    loading: false,
  };

  pagination: Pagination = {
    offset: 0,
    first: DEFAULT_PAGE_SIZE,
    condition: {},
    orderBy: ['FORM_GROUP_NAME_ASC'],
  };

  fetchData = async ({
    filtered, sorted, pageSize, page,
  }: {
    filtered: Array<{ [string]: string }>, sorted: Array<{ [string]: string }>, pageSize: number, page: number,
  } = {}) => {
    this.setState({ loading: true });

    const pagination = paginationOptions({
      page, pageSize, filtered, sorted,
    });

    this.pagination = pagination;
    await this.props.refetch(pagination);

    this.setState({ loading: false });
  };

  settingsSubmitSnackbar = () => {
    this.props.createSnackbar(messages.FORM_GROUP_UPDATED, {
      timer: 1500,
    });
  };

  refetchWithPagination = () => this.props.refetch(this.pagination);

  render() {
    const {
      classes, createDialog, closeDialog, createNewGroup,
    } = this.props;
    return (
      <div>

        <div className={classes.nav}>
          {(
            <Button
              data-testid="new-group"
              variant="raised"
              color="primary"
              onClick={() => createDialog({
                dialogContent:
                  (<CreateNewGroupDialog
                    closeDialog={closeDialog}
                    createNewGroup={createNewGroup}
                    refetch={this.refetchWithPagination}
                  />),
                disableClickOutside: true,
              })}
            >
              New Group
            </Button>
          )}
        </div>

        <Table
          onFetchData={this.fetchData}
          data={this.props.formGroups}
          loading={this.state.loading}
          columns={[
            ...columns,
            {
              Header: 'Action',
              id: null,
              filterable: false,
              sortable: false,
              Cell: row => (
                <TextButton
                  testId={`settings-form-group-${row.original.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.createDialog({
                      dialogContent: <SettingsDialog
                        onSubmit={this.settingsSubmitSnackbar}
                        formGroupId={row.original.id}
                        formGroupVis={row.original.visibility}
                        formGroupName={row.original.formGroupName}
                      />,
                    });
                  }}
                  text={messages.SETTINGS}
                />
              ),
            },
          ]}
          defaultSorted={[
            {
              id: 'formGroupName',
              desc: true,
            },
          ]}
          onRowClick={row => this.props.history.push(`/cp-user/form-manager/${row.original.id}`)}
          totalAmount={this.props.totalCount}
        />

      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
  withCreateNewGroup,
  withFormGroups,
)(FormGroupsC);
