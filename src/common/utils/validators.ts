import isEmail from 'validator/lib/isEmail';

export type ValidatorFnResponse = true | string;
export type ValidatorFn = (str: string) => ValidatorFnResponse;
type ValidatorGenerator = (errorMessage: string) => ValidatorFn;

export const isEmptyValidator: ValidatorGenerator = (errorMessage: string) => (str: string) =>
  str !== '' ? true : errorMessage;

export const isEmailValidator: ValidatorGenerator = (errorMessage: string) => (str: string) =>
  isEmail(str, { allow_ip_domain: false }) ? true : errorMessage;
