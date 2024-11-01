import { auth } from '../firebase/firebaseConfig'
import { signInAnonymously } from 'firebase/auth'

export const logInAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth)
    return userCredential
  } catch (error) {
    console.error('Error al iniciar sesión anónima:', error)
    throw error
  }
}
