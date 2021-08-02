export default class InvalidCredentialsError extends Error {
  name: string = 'InvalidCredentialsError';

  constructor() {
    super('Invalid credentials.');
  }
}