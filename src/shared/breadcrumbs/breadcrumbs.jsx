import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { withStyles } from '@material-ui/core/styles';
import { compose } from '../../utility';
import styles from './breadcrumbs.styles';
import routes from './routes';

type PropType = {
  breadcrumbs: Array<React.Element>,
  classes: Object
}

const Breadcrumbs = ({ breadcrumbs, classes }: PropType) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key} className={classes.breadcrumb}>
        {index < breadcrumbs.length - 1
          ? (
            <React.Fragment>
              <NavLink to={breadcrumb.props.match.url}>
                {breadcrumb}
              </NavLink>
              {breadcrumb.key !== '/' && <i> &gt; </i> }
            </React.Fragment>
          )
          : breadcrumb
        }
      </span>
    ))}
  </div>
);

export default compose(
  withBreadcrumbs(routes),
  withStyles(styles),
)(Breadcrumbs);
