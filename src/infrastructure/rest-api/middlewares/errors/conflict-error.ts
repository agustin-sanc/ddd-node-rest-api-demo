export default class ConflictError extends Error {
  name: string = 'ConflictError';

  constructor(message: string) {
    super(message);
  }
}