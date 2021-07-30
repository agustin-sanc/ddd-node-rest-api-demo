import UsersFinder from "../../../application/services/users-finder";
import MongoPersistedUsersFinder from "../../mongo/services/users/mongo-persisted-users-finder";

export default function buildUsersFinderApplicationService()
  : UsersFinder {
  const persistedUsersFinder = new MongoPersistedUsersFinder();

  return new UsersFinder(
    persistedUsersFinder
  );
}