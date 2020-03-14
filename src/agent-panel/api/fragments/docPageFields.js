import gql from 'graphql-tag';
import { docPageFieldInitialFragment } from './docPageFieldInitial';
import { docPageFieldSignatureFragment } from './docPageFieldSignature';
import { docPageFieldLineFragment } from './docPageFieldLine';
import { docPageFieldBoolFragment } from './docPageFieldBool';
import { docPageFieldTextFragment } from './docPageFieldText';
import { docPageFieldDateFragment } from './docPageFieldDate';
import type { DocPageFieldText } from './docPageFieldText';
import type { DocPageFieldDate } from './docPageFieldDate';
import type { DocPageFieldBool } from './docPageFieldBool';
import type { DocPageFieldSignature } from './docPageFieldSignature';
import type { DocPageFieldInitial } from './docPageFieldInitial';
import type { DocPageFieldLine } from './docPageFieldLine';

export type DocPageFields = {
  textFields: Array<?DocPageFieldText>,
  dateFields: Array<?DocPageFieldDate>,
  boolFields: Array<?DocPageFieldBool>,
  signatureFields: Array<?DocPageFieldSignature>,
  initialFields: Array<?DocPageFieldInitial>,
  lineFields: Array<?DocPageFieldLine>,
}

export const docPageFieldsFragment = gql`
  fragment docPageFields on DocPageFields {
    textFields: docPageFieldTexts {
      ...docPageFieldText
    }
    dateFields: docPageFieldDates {
      ...docPageFieldDate
    }
    boolFields: docPageFieldBools {
      ...docPageFieldBool
    }
    signatureFields: docPageFieldSignatures {
      ...docPageFieldSignature
    }
    initialFields: docPageFieldInitials {
      ...docPageFieldInitial
    }
    lineFields: docPageFieldLines {
      ...docPageFieldLine
    }
  }
  ${docPageFieldInitialFragment}
  ${docPageFieldSignatureFragment}
  ${docPageFieldLineFragment}
  ${docPageFieldBoolFragment}
  ${docPageFieldTextFragment}
  ${docPageFieldDateFragment}
`;
