import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { Page as PDFPage } from 'react-pdf/dist/entry.webpack';
import { compose, stringTruncateWithEllipsis } from '../../../utility';
import type { AdaptedPage } from '../flowTypes';
import styles from './basePage.styles';
import PageFooter from './pageFooter';

const DOC_NAME_LENGTH = 75;

type Props = {
  page: AdaptedPage,
  classes: Object,
  children: React.Node,
  zoom: number,
  pdfPages: Object,
};

export class BasePageC extends React.PureComponent<Props> {

  render() {
    const {
      page,
      classes,
      children,
      zoom,
      pdfPages,
    } = this.props;

    const pageWidth = page.width || 0;
    const pageHeight = page.height || 0;

    return (
      <div
        className={classes.page}
        style={{
          width: pageWidth * zoom,
          height: pageHeight * zoom,
        }}
      >
        {pdfPages
          && pdfPages[page.documentId]
          && page.pageNumber
          && (
            <PDFPage
              className={classes.pdfPageRendered}
              loading=""
              pdf={pdfPages[page.documentId].pdf}
              pageNumber={page.pageNumber}
              width={pageWidth * zoom}
              renderAnnotationLayer={false}
            />
          )
        }
        <div className={classes.content}>
          {children}
        </div>
        <PageFooter
          formName={stringTruncateWithEllipsis(page.documentName, DOC_NAME_LENGTH)}
          totalPages={pdfPages && pdfPages[page.documentId] && pdfPages[page.documentId].documentLength}
          pageNumber={page.pageNumber}
          height={page.height}
          width={page.width}
          zoom={zoom}
        />
      </div>
    );
  }

}

export default compose(withStyles(styles))(BasePageC);
