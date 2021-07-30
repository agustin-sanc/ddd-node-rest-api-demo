import MongoPersistedUserCreator from "../mongo/services/mongo-persisted-user-creator";
import UserCreator from "../../application/services/user-creator";
import MongoPersistedUsersFinder from "../mongo/services/mongo-persisted-users-finder";

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