import * as React from 'react';
import DialogButtonBottom from '../../../shared/dialogButtonBottom/dialogButtonBottom';
import BOInput from './brokerageInput';
import { compose, pro, get } from '../../../utility';
import { withUpdateBrokerage } from './api/brokerageDetails.service';
import validator from '../../../validation/helpers';
import { brokerageAddressValidationSchema } from '../../../validation/validationSchemas';
import c from './constants';
import { withSnackbar } from '../../../shared/snackbar/withSnackbar';
import { withDialog } from '../../../shared/dialog/withDialog';
import { errParser } from '../../../api-error-parser';

type Props = {
  closeDialog: Function,
  updateBrokerage: Function,
  createSnackbar: Function,
  id: string,
  name?: string,
  phone?: number,
  fax?: number,
  country?: string,
  streetNumber?: string,
  streetName?: string,
  unit?: number,
  city?: string,
  province?: string,
  postalCode?: string,
  refetchBrokerage: Function,
};

type State = {
  networkError: React.Node,
};

class EditBrokerageOfficeDialogC extends React.Component<Props, State> {

  static defaultProps = {
    name: '',
    phone: '',
    fax: '',
    country: '',
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: '',
    postalCode: '',
  };

  state = {
    networkError: '',
  };

  updateBO = async ({
    name,
    phone,
    fax,
    country,
    streetNumber,
    streetName,
    unit,
    city,
    province,
    postalCode,
  }: {
      name: string,
      phone: string,
      fax: string,
      country: string,
      streetNumber: string,
      streetName: string,
      unit: string,
      city: string,
      province: string,
      postalCode: string,
    }) => {
    const { id, updateBrokerage, closeDialog } = this.props;
    this.setState({
      networkError: '',
    });

    const [err] = await pro(updateBrokerage({
      id,
      brokerageName: name,
      phone,
      fax,
      unit,
      streetNumber,
      streetName,
      city,
      province,
      postalCode,
      country,
    }));

    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({
        networkError: get(parsedErr, 'global'),
      });
      // TODO map to errors based on key returned by backend
      this.props.createSnackbar(c.ERROR_UPDATING_BO);
    } else {
      closeDialog();
      this.props.refetchBrokerage();
    }
  };

  render() {
    const {
      closeDialog,
      name,
      phone,
      fax,
      country,
      streetNumber,
      streetName,
      unit,
      city,
      province,
      postalCode,
    } = this.props;
    const { networkError } = this.state;
    return (
      <DialogButtonBottom
        closeDialog={closeDialog}
        title={c.UPDATE_BO}
        content={
          <BOInput networkError={networkError} />
        }
        initialValues={{
          name,
          phone,
          fax,
          country,
          streetNumber,
          streetName,
          unit,
          city,
          province,
          postalCode,
        }}
        validate={(values) => {
          const validationResult = validator(values, brokerageAddressValidationSchema);
          return validationResult.errors;
        }}
        actionButtonText={c.SUBMIT}
        onSubmit={this.updateBO}
      />
    );
  }

}

export default compose(
  withDialog,
  withUpdateBrokerage,
  withSnackbar,
)(EditBrokerageOfficeDialogC);
