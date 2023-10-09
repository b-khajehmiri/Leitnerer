// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDewUXg5V3dJVAxgxre6AgThMQDwOlMFk",
    authDomain: import.meta.env.BASEURL,
    projectId: "leitnerer-e8694",
    storageBucket: "leitnerer-e8694.appspot.com",
    messagingSenderId: "638600074061",
    appId: "1:638600074061:web:5ecbb87150b48990f9dd04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



