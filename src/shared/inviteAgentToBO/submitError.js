export class SubmitError extends Error {

  constructor({ error, email }: { error: Object, email: string }) {
    super();
    this.email = email;
    this.error = error;
  }

  email = null;

  error = null;

}
