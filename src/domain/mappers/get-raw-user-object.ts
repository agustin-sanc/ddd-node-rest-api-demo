import User from "../entities/user";

export default function getRawUserObject(user: User): {
  id: string,
  emailAddress: string,
  password: string,
  type: string
} {
  return {
    id: user.getId().getValue(),
    emailAddress: user.getEmailAddress().getValue(),
    password: user.getPassword().getValue(),
    type: user.getType()
  }
}