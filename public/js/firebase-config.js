import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyA26Uo_vabW9odOM-vHMccYLJB32hFk0cs",
    authDomain: "loop-gerenciadordeepis.firebaseapp.com",
    projectId: "loop-gerenciadordeepis",
    storageBucket: "loop-gerenciadordeepis.firebasestorage.app",
    messagingSenderId: "282331856206",
    appId: "1:282331856206:web:538871f6b8cffeb57db21f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
