import MongoPersistedUserCreator from "../mongo/services/mongo-persisted-user-creator";
import UserCreator from "../../application/services/user-creator";
import buildUsersFinderApplicationService from "./build-users-finder-application-service";

export default function buildUserCreatorApplicationService()
  : UserCreator {
  const persistedUserCreator = new MongoPersistedUserCreator();
  const usersFinder = buildUsersFinderApplicationService();

  return new UserCreator({
    persistedUserCreator,
    usersFinder
  });
}