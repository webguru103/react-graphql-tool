// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core';

import { withDialog } from '../../shared/dialog/withDialog';
import Button from '../../shared/button/button';
import { compose } from '../../utility';
import { messages } from './constants';
import styles from './signingCompletedDialog.styles';

const checkmarkImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAA
CXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVeSU
RBVHgBzVpNcts2FH4PJLXoJjqCbhBl7biWTlDFsdeWN/Z4snByAtknsLPIeOJ0xuq6dqyc
QOykbpZWT1DmBu6uI4p4fYB+IoIERVqUkm9hURAAvg94eH8wQglofbmoiUi0EPEpENYJqI
oAtVkHggdADPjpgdsHIyn/gKji95r7D7AkEB6JVv+qKiqjYyBqx4Qt9nqfkH77uHHQhUei
MIFW/6LmeE6HH9tQHgJC7Mqh+7boruQmoFfcG3UQ6DWsDkwETovsSC4Crc8XDYHO1WJVwQ
EgDYjob5AyvpIoaijwKRHUc6hcNwqj017zKFjQbzGBl39dHoOE84wpfAL5SYaVbt7t3717
VyfptiTiXgaZgEk0F5HIJLB996GDRCeWoT7S6PR688iHJbB9d9EGcjoWIg8Cw+bvG68Gtv
Fon9gqfIAU7S8ruImdz+9P+CB3Un7KJJFKwC48+lHovijDfqdBqVZE3m3KbjywOj1LU6cE
gd3+u7r0vPvE7ARvbzYPVmmBNJSZFp7TTyHBZ8J7Zi6eiA++qkaed2tOyrtxug7hFdQqSz
68xAIbP9WUGTf7xwiM7bzBnKB3vXl4AmvElAQ/xlZb+aAdNunzbTMCautSnFQQjaI38B2g
SLCxeGG2EzqxXZgRmIQHRmfI5UxWBW3p+OwZzY35XdAE1OpDMrbpLhNklYVo5J2AoUrzu6
AJCFe0EwPZlcMPAGV1ODSx7oKrv7JLj/+O/jpUZxwgDtkTQ1WOZNf2TjmqnDteGFNxCaLB
H74YH9645VExOqwYY3sf3iPgGSdCHT6DfVvfie3359t4zC/qU4gKNMwBchj5sEJYnFWtxZ
7YNoazvE9GU13vIEnHHDRYpfpkeVoY/hTYxslQ9hKNzrAhhMpj412/wopgFZ5zZhGGmTHW
ZFHjYYRg78xbU4vNRWgNXZdBpvAjjjabr3K8VxcGvg0lrLmJCUW8k1UYBxoSIejlCKvLEV
5LHHA8MVN53oEnAgpCJ/Wuc4/CuXLQ6avQe1H/UoRnSKJ/zbbCBLTTQ6hOv6u8wUaiTOH1
uxGfJNrAOBiLZ5GB2ZRGomzhxy/CakIcMgnI+KE28XHjqMt9Eo5unsRKhB8jRoAkfRVIEJ
sMkeqLZrn5+bBtJfHnh7MVCa8micvGBkdIAMPuiy3IASsJzilWIXzLSGQUhIwCIYh8o72a
5dLnYSMRQykrrw6raJhtKl8QEVeJE5256AQ5kUmiJOE1UiJm9VdYIr1jKIBUEiUKr9THFj
GL8bsSkV51++6yDQWgSXxL/4LSVp7BDnPPbJtGzLoupMJSThj+gbiZSq3DrBvqPDqUqFN1
b54f7KsHvQOWtK0m3OFaakFZEJSsU82nu7NQQqVtYNZhOFPaSTFf64IucSbzhljqOSOgdw
GTNSCuAFxNqhZrhSrrp9RnA7PYgImBd+9vWepWysDmumpEL7/8ugeR7JrtXKfaN0s9iWg0
Glb20+qSKulex07YhFcWLq1OlSCgVCmtLgkTEkXNaxGoOCpVeM7TbcVl6wWHqtVL8lSpo5
ryc+47rDxQjopt/Rk/poUwAzbnTZs5z7xiyrhwUFAT9pYhMhbc5RCcGpYumcIrZBLQL7GX
Qean0RfWEsJBL+M+SzlMcP+rC+FucRjfSoTH88h5obKQwPTFjhuecO/FMdL43wrGJJCTcN
2GNVX9wDw3+jyec5LT6+eH55ADuQhMsdu/rEce3OYS5HHgs+W9KRK+FCIwhboaRXL3MnQ3
P/SOPf4sPYrAFJMSy2tWma1MfTYxUbOiF+RpWIrAPNQ5cfmAShR1ZJ1nDxMrgagEnP8Eji
MHWRfXRfE//TQIOTvinN4AAAAASUVORK5CYII=`;

type Props = {
  classes: Object,
  viewDocument: () => void,
}

export const SigningCompletedDialogC = ({ classes, viewDocument }: Props) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <div className={classes.checkmarkContainer}>
        <img alt="checkmark" src={checkmarkImage} />
      </div>
      <div className={classes.header}>
        {messages.SIGNING_COMPLETED}
      </div>
      <div className={classes.subheader}>
        {messages.WE_WILL_SEND_COPY}
      </div>
      <div className={classes.buttons}>
        <Button
          classes={{ button: classes.button }}
          onClick={viewDocument}
          testId="view-document-button"
        >
          {messages.VIEW_DOCUMENT}
        </Button>
      </div>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
  withDialog,
)(SigningCompletedDialogC);
