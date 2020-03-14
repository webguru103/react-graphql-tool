import React from 'react';
import {
  Select, InputBase, withStyles, MenuItem,
} from '@material-ui/core';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';
import styles from './signeesDropdown.styles';
import { compose, stringTruncateWithEllipsis } from '../../../utility';
import { withAppUser } from '../../../shared/authorization';
import type { AppUser } from '../../../shared/authorization';

const TRUNCATE_NAME_TO_CHAR_NO = 19;

type Props = {
  signees: Array<?SessionSignee>,
  currentSignee: string,
  handleChange: (string) => void,
  classes: Object,
  colorMap: {
    [string]: {
      main: {
        red: string, blue: string, green: string, alpha: string,
      },
      stamps: {
        red: string, blue: string, green: string, alpha: string,
      },
    },
  },
  user: AppUser,
}

const BootstrapInput = withStyles(() => ({
  root: {
    'label + &': {
      marginTop: 10,
    },
  },
  input: {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    flexFlow: 'row',
    position: 'relative',
    backgroundColor: 'white',
    fontSize: 14,
    height: 40,
    width: 250,
    padding: '0 0 0 14px',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const SigneesDropdown = ({
  currentSignee, signees, handleChange, classes, colorMap, user,
}: Props) => (
  <Select
    value={currentSignee}
    onChange={e => handleChange(e.target.value)}
    input={<BootstrapInput name="signee" id="signee-select" />}
    MenuProps={{
      MenuListProps: {
        disablePadding: true,
      },
    }}
  >
    {
      signees.map((signee) => {
        const signeeName = signee && signee.sessionSigneeName;
        if (!signeeName) {
          return null;
        }

        const signeeNameTruncated = stringTruncateWithEllipsis(signeeName, TRUNCATE_NAME_TO_CHAR_NO);
        return (
          signee && (
            <MenuItem style={{ fontSize: 14 }} value={signeeName} key={signeeName}>
              <div
                className={classes.colorDot}
                style={{
                  backgroundColor: `rgba(
                    ${colorMap[signeeName || ''].main.red},
                    ${colorMap[signeeName || ''].main.green},
                    ${colorMap[signeeName || ''].main.blue},
                    ${colorMap[signeeName || ''].main.alpha}
                  )`,
                }}
              />
              {signee.userByUserId && signee.userByUserId.email === user.email ? `${signeeNameTruncated || ''} (Me)` : signeeNameTruncated}
            </MenuItem>
          )
        );
      })
    }
  </Select>
);

export default compose(withStyles(styles), withAppUser)(SigneesDropdown);
