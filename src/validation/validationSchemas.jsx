import * as yup from 'yup';
import brokerageC from '../control-panel/brokerage-management/constants';
import { MAX_LENGTHS } from '../account/account-settings/constants';
import { messages } from '../account/account-settings/formattedMessages';
import formC from '../control-panel/form-management/constants';

export const personValidationSchema = {
  firstName: yup.string().trim().required(messages.NAME_REQUIRED).max(MAX_LENGTHS.FIRST_NAME, messages.FIRST_NAME_TOO_LONG),
  lastName: yup.string().trim().required(messages.LAST_NAME_REQUIRED).max(MAX_LENGTHS.LAST_NAME, messages.LAST_NAME_TOO_LONG),
  phone: yup.string()
    .matches(/^$|^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im, brokerageC.INVALID_PHONE_NUMBER),
};

export const brokerageAddressValidationSchema = {
  name: yup.string().trim().required(brokerageC.EMPTY_BO_NAME).max(brokerageC.BROKERAGE_NAME_LENGTH, brokerageC.BO_NAME_TOO_LONG),
  unit: yup.string().max(brokerageC.UNIT_LENGTH, brokerageC.UNIT_TOO_LONG),
  phone: yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im, brokerageC.INVALID_PHONE_NUMBER)
    .required(brokerageC.EMPTY_PHONE),
  fax: yup.lazy(
    value => (value
      ? yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im, brokerageC.INVALID_PHONE_NUMBER)
      : yup.string()),
  ),
  country: yup.string().trim().required(brokerageC.EMPTY_COUNTRY).max(brokerageC.COUNTRY_LENGTH, brokerageC.COUNTRY_TOO_LONG),
  streetNumber: yup.string().matches(/^[0-9]*$/, brokerageC.INVALID_STREET_NUMBER)
    .required(brokerageC.EMPTY_STREET_NUM).max(brokerageC.STREET_NUM_LENGTH, brokerageC.STREET_NUM_TOO_LONG),
  streetName: yup.string().trim().required(brokerageC.EMPTY_STREET_NAME).max(brokerageC.STREET_NAME_LENGTH, brokerageC.STREET_NAME_TOO_LONG),
  city: yup.string().trim().required(brokerageC.EMPTY_CITY).max(brokerageC.CITY_LENGTH, brokerageC.CITY_TOO_LONG),
  province: yup.string().trim().required(brokerageC.EMPTY_PROVINCE).max(brokerageC.PROVINCE_LENGTH, brokerageC.PROVINCE_TOO_LONG),
  postalCode: yup.string().trim().required(brokerageC.EMPTY_POSTAL).max(brokerageC.POSTAL_LENGTH, brokerageC.POSTAL_TOO_LONG),
};

export const formValidationSchema = {
  name: yup.string().trim().required(formC.EMPTY_FORM_NAME).max(formC.FORM_NAME_LENGTH, formC.FORM_NAME_TOO_LONG),
};
