import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADGxZxS1UOwtbuTvZMjMEW0ZWhubZ5nik",
  authDomain: "the-dp-store.firebaseapp.com",
  projectId: "the-dp-store",
  storageBucket: "the-dp-store.appspot.com",
  messagingSenderId: "4583412996",
  appId: "1:4583412996:web:2023720b543b1e7dbcec51",
  measurementId: "G-YK36Y4MR61"
};


export const appfb = initializeApp(firebaseConfig);
// const db = appfb.firestore();
// export { db };

