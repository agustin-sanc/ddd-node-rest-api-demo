import ID from "../value-objects/id";
import EmailAddress from "../value-objects/email-address";
import Password from "../value-objects/password";
import {UserTypes} from "../enums/user-types";

export default class User {
  private readonly id: ID;
  private readonly emailAddress: EmailAddress;
  private readonly password: Password;
  private readonly type: string;

  constructor(params: {
    id: ID,
    emailAddress: EmailAddress,
    password: Password,
    type: string
  })
   {
    if (!params) throw new Error('params must be defined');
    if (!params.id) throw new Error('id must be defined');
    if (!params.emailAddress) throw new Error('emailAddress must be defined');
    if (!params.password) throw new Error('password must be defined');
    if (!params.type) throw new Error('type must be defined');

    if (!(params.type in UserTypes))
      throw new Error(
        `Validation. Type ${ params.type } not allowed.`
      );

    this.id = params.id;
    this.emailAddress = params.emailAddress;
    this.password = params.password;
    this.type = params.type;
  }

  public getId(): ID {
    return this.id;
  }

  public getEmailAddress(): EmailAddress {
    return this.emailAddress;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getType(): string {
    return this.type;
  }
}