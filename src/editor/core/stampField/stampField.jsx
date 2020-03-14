import * as React from 'react';
import { compose, pro, noop } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';
import { EDITOR_MODE } from '../../constants';
import { CreateSignature } from '../../../shared/signature';
import type {
  AdaptedInitialField,
  AdaptedSignatureField,
  Data,
  UpdatePageFieldInput,
} from '../flowTypes';
import { withSnackbar } from '../../../shared/snackbar';
import { logger } from '../../../logger';
import Initials from './initials';
import Signature from './signature';
import type { AppUser } from '../../../shared/authorization';
import type { UserStamps } from '../../../agent-panel/api/fragments/userStamps';
import UpdateSignature from '../../../shared/signature/update/updateSignature';
import { withAppUser, withUpdateUserState } from '../../../shared/authorization';

type PropType = {
  mode: $Keys<typeof EDITOR_MODE>,
  field: AdaptedInitialField | AdaptedSignatureField,
  createDialog: ({dialogContent: React.Element}) => void,
  closeDialog: () => void,
  createStampsData: (docId: number, value: string, assignee: ?string, ?{ isInitials: boolean }) => Promise<Data>,
  handleStampsFieldsSign: (field: UpdatePageFieldInput, docId: number) => void,
  dataReference: number,
  docId: number,
  pageIndex: number,
  value: string,
  createSnackbar: (React.Element) => void,
  wipe: (fieldId: number, pageIndex: number, docId: number) => void,
  user: AppUser,
  createUserStamps: (userSignature: { stamp: string }, userInitial: { stamp: string }) => Promise<void>,
  setUser: (user: AppUser) => void,
  signed: number,
  currentUser: string,
  zoom: number,
  color: { red: number, green: number, blue: number },
  disabled: boolean,
  handleFieldsUpdate: (Array<{id: number, dataReference: ?number, pageIndex: number, type: 'signature' | 'initial'}>, { sign: boolean }) => void,
  handleFieldsDelete: (Array<number>) => void,
}

const userStampsExist = (userStamps: ?UserStamps) => userStamps && userStamps.userSignature && userStamps.userSignature.stamp
  && userStamps.userInitial && userStamps.userInitial.stamp;

class StampFieldC extends React.PureComponent<PropType, { loading: boolean }> {

  state = {
    loading: false,
  };

  componentDidMount() {
    const {
      mode, currentUser, value, field: { assignee, temporary },
    } = this.props;

    if (mode === EDITOR_MODE.INSTANCE_PREPARATION && !temporary) {
      if ((currentUser === assignee) && !value) {
        this.handleClick();
      }
    }
  }

  componentDidUpdate(prevProps) {
    // if the assignee of the field is switched in attribute panel
    // need to either sign or wipe the field
    const {
      currentUser, field: { assignee },
    } = this.props;

    const {
      field: { assignee: prevAssignee },
    } = prevProps;

    if (prevAssignee && assignee) {

      if (prevAssignee === currentUser && assignee !== currentUser) {
        this.wipeField();
      }

      if (prevAssignee !== currentUser && assignee === currentUser) {
        this.handleClick();
      }

    }
  }

  handleClick = async () => {
    const {
      createDialog,
      closeDialog,
      currentUser,
      user: { firstName, lastName, userStampsByUserId },
      signed,
      handleFieldsDelete,
      mode,
      field: { id },
      dataReference,
    } = this.props;

    if (!userStampsExist(userStampsByUserId)) {
      createDialog({
        dialogContent: (
          <CreateSignature
            fullName={currentUser}
            onSubmit={(values) => {
              this.createStamps(values);
              this.setUserStamps(values);
              closeDialog();
            }}
            onClose={() => {
              closeDialog();
              // in prep mode also delete a field if user closed a dialog
              if (mode === EDITOR_MODE.INSTANCE_PREPARATION) {
                handleFieldsDelete([id]);
              }
            }}
          />
        ),
        disableClickOutside: true,
        disableEsc: true,
      });
      return;
    }

    // if it's a first field to be signed, show update signature dialog
    if (signed === 0 && !dataReference) {
      createDialog({
        dialogContent: (
          <UpdateSignature
            useExistingStamps={() => {
              closeDialog();
              this.createStamps();
            }}
            createNewStamps={() => {
              createDialog({
                dialogContent: (
                  <CreateSignature
                    fullName={`${firstName || ''} ${lastName || ''}`}
                    onSubmit={(values) => {
                      this.createStamps(values);
                      this.setUserStamps(values);
                      closeDialog();
                    }}
                    onClose={() => {
                      closeDialog();
                      // in prep mode also delete a field if user closed a dialog
                      if (mode === EDITOR_MODE.INSTANCE_PREPARATION) {
                        handleFieldsDelete([id]);
                      }
                    }}
                  />
                ),
                disableClickOutside: true,
                disableEsc: true,
              });
            }}
            signature={userStampsByUserId && userStampsByUserId.userSignature && userStampsByUserId.userSignature.stamp}
            initials={userStampsByUserId && userStampsByUserId.userInitial && userStampsByUserId.userInitial.stamp}
          />
        ),
        disableClickOutside: true,
        disableEsc: true,
      });
      return;
    }

    this.createStamps();
  };

  // method is used to update user stamps on user object and BE
  setUserStamps = async (values) => {
    const { setUser, user, createUserStamps } = this.props;

    if (values.signature && values.initials) {

      const newUserStampsByUserId = {
        userSignature: {
          id: -1,
          stamp: values.signature,
        },
        userInitial: {
          id: -1,
          stamp: values.initials,
        },
      };

      const updatedUser = {
        ...user,
        userStampsByUserId: newUserStampsByUserId,
      };

      // call BE but don't care about response
      createUserStamps({ stamp: values.signature }, { stamp: values.initials });

      // set app user
      setUser(updatedUser);
    }
  };

  createStamps = async (values: ?{signature: string, initials: string}) => {
    const {
      createStampsData, handleStampsFieldsSign, field: { id, type, assignee }, docId, pageIndex, createSnackbar, user, handleFieldsUpdate, mode,
    } = this.props;
    let { dataReference } = this.props;

    this.setState({ loading: true });

    // if signature reference has not yet been created, create it first
    // grab signature svg from user object
    // or from values if it's created with signature dialog
    if (!dataReference && (values || user.userStampsByUserId)) {

      let svgValueToUse = '';

      if (type === 'initial') {
        svgValueToUse = values
          ? values.initials
          : user.userStampsByUserId && user.userStampsByUserId.userInitial && user.userStampsByUserId.userInitial.stamp;
      } else {
        svgValueToUse = values
          ? values.signature
          : user.userStampsByUserId && user.userStampsByUserId.userSignature && user.userStampsByUserId.userSignature.stamp;
      }

      const [err, stampsData] = await pro(createStampsData(docId, svgValueToUse || '', assignee, { isInitials: type === 'initial' }));
      if (err) {
        logger.log(err);
        createSnackbar('Something went wrong');
        this.setState({ loading: false });
        return;
      }
      dataReference = stampsData.id;
    }

    // in signing mode call signOrWipe
    // in prep mode call updateField
    if (mode === EDITOR_MODE.SIGNING) {
      await handleStampsFieldsSign(
        {
          id,
          dataReference,
          pageIndex,
          type,
        },
        docId,
      );
    } else {
      await handleFieldsUpdate([{
        id,
        dataReference,
        pageIndex,
        type,
      }], { sign: true });
    }

    this.setState({ loading: false });
  };

  wipeField = () => {
    const {
      mode, field: { id, type }, pageIndex, docId, wipe, handleFieldsUpdate,
    } = this.props;

    if (mode === EDITOR_MODE.SIGNING) {
      wipe(id, pageIndex, docId);
      return;
    }

    // in prep mode to wipe a field - clear it's dataReference
    handleFieldsUpdate([{
      id,
      dataReference: null,
      pageIndex,
      type,
    }], { sign: true });
  };

  render() {
    const {
      mode, value, field: {
        type, width, height, assignee, stampLookupUrl,
      }, zoom, currentUser, disabled,
    } = this.props;

    const { loading } = this.state;

    if (!value && (mode === EDITOR_MODE.INSTANCE_VIEW)) {
      return null;
    }

    if (type === 'initial') {
      return (
        <Initials
          value={value}
          onClick={(mode === EDITOR_MODE.SIGNING) && assignee === currentUser ? this.handleClick : noop}
          stampLookupUrl={stampLookupUrl}
          wipe={this.wipeField}
          loading={loading}
          height={height}
          width={width}
          zoom={zoom}
          mode={mode}
          disabled={disabled}
        />
      );
    }

    return (
      <Signature
        value={value}
        onClick={(mode === EDITOR_MODE.SIGNING) && assignee === currentUser ? this.handleClick : noop}
        stampLookupUrl={stampLookupUrl}
        wipe={this.wipeField}
        loading={loading}
        height={height}
        width={width}
        zoom={zoom}
        mode={mode}
        disabled={disabled}
      />
    );
  }

}

export default compose(withDialog, withSnackbar, withUpdateUserState, withAppUser)(StampFieldC);
