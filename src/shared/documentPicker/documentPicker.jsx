import * as React from 'react';
import { FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Description from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Checkbox from '@material-ui/core/Checkbox';
import documents from './mockDocuments';
import styles from './documentPicker.styles';

const FormLabel = ({ name = '' }: {name: string}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Description />
    <span style={{ paddingLeft: '15px' }}>
      {name}
    </span>
  </div>
);

type Props = {
  classes: Object,
  values?: Object,
  errors?: Object,
}

type StateType = {
  selectedIds: Array<string>,
  filterInput: string,
  visibleDocs: Object, // TODO replace with doc type
}

export class DocumentPickerC extends React.PureComponent<Props, StateType> {

  static defaultProps = {
    values: {},
    errors: {},
  };

  state = {
    selectedIds: [],
    filterInput: '',
    visibleDocs: documents,
  };

  handleFormsFilter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    // TODO make filtering
    const filteredDocs = Object.keys(documents)
      .reduce((acc, group) => ({ ...acc, [group]: documents[group].filter(doc => doc.name.includes(e.target.value)) }), {});

    this.setState({ filterInput: e.currentTarget.value, visibleDocs: filteredDocs });
  };

  handleFormPick = (e: SyntheticEvent<HTMLInputElement>) => (e.currentTarget.checked
    ? this.setState(prevState => ({ selectedIds: [...prevState.selectedIds, e.currentTarget.value] }))
    : this.setState(prevState => ({ selectedIds: prevState.selectedIds.filter(id => id !== e.currentTarget.value) }))
  );

  render() {
    const {
      classes, values, errors,
    } = this.props;
    const { selectedIds, filterInput, visibleDocs } = this.state;
    return (
      <Paper className={classes.documentPicker} elevation={0}>
        <div className={classes.accordeonHeader}>
          <Typography variant="title">
              Select Forms
          </Typography>
          {
            selectedIds.length > 0
            && (
            <Typography variant="subheading">
              {`${selectedIds.length} items selected`}
            </Typography>
            )
          }
        </div>
        <Input
          label="Filter"
          placeholder="Filter"
          className={classes.filterInput}
          value={filterInput}
          onChange={this.handleFormsFilter}
          disableUnderline
        />
        <FieldArray
          name="formPick"
          render={arrayHelpers => (
            <FormControl
              error={Boolean(errors && errors.formPick)}
            >
              {Object.keys(visibleDocs).map(group => (
                <ExpansionPanel key={group} classes={{ root: classes.expansionPanel }}>
                  <ExpansionPanelSummary classes={{ content: classes.expansionPanelSummary }} expandIcon={<ExpandMore />}>
                    <FolderOpen />
                    <Typography className={classes.heading}>{group}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
                    {visibleDocs[group].map(document => (
                      <FormControlLabel
                        control={(
                          <Checkbox
                            onChange={(e) => {
                              this.handleFormPick(e);
                              if (e.target.checked) {
                                arrayHelpers.push({ id: e.target.value, name: document.name });
                              } else {
                                const idx = values && values.formPick.indexOf(e.target.value);
                                arrayHelpers.remove(idx);
                              }
                            }}
                            value={document.id}
                            color="primary"
                          />
)}
                        key={document.name}
                        label={<FormLabel name={document.name} />}
                      />
                    ))}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
                }
              {(errors && errors.formPick) && <FormHelperText error>{errors.formPick}</FormHelperText>}
            </FormControl>
          )
            }
        />
      </Paper>
    );
  }

}

export default withStyles(styles, { withTheme: true })(DocumentPickerC);
