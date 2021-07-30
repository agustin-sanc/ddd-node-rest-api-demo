import UsersFinder from "../../../application/users-finder";
import MongoPersistedUsersFinder from "../../mongo/users/mongo-persisted-users-finder";

export default function buildUsersFinderApplicationService()
  : UsersFinder {
  const persistedUsersFinder = new MongoPersistedUsersFinder();

  return new UsersFinder(
    persistedUsersFinder
  );
}