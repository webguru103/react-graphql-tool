import snakeCase from 'lodash.snakecase';

const compose2 = (f, g) => (...args) => f(g(...args));
export const compose = (...fns: Array<Function>) => fns.reduce(compose2);

/**
 * Use this function to catch async/await errors without
 * using a try catch block in the style of golang error handling.
 * wrap function to be awaited in pro()
 * eg. const [err, data] = await pro(this.props.asycMethod({});
 */
export function pro(promise: Promise<any>) {
  return promise.then(data => [null, data])
    .catch(err => [err]);
}

export function isObject(obj: any) {
  return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]';
}

// function can be used to check if the value is actually defined
// it excludes 0, for example
export function isDefined(value: any) {
  return value !== null && value !== undefined;
}

/**
 * Pass this function a string or array that refers to a property in a nested object 'nestedObj'
 * eg. 'brokerage.name' or ['brokerage', 'name']
 * and it will resolve the correct field:
 * return nestedObj.brokerage.name;
 */

export function get(obj: Object = {}, path: string | Array<string>, defaultValue: any) {
  const paths = Array.isArray(path) ? path : path.split('.');

  if (paths.length > 1 && (isObject(obj) || Array.isArray(obj)) && obj[paths[0]]) {
    return get(obj[paths[0]], paths.slice(1), defaultValue);
  }

  if (paths.length === 1 && (isObject(obj) || Array.isArray(obj)) && isDefined(obj[paths[0]])) {
    return obj[paths[0]];
  }
  return defaultValue;
}

/**
 + * Can be used as a attributes empty function so that when
 + * an empty function is needed, there is no need to declare another.
 + * For example, may be used in default proptypes to return an empty
 + * function when no function passed in.
 + */
export const noop = (f: any) => f;

export const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export function randomNegativeInt() {
  return -Math.round(Math.random() * 10000000000);
}

export function randomInt() {
  return Math.round(Math.random() * 10000000000);
}

export function randomId(range: number) {
  return Math.random().toString(36).substring(2, (range + 2));
}

export function isEmailValid(input: string) {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(input).toLowerCase());
}

export function parseEmailsFromString(value: string): ?Array<string> {

  const splitEmails = value.trim().split(/[\s,;\t\n]+/);

  if (splitEmails.every((splitEmail: string) => isEmailValid(splitEmail))) {
    return Array.from(new Set(splitEmails));
  }
  return null;
}

export function generateFilterValues(filters: Array<{ [string]: string }>) {
  const filterBy = {};

  filters.forEach((filter) => {
    filterBy[`${filter.id}`] = filter.value;
    return filterBy;
  });

  return filterBy;
}

export function generateOrderByValues(sorted: Array<{ [string]: string }>): Array<string> {

  return sorted.map((sort) => {
    const name = snakeCase(sort.id).toUpperCase();
    const order = sort.desc ? 'ASC' : 'DESC';

    return `${name}_${order}`;
  });
}

export function paginationOptions({
  page, pageSize, filtered, sorted,
}: { page: number, pageSize: number, filtered: Array<{ [string]: string }>, sorted: Array<{ [string]: string }>}) {
  return {
    offset: page * pageSize,
    first: pageSize,
    condition: generateFilterValues(filtered),
    orderBy: sorted.length ? generateOrderByValues(sorted) : [],
  };
}

export function bytesToText(bytes: number = 0): string {
  let result = bytes;
  const gap = 1024;
  if (Math.abs(bytes) < gap) {
    return `${result} B`;
  }
  const units = ['KB', 'MB', 'GB', 'TB'];
  let unitIndex = -1;
  do {
    result /= gap;
    unitIndex += 1;
  } while (Math.abs(result) >= gap && unitIndex < units.length - 1);
  return `${result.toFixed(1)} ${units[unitIndex]}`;
}

export function identity(value: any) {
  return value;
}

// hashMapByUniqueField will return object of objects from an array of objects 'items'.
// Each object passed in will be indexed by key in this new object.
// Should only be used if 'field' specified is guaranteed to be unique among all objects in items
// (eg. the id field is usually unique), otherwise a second item will overwrite the first.
export function hashMapByUniqueField(items: Array<any>, field: string) {
  if (items) {
    const obj = {};
    items.forEach((item) => {
      obj[item[field]] = item;
    });
    return obj;
  }
  return {};
}

// stringTruncateWithEllipsis takes in a string, and if it has length greater
// than maxChars, will truncate it to that length minus 3 and add an ellipsis.
// Therefore, maxChars specifies the maximum number of characters to expect in the
// output, including the ellipsis, if added.
export function stringTruncateWithEllipsis(targetString: string, maxChars: number): string {
  if (!targetString) {
    return '';
  }
  return (targetString.length <= maxChars)
    ? targetString
    : `${targetString.substring(0, maxChars - 3)}...`;
}
