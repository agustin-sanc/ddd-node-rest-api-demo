export default class UnprocessableEntityError extends Error {
  name: string = 'UnprocessableEntityError';

  constructor(message: string) {
    super(message);
  }
}