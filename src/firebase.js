import firebase from "firebase/app";
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyD1WdpxazMtZ4KYCZ274VFt_UVhqP4YtfA",
  authDomain: "mcity-ef8b3.firebaseapp.com",
  databaseURL: "https://mcity-ef8b3.firebaseio.com",
  projectId: "mcity-ef8b3",
  storageBucket: "mcity-ef8b3.appspot.com",
  messagingSenderId: "678697193623",
  appId: "1:678697193623:web:c0063f09670b699e"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');

export {
  firebase,
  firebaseMatches,
  firebasePromotions
}