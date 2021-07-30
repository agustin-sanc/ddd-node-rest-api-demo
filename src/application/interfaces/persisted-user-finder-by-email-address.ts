import EmailAddress from '../../domain/value-objects/email-address';
import User from '../../domain/entities/user';

export default interface PersistedUserFinderByEmailAddress {
  findPersistedUserByEmailAddress(emailAddress: EmailAddress): Promise<User>;
}