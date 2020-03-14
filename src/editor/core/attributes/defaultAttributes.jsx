import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import styles from './defaultAttributes.styles';
import Attributes from './attributes';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import type { AdaptedField } from '../flowTypes';

type Props = {
  classes: Object,
  field: AdaptedField,
  pageIndex: string,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
}

const DefaultAttributesC = (props: Props) => {
  const {
    classes,
    field,
    pageIndex,
    handleFieldUpdate,
    handleFieldClone,
    handleDeleteFields,
    disabled,
  } = props;
  return (
    <Attributes
      activePageFieldId={field.id}
      pageIndex={pageIndex}
      fieldType={field.type}
      handleFieldUpdate={handleFieldUpdate}
      handleFieldClone={handleFieldClone}
      handleDeleteFields={handleDeleteFields}
      disabled={disabled}
    >
      <React.Fragment>
        <CollapsibleAttributeWrapper attributeName="General">
          <div className={classes.content}>
            <div className={classes.section}>
              <Typography variant="subheading" className={classes.subheading}>ID</Typography>
              <div className={classes.sectionRow}>
                <FormLabel className={classes.formLabel}>ID</FormLabel>
                <span>{field.id}</span>
              </div>
            </div>
            <Divider />
            <div className={classes.section}>
              <Typography variant="subheading" className={classes.subheading}>Label</Typography>
              <div className={classes.sectionRow}>
                <FormLabel className={classes.formLabel}>Label</FormLabel>
                <Input value={field.fieldName} />
              </div>
            </div>
            <Divider />
          </div>
        </CollapsibleAttributeWrapper>
      </React.Fragment>
    </Attributes>
  );
};

export default withStyles(styles, { withTheme: true })(DefaultAttributesC);
