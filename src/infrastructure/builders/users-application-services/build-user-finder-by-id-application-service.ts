import MongoPersistedUsersFinder from "../../mongo/users/mongo-persisted-users-finder";
import UserFinderById from "../../../application/user-finder-by-id";

export default function buildUserFinderByIdApplicationService()
  : UserFinderById {
  const persistedUsersFinder = new MongoPersistedUsersFinder();

  return new UserFinderById(
    persistedUsersFinder
  );
}