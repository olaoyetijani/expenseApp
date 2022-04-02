import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDUPhCUMEey_xAmUj423csHcrj-tjtAnJE",
    authDomain: "expenseapp-d476d.firebaseapp.com",
    projectId: "expenseapp-d476d",
    storageBucket: "expenseapp-d476d.appspot.com",
    messagingSenderId: "369229235130",
    appId: "1:369229235130:web:4f796a92be00785e671383",
    measurementId: "G-4QD01GJS5W"
}



const db = firebase.initializeApp(firebaseConfig);
//const db = getFirestore(firebaseApp);

export default db;
