export default class User {
  constructor(
    private readonly emailAddress: string,
    private readonly firstName: string,
    private readonly lastName: string
  ) {
    if (!emailAddress) throw new Error('emailAddress must be defined');
    if (!firstName) throw new Error('firstName must be defined');
    if (!lastName) throw new Error('lastName must be defined');
  }
}