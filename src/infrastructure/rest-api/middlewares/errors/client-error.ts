export default class ClientError extends Error {
  name: string = 'ClientError';

  constructor(message: string) {
    super(message);
  }
}