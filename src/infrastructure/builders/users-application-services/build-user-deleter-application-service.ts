import UserDeleter from "../../../application/services/user-deleter";
import MongoPersistedUserDeleter from "../../mongo/services/users/mongo-persisted-user-deleter";

export default function buildUserDeleterApplicationService()
  : UserDeleter {
  const persistedUserDeleter = new MongoPersistedUserDeleter();

  return new UserDeleter(
    persistedUserDeleter
  );
}