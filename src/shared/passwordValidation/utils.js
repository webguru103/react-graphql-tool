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
