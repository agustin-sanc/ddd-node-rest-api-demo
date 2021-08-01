export default class ForbiddenError extends Error {
  name: string = 'ForbiddenError';

  constructor() {
    super();
  }
}