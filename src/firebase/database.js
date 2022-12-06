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

export function createPost(userId, payload) {
  const postRef = ref(database, `posts/${userId}`);
  const newMessageRef = push(postRef);
  return set(newMessageRef, payload);
}

export function editPost(userId, uuid, payload) {
  const postRef = ref(database, `posts/${userId}/${uuid}`);
  return set(postRef, payload);
}

export function deletePost(userId, uuid) {
  const postRef = ref(database, `posts/${userId}/${uuid}`);
  return remove(postRef);
}

export function createPostListener(userId, callback = () => null) {
  const messagesRef = ref(database, `posts/${userId}`);
  return onValue(messagesRef, callback);
}

// not working
export function createUserListener(userId, callback = () => null) {
  const messagesRef = ref(database, `${USER_KEY}/${userId}`);
  return onValue(messagesRef, callback);
}
