import MongoPersistedUserCreator from "../../mongo/users/mongo-persisted-user-creator";
import UserCreator from "../../../application/user-creator";
import MongoPersistedUsersFinder from "../../mongo/users/mongo-persisted-users-finder";

export default function buildUserCreatorApplicationService()
  : UserCreator {
  const persistedUserCreator = new MongoPersistedUserCreator();

  const persistedUserFinderByEmailAddress =
    new MongoPersistedUsersFinder();

  return new UserCreator({
    persistedUserCreator,
    persistedUserFinderByEmailAddress
  });
}