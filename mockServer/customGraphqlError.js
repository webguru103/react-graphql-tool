export class CustomAPIError extends Error {

  constructor(message, key, model, status, { validations } = {}) {
    super();
    this.extensions = {
      key,
      status,
      model,
      validations,
    };
    this.message = message;
  }

}
