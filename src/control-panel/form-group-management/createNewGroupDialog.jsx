import * as React from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import * as yup from 'yup';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import styles from './createNewGroupDialog.styles';
import { compose, pro } from '../../utility';
import c, { FORM_GROUP_VISIBILITY } from './constants';
import { errParser } from '../../api-error-parser/index';
import validator from '../../validation/helpers';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';

type Props = {
  classes: Object,
  closeDialog: Function,
  createNewGroup: Function,
  refetch: () => {},
  createSnackbar: (React.Element) => {},
};

type State = {
  error: React.Node,
};

export class CreateNewGroupDialogC extends React.Component<Props, State> {

  state = {
    error: '',
  };

  resetError = () => {
    this.setState({
      error: '',
    });
  };

  createNewGroup = async ({
    groupName, visibility,
  }: { groupName: string, visibility: string }) => { // eslint-disable-line
    const {
      closeDialog, createNewGroup, refetch, createSnackbar,
    } = this.props;
    const [err] = await pro(createNewGroup({
      formGroupName: groupName.trim(),
      visibility,
    }));

    if (err) {
      const parsedErr = errParser.parse(err);
      if (parsedErr.network) {
        this.setState({
          error: c.REQUEST_ERROR,
        });
        return;
      }
      if (parsedErr.global) {
        this.setState({
          error: parsedErr.global,
        });
      }
    } else {
      refetch();
      createSnackbar(c.GROUP_CREATED_SUCCESSFULLY);
      closeDialog();
    }
  };

  render() {
    const { classes, closeDialog } = this.props;
    const { error } = this.state;

    return (
      <Formik
        initialValues={{
          groupName: '',
          visibility: FORM_GROUP_VISIBILITY.EVERYONE,
          affiliation: [],
        }}
        onSubmit={this.createNewGroup}
        validate={(values) => {
          const validationResult = validator(values, {
            groupName: yup.string().trim().required(c.EMPTY_GROUP_NAME),
          });

          return validationResult.errors;
        }}
        render={({
          values, touched, errors, handleSubmit, setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle
              classes={{ root: classes.dialogTitle }}
              disableTypography
            >
              New Form Group
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <TextField
                error={touched.groupName && Boolean(errors.groupName)}
                helperText={touched.groupName && (errors.groupName)}
                label="Group Name"
                id="groupName"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.textFieldInputWrapper,
                    input: classes.textFieldInput,
                    error: classes.textFieldInputError,
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
                  required: true,
                }}
                onChange={(e) => {
                  this.resetError();
                  setFieldValue('groupName', e.target.value);
                }}
                value={values.groupName}
                name="groupName"
              />
              <FormControl component="fieldset" className={classes.radioControl}>
                <FormLabel component="legend" focused={false} className={classNames(classes.textFieldLabel, classes.label)}>Visible to</FormLabel>
                <RadioGroup
                  aria-label="Visible to"
                  classes={{ root: classes.radioGroup }}
                  value={values.visibility}
                  name="visibility"
                  onChange={(e) => {
                    this.resetError();
                    setFieldValue('visibility', e.target.value);
                  }}
                >
                  <FormControlLabel
                    data-testid="form-group-visible-everyone"
                    value={FORM_GROUP_VISIBILITY.EVERYONE}
                    control={
                      <Radio classes={{ root: classes.radio }} disableRipple />}
                    label="Everyone"
                  />
                  <FormControlLabel
                    data-testid="form-group-visible-orea"
                    value={FORM_GROUP_VISIBILITY.OREA}
                    control={
                      <Radio classes={{ root: classes.radio }} disableRipple />}
                    label="Limit to OREA Affiliated"
                  />
                  <FormControlLabel
                    data-testid="form-group-visible-no-one"
                    value={FORM_GROUP_VISIBILITY.NO_ONE}
                    control={<Radio classes={{ root: classes.radio }} disableRipple />}
                    label="No One"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.errorMessage} error={Boolean(error)}>
                <FormHelperText>{error}</FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions
              classes={{
                root: classes.dialogActions,
                action: classes.dialogAction,
              }}
            >
              <Button variant="raised" color="default" onClick={closeDialog}>Cancel</Button>
              <Button
                data-testid="create-new-form-group"
                variant="raised"
                color="primary"
                type="submit"
                disabled={Boolean(error)
                  || Boolean(touched.groupName && errors.groupName)
                  || Boolean(touched.visibility && errors.visibility)
                }
              >
                Create
              </Button>
            </DialogActions>
          </form>
        )}
      />

    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
)(CreateNewGroupDialogC);
