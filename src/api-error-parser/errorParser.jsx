import * as React from 'react';
import fm from './formattedMessages';

type ValidationType = {
  path: string,
  key: string,
  resource: string,
}

type ApiError = {
  message: string,
  locations: Array<{[string]: number}>,
  path: Array<string>,
  extensions: {
    key: string,
    status: number,
    model: string,
    targetModel: string,
    validations: Array<ValidationType>,
  }
}

export type ApiErrors = {
  networkError?: string,
  graphQLErrors?: Array<ApiError>,
};

export type ParsedApiError = {
  global?: React.Element,
  network?: React.Element,
  validations?: { [string]: React.Element }
};

class ErrorParser {

  OLD_PASSWORD_DOES_NOT_MATCH = 'provided old password does not match';

  INVALID_TOKEN = 'Invalid token type';

  _errorMap = {
    'cannot.update': fm.cannotUpdate,
    'invalid.data': fm.invalidData,
    'too.short': fm.tooShort,
    'is.empty': fm.isEmpty,
    'not.unique': fm.notUnique,

    'password.invalid': fm.passwordInvalid,
    generic: fm.generic,
  };

  _generateError = (message: string) => `${message.charAt(0).toUpperCase() + message.slice(1)}`;

  _parseGlobalError = (resource: string, key: string, message: string) => {
    if (this._errorMap[key]) {
      return this._errorMap[key](resource, message);
    }
    return this._generateError(message);
  };

  _parseFieldError = (resource: string, key: string) => this._errorMap[key] && this._errorMap[key](resource);

  parse = (errors: ApiErrors = {}): ParsedApiError => {
    let result = {};

    if (errors.networkError) {
      result.network = errors.networkError;
    }

    if (Array.isArray(errors.graphQLErrors) && errors.graphQLErrors.length) {
      const graphQLErrors = errors.graphQLErrors.reduce((acc, err) => {
        if (err.extensions) {
          const newAcc = { ...acc, global: '', validations: {} };
          newAcc.global = this._parseGlobalError(err.extensions.model, err.extensions.key, err.message);

          if (err.extensions && Array.isArray(err.extensions.validations)) {
            err.extensions.validations.forEach((field) => {
              const parsedError = this._parseFieldError(field.path, field.key);

              if (parsedError) {
                newAcc.validations[field.path] = parsedError;
              }
            });
          }

          if (!Object.keys(newAcc.validations).length) {
            delete newAcc.validations;
          }

          return newAcc;
        }
        return acc;
      }, {});

      result = { ...graphQLErrors };

    }

    return result;
  }

}

export default ErrorParser;
