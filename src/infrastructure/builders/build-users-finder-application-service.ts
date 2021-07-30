import UsersFinder from "../../application/services/users-finder";
import MongoPersistedUsersFinder from "../mongo/services/mongo-persisted-users-finder";

export default function buildUsersFinderApplicationService()
  : UsersFinder {
  const mongoPersistedUsersFinder = new MongoPersistedUsersFinder();

  const persistedUsersFinder = mongoPersistedUsersFinder;
  const persistedUserFinderById = mongoPersistedUsersFinder;
  const persistedUserFinderByEmailAddress = mongoPersistedUsersFinder;

  return new UsersFinder({
    persistedUsersFinder,
    persistedUserFinderById,
    persistedUserFinderByEmailAddress
  });
}