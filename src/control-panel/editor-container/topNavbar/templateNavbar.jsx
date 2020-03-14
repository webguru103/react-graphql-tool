import * as React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '../../../shared/button/button';
import { withDialog } from '../../../shared/dialog/withDialog';
import TemplateBreadcrumb from '../templateBreadcrumb';
import { withGroupName } from '../api/editor.service';
import styles from './navbar.styles';
import { compose, get } from '../../../utility';
import messages, { EDITOR_MODE } from '../../../editor/constants';
import ConfirmPublishDialog from '../confirmPublishDialog';
import DiscardDraftDialog from '../discardDraftDialog';
import type { Form } from '../../../flowTypes';

type Props = {
  classes: Object,
  history: Object,
  createDialog: Function,
  mode: $Values<typeof EDITOR_MODE>,
  groupName: string,
  form: Form,
  transactionName: string,
  match: { params: { transactionId: string }},
  refreshForm: () => void,
};

export const TopNavbarC = ({
  classes,
  history,
  createDialog,
  mode,
  groupName,
  form,
  transactionName,
  refreshForm,
}: Props) => {

  const onArrowBack = () => {
    if (get(history, 'location.state.fromDraft', false)) {
      history.push(`/cp-user/editor/edit?formId=${form.id}`, { fromDraft: false });
      return;
    }

    history.push(`/cp-user/form-manager/${form.formGroupId}`);
  };

  return (
    <div className={classes.navBar}>
      <div className={classes.leftNav}>
        <IconButton
          classes={{ root: classes.arrowBackButton }}
          disableRipple
          onClick={onArrowBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <div className={classes.breadcrumbs}>
          <TemplateBreadcrumb
            groupName={groupName}
            formName={form && form.formName}
            published={mode === EDITOR_MODE.TEMPLATE_PUBLISHED}
          />
          <div className={classes.transactionName}>
            {transactionName}
          </div>
        </div>
      </div>
      <div className={classes.rightNav}>
        {
          mode === EDITOR_MODE.TEMPLATE_DRAFT
          && form
          && form.publishedVersionId
          && (
            <Button
              secondary
              onClick={() => {
                history.push(`/cp-user/editor/view?formId=${form.id}`, { fromDraft: true });
              }}
            >
              View Published Version
            </Button>
          )
        }
        {
          form && mode === EDITOR_MODE.TEMPLATE_DRAFT && (
            <Button
              testId="discard-draft"
              secondary
              disabled={!form.publishedVersionId}
              onClick={() => createDialog({
                dialogContent: <DiscardDraftDialog
                  formId={form.id}
                  formName={form.formName}
                  groupId={form.formGroupId}
                  refreshForm={refreshForm}
                />,
              })}
            >
              {(mode === EDITOR_MODE.TEMPLATE_DRAFT) && (messages.DISCARD_DRAFT)}
            </Button>
          )
        }
        {
          form && mode === EDITOR_MODE.TEMPLATE_DRAFT && get(form, 'formVersion.id', -1) === form.draftVersionId
            && (
              <Button
                testId="publish-form"
                onClick={() => createDialog({
                  dialogContent: <ConfirmPublishDialog
                    formName={form && form.formName}
                    formId={form.id}
                  />,
                })}
              >
                {messages.PUBLISH}
              </Button>
            )
          }
        {
          mode === EDITOR_MODE.TEMPLATE_PUBLISHED && form && get(form, 'formVersion.id', -1) === form.publishedVersionId
          && (
            <Button onClick={() => history.push(`/cp-user/editor/edit?formId=${form.id}`)}>Edit Draft</Button>
          )
        }
      </div>
    </div>
  );

};

export default compose(
  withRouter,
  withGroupName,
  withStyles(styles, { withTheme: true }),
  withDialog,
)(TopNavbarC);
