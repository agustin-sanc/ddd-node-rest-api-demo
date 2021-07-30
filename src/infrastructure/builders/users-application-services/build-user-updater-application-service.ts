import MongoPersistedUsersFinder from "../../mongo/services/users/mongo-persisted-users-finder";
import UserUpdater from "../../../application/services/user-updater";
import MongoPersistedUserUpdater from "../../mongo/services/users/mongo-persisted-user-updater";

export default function buildUserUpdaterApplicationService()
  : UserUpdater {
  const persistedUserUpdater = new MongoPersistedUserUpdater();

  const persistedUserFinderById =
    new MongoPersistedUsersFinder();

  const persistedUserFinderByEmailAddress =
    new MongoPersistedUsersFinder();

  return new UserUpdater({
    persistedUserUpdater,
    persistedUserFinderById,
    persistedUserFinderByEmailAddress
  });
}