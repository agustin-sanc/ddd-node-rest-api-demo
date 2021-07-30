import MongoPersistedUserCreator from "../../mongo/users/mongo-persisted-user-creator";
import UserCreator from "../../../application/user-creator";

export default function buildUserCreatorApplicationService()
  : UserCreator {
  const persistedUserCreator = new MongoPersistedUserCreator();

  return new UserCreator(persistedUserCreator);
}