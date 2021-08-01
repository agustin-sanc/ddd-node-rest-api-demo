export default class NotFoundError extends Error {
  name: string = 'NotFoundError';

  constructor(message: string) {
    super(message);
  }
}