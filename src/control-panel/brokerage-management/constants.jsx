import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;
const BROKERAGE_NAME_LENGTH = 100;
const UNIT_LENGTH = 10;
const STREET_NUM_LENGTH = 10;
const STREET_NAME_LENGTH = 100;
const CITY_LENGTH = 40;
const PROVINCE_LENGTH = 20;
const COUNTRY_LENGTH = 20;
const POSTAL_LENGTH = 10;

export default {
  DEFAULT_PAGE_SIZE,
  BROKERAGE_NAME_LENGTH,
  UNIT_LENGTH,
  STREET_NUM_LENGTH,
  STREET_NAME_LENGTH,
  CITY_LENGTH,
  PROVINCE_LENGTH,
  COUNTRY_LENGTH,
  POSTAL_LENGTH,
  EMPTY_BO_NAME: <FormattedMessage id="empty-bo-name" defaultMessage="Please input the brokerage office name" />,
  EMPTY_PHONE: <FormattedMessage id="empty-phone" defaultMessage="Please input a phone number" />,
  EMPTY_STREET_NUM: <FormattedMessage id="empty-street-num" defaultMessage="Please input a street number" />,
  EMPTY_STREET_NAME: <FormattedMessage id="empty-street-name" defaultMessage="Please input a street name" />,
  EMPTY_CITY: <FormattedMessage id="empty-city" defaultMessage="Please input a city" />,
  EMPTY_PROVINCE: <FormattedMessage id="empty-province" defaultMessage="Please select a province" />,
  EMPTY_POSTAL: <FormattedMessage id="empty-postal" defaultMessage="Please input a postal code" />,
  EMPTY_COUNTRY: <FormattedMessage id="empty-country" defaultMessage="Please select a country" />,
  EMPTY_FIELD: <FormattedMessage id="empty-field" defaultMessage="Field cannot be empty" />,
  INVALID_EMAIL: <FormattedMessage id="invalid-email" defaultMessage="Invalid Email" />,
  INVALID_PHONE_NUMBER: <FormattedMessage id="invalid-phone-number" defaultMessage="Invalid Phone Number" />,
  INVALID_FAX_NUMBER: <FormattedMessage id="invalid-fax-number" defaultMessage="Invalid Fax Number" />,
  INVALID_STREET_NUMBER: <FormattedMessage id="invalid-street-number" defaultMessage="Invalid Street Number" />,
  BO_EXISTS: <FormattedMessage id="bo-exists" defaultMessage="Brokerage Office already exists" />,
  EMAIL_EXISTS: <FormattedMessage id="email-exists" defaultMessage="User with that email already exists" />,
  BO_NAME_TOO_LONG: <FormattedMessage id="bo-name-too-long" defaultMessage="Sorry, brokerage office name must be less than 100 characters" />,
  UNIT_TOO_LONG: <FormattedMessage id="unit-too-long" defaultMessage="Sorry, unit must be less than 10 characters" />,
  STREET_NUM_TOO_LONG: <FormattedMessage id="street-num-too-long" defaultMessage="Sorry, street number must be less than 10 characters" />,
  STREET_NAME_TOO_LONG: <FormattedMessage id="street-name-too-long" defaultMessage="Sorry, street name must be less than 100 characters" />,
  CITY_TOO_LONG: <FormattedMessage id="city-too-long" defaultMessage="Sorry, city must be less than 40 characters" />,
  PROVINCE_TOO_LONG: <FormattedMessage id="province-too-long" defaultMessage="Sorry, province name must be less than 20 characters" />,
  COUNTRY_TOO_LONG: <FormattedMessage id="country-too-long" defaultMessage="Sorry, country name must be less than 100 characters" />,
  POSTAL_TOO_LONG: <FormattedMessage id="postal-too-long" defaultMessage="Sorry, postal code must be less than 10 characters" />,
  ERROR_ADDING_BO: <FormattedMessage id="error-adding-bo" defaultMessage="Sorry, there was an error adding your brokerage office!" />,
  ERROR_ADDING_ADMIN: <FormattedMessage id="error-adding-admin" defaultMessage="Sorry, there was an error adding your user!" />,
  ERROR_CHECKING_EMAIL: <FormattedMessage id="error-checking-email" defaultMessage="Sorry, there was an error finding that email" />,
  ERROR_GETTING_USER: <FormattedMessage id="error-getting-user" defaultMessage="Sorry, there was an error finding that user" />,
  ERROR_GETTING_BROKERAGES: <FormattedMessage id="error-gettting-brokerages" defaultMessage="Sorry, there was an error retrieving brokerages" />,
  SUCCESS_CREATE_BROKERAGE: <FormattedMessage id="success-create-brokerage" defaultMessage="Brokerage Office created" />,
  SUCCESS_INVITE_ADMIN: <FormattedMessage id="success-invite-admin" defaultMessage="Invitation sent" />,
  SETTINGS: <FormattedMessage id="settings" defaultMessage="Settings" />,
  SET_SUPER: <FormattedMessage id="set-super" defaultMessage="Set Super Admin" />,
  NEW_BO: <FormattedMessage id="new-bo" defaultMessage="New Brokerage Office" />,
  CREATE: <FormattedMessage id="create" defaultMessage="Create" />,
  INVITE: <FormattedMessage id="invite" defaultMessage="Invite" />,
  ADD: <FormattedMessage id="add" defaultMessage="Add" />,
  SUBMIT: <FormattedMessage id="submit" defaultMessage="Submit" />,
  CREATE_CONT: <FormattedMessage id="create-cont" defaultMessage="Create and Continue" />,
  NOT_NOW: <FormattedMessage id="not-now" defaultMessage="Not Right Now" />,
  WANT_TO_ADD_ADMIN: <FormattedMessage id="want-to-add-admin" defaultMessage="Adding an Admin to this BO?" />,
  ADD_ADMIN: <FormattedMessage id="add-admin" defaultMessage="Add Admin Access" />,
  INVITE_ADMIN: <FormattedMessage id="invite-admin" defaultMessage="Invite New Admin" />,
};
