import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAptTJnN0anggR5-v_8HR0sNXk6PAf0C_w",
    authDomain: "discord-clone-f3311.firebaseapp.com",
    databaseURL: "https://discord-clone-f3311.firebaseio.com",
    projectId: "discord-clone-f3311",
    storageBucket: "discord-clone-f3311.appspot.com",
    messagingSenderId: "461308272395",
    appId: "1:461308272395:web:83935b5f6166473f774c0e",
    measurementId: "G-VCVRS4VSB8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;