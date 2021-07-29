export default class User {
  constructor(params: {
    emailAddress: string,
    firstName: string,
    lastName: string
  })
   {
    const { emailAddress, firstName, lastName } = params;

    if (!emailAddress) throw new Error('emailAddress must be defined');
    if (!firstName) throw new Error('firstName must be defined');
    if (!lastName) throw new Error('lastName must be defined');
  }
}