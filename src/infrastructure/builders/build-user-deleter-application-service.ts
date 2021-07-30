import UserDeleter from "../../application/services/user-deleter";
import MongoPersistedUserDeleter from "../mongo/services/mongo-persisted-user-deleter";
import buildUsersFinderApplicationService from "./build-users-finder-application-service";

export default function buildUserDeleterApplicationService()
  : UserDeleter {
  const persistedUserDeleter = new MongoPersistedUserDeleter();
  const usersFinder = buildUsersFinderApplicationService();

  return new UserDeleter({
    persistedUserDeleter,
    usersFinder
  });
}