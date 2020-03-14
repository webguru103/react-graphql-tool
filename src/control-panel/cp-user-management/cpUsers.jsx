import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import debounce from 'lodash.debounce';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router';
import styles from './cpUsers.styles';
import InviteNewUserDialog from './inviteNewCpUserDialog';
import TextButton from '../../shared/textButton/textButton';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import UnControlledTable from '../../shared/table/unControlledTable';
import { DEBOUNCE_TABLE_REFETCH_MS } from '../../configurations';
import {
  compose, get, pro, paginationOptions,
} from '../../utility';
import { withCpUsers, withRemoveCpUser } from './api/cpUsers.service';
import { columns } from './columns';
import c from './constants';
import RemoveCPUserDialog from './removeCpUserDialog';
import type { User } from './flowTypes';
import type { Pagination } from '../../flowTypes';
import { DEFAULT_PAGE_SIZE } from '../../constants';

type PropType = {
  classes: Object,
  createDialog: Function,
  createSnackbar: Function,
  onRefetch: Function,
  closeDialog: Function,
  removeCpUserAccess: Function,
  history: RouterHistory,
};

type StateType = {
    data: Array<User>,
    totalCount: number,
    error: React.Node,
    loading: boolean,
}
class UsersC extends React.PureComponent<PropType, StateType> {

  state = {
    data: [],
    totalCount: 0,
    error: '',
    loading: false,
  }

  pagination: Pagination = {
    offset: 0,
    first: DEFAULT_PAGE_SIZE,
    condition: {},
    orderBy: ['CREATED_AT_DESC'],
  };

  fetchData = debounce(async ({
    filtered, sorted, pageSize, page,
  }: {
    filtered: Array<{ [string]: string }>, sorted: Array<{ [string]: string }>, pageSize: number, page: number,
  } = {}) => {
    this.setState({ loading: true });

    const pagination = paginationOptions({
      page, pageSize, filtered, sorted,
    });

    this.pagination = pagination;
    const [err, returnedData] = await pro(this.props.onRefetch(pagination));

    if (err) {
      // TODO: Handle Error
      this.setState({ loading: false });
    } else if (returnedData) {
      const cpUsers = get(returnedData, 'data.cpUsers.nodes', []);
      this.setState({
        data: cpUsers,
        totalCount: get(returnedData, 'data.cpUsers.totalCount', 0),
        loading: false,
      });
    }
  }, DEBOUNCE_TABLE_REFETCH_MS);

  inviteSent = () => {
    const { createSnackbar } = this.props;
    createSnackbar(c.INVITE_SENT);
    this.props.onRefetch(this.pagination);
  }

  removeCpUser = async (id: string, systemAclId: string) => {
    const {
      createSnackbar, removeCpUserAccess, closeDialog,
    } = this.props;
    try {
      await removeCpUserAccess(id, systemAclId);
      createSnackbar(c.CP_USER_REMOVED);
      closeDialog();

      this.setState({ loading: true });
      const [err, returnedData] = await pro(this.props.onRefetch({
        fetchPolicy: 'cache-first',
      }));

      if (err) {
      // TODO: Handle Err
        this.setState({ loading: false });
      } else if (returnedData) {
        const cpUsers = get(returnedData, 'data.cpUsers.nodes', []);

        this.setState({
          data: cpUsers,
          totalCount: get(returnedData, 'data.cpUsers.totalCount', 0),
          loading: false,
        });
      }
    } catch (err) {
      this.setState({ error: c.REQUEST_ERROR });
    }
  };

  render() {
    const { classes, createDialog } = this.props;
    const {
      data, totalCount, error, loading,
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.nav}>
          <Button
            variant="raised"
            color="primary"
            onClick={() => createDialog({
              dialogContent: <InviteNewUserDialog inviteSent={this.inviteSent} />,
              disableClickOutside: true,
            })}
          >
      Invite New
          </Button>
        </div>
        <UnControlledTable
          data={data}
          loading={loading}
          columns={[
            ...columns,
            {
              Header: 'Action',
              id: null,
              filterable: false,
              sortable: false,
              Cell: (row: Object) => (
                row && row.original && (
                <TextButton
                  text="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.createDialog({
                      dialogContent: <RemoveCPUserDialog
                        removeUser={this.removeCpUser}
                        userId={get(row, 'original.userByUserId.id')}
                        systemAclId={get(row, 'original.id')}
                        error={error}
                      />,
                    });
                  }}
                />
                )),
            },
          ]}
          onFetchData={this.fetchData}
          defaultPageSize={c.DEFAULT_PAGE_SIZE}
          totalAmount={totalCount}
          onRowClick={row => this.props.history.push(`/cp-user/cp-user-management/${row.original.userByUserId.id}`)}
        />
      </React.Fragment>
    );
  }

}

export default compose(
  withRouter,
  withCpUsers,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
  withRemoveCpUser,
)(UsersC);
