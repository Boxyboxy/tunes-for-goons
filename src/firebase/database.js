import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { firebaseApp } from "./configs";

const USER_KEY = "users";
const database = getDatabase(firebaseApp);

export function writeUserData(userId, name, email, imageUrl) {
  set(ref(database, "users/" + userId), {
    name: name,
    email: email,
    profile_picture: imageUrl,
  });
}

// not working
export function createUserListener(userId, callback = () => null) {
  const messagesRef = ref(database, `${USER_KEY}/${userId}`);
  return onValue(messagesRef, callback);
}
