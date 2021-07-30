import MongoPersistedUserCreator from "../../mongo/services/users/mongo-persisted-user-creator";
import UserCreator from "../../../application/services/user-creator";
import MongoPersistedUsersFinder from "../../mongo/services/users/mongo-persisted-users-finder";

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