export default class UnauthorizedError extends Error {
  name: string = 'UnauthorizedError';

  constructor() {
    super();
  }
}