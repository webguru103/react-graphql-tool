import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EditBrokerageDialog from './editBrokerageDialog';
import styles from './editBrokerage.styles';
import { compose } from '../../../utility';
import Button from '../../../shared/button/button';
import { withDialog } from '../../../shared/dialog/withDialog';

type Props = {
  classes: Object,
  createDialog: Function,
  brokerage: Object,
  refetchBrokerage: Function,
};

class EditBrokerageC extends React.PureComponent<Props, *> {

  render() {
    const {
      createDialog, brokerage, refetchBrokerage, classes,
    } = this.props;
    return (
      <React.Fragment>
        {
          <Button
            classes={{ button: classes.button }}
            text="Edit"
            onClick={() => createDialog({
              dialogContent: <EditBrokerageDialog
                id={brokerage.id}
                name={brokerage.brokerageName}
                phone={brokerage.phone}
                fax={brokerage.fax}
                country={brokerage.country}
                streetNumber={brokerage.streetNumber}
                streetName={brokerage.streetName}
                unit={brokerage.unit}
                city={brokerage.city}
                province={brokerage.province}
                postalCode={brokerage.postalCode}
                refetchBrokerage={refetchBrokerage}
              />,
            })}
          />
        }
      </React.Fragment>
    );
  }

}

export default compose(withDialog, withStyles(styles))(EditBrokerageC);
