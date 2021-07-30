import UserDeleter from "../../../application/user-deleter";
import MongoPersistedUserDeleter from "../../mongo/users/mongo-persisted-user-deleter";

export default function buildUserDeleterApplicationService()
  : UserDeleter {
  const persistedUserDeleter = new MongoPersistedUserDeleter();

  return new UserDeleter(
    persistedUserDeleter
  );
}