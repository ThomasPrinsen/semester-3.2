import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7EbCbGLb02o0Fht5wP2KMqhFlfcq33PU",
    authDomain: "cryptoapi-19493.firebaseapp.com",
    projectId: "cryptoapi-19493",
    storageBucket: "cryptoapi-19493.appspot.com",
    messagingSenderId: "245296716671",
    appId: "1:245296716671:web:df71ab20d5df45ef34584a",
    measurementId: "G-T68GRZMVWB"
  };

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

// Exporteer de authenticatie module
export const auth = getAuth(app);