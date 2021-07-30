import MongoPersistedUsersFinder from "../../mongo/services/users/mongo-persisted-users-finder";
import UserFinderById from "../../../application/services/user-finder-by-id";

export default function buildUserFinderByIdApplicationService()
  : UserFinderById {
  const persistedUsersFinder = new MongoPersistedUsersFinder();

  return new UserFinderById(
    persistedUsersFinder
  );
}