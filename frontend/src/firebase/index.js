// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB5zqIr3BgoCDGAD_-1sOFxKW3V2Mq0bX8',
  authDomain: 'pixelwar-6504c.firebaseapp.com',
  projectId: 'pixelwar-6504c',
  storageBucket: 'pixelwar-6504c.appspot.com',
  messagingSenderId: '862231369136',
  appId: '1:862231369136:web:d078bcaca3f957cde2f275',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
