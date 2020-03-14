import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormGroupName } from './api/form.service';
import { compose } from '../../utility';

const FormGroupNameBreadCrumbC = ({ formGroupName }: {formGroupName: string}) => (
  <span>{formGroupName || ''}</span>
);

export default compose(
  withRouter,
  withFormGroupName,
)(FormGroupNameBreadCrumbC);
