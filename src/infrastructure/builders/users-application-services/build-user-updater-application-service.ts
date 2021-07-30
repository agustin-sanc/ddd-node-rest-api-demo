import UserUpdater from "../../../application/services/user-updater";
import MongoPersistedUserUpdater from "../../mongo/services/users/mongo-persisted-user-updater";
import buildUsersFinderApplicationService from "./build-users-finder-application-service";

export default function buildUserUpdaterApplicationService()
  : UserUpdater {
  const persistedUserUpdater = new MongoPersistedUserUpdater();
  const usersFinder = buildUsersFinderApplicationService();

  return new UserUpdater({
    persistedUserUpdater,
    usersFinder
  });
}