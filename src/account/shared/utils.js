export function isValidPassword(value: string) {
  return !/^([^A-Z]+|[^a-z]+|[^0-9]+|.{0,7})$/.test(value);
}

// TODO - remove after agentSignUp/login branches are merged
export const isEmailValid = (input: string) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(input).toLowerCase());
};

export function hasUpperCase(value: string) {
  const re = /[A-Z]/;
  return re.test(value);
}

export function hasLowerCase(value: string) {
  return value.toUpperCase() !== value;
}

export function hasDigit(value: string) {
  const re = /[0-9]/;
  return re.test(value);
}

export function hasCorrectLength(value: string) {
  return value.length >= 8;
}
