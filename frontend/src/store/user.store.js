import { createJSONStorage, persist } from 'zustand/middleware'

import { create } from 'zustand'
import { logInAnonymous } from '@@services/firebaseAuth'

/**
 * Zustand store to manage user authentication state.
 *
 * This store handles the user's authentication credentials, including the
 * ability to log in anonymously and track the user's authentication status.
 * The state is persisted in `sessionStorage` using `zustand`'s persist middleware.
 *
 * @module useUsersStore
 */

export const useUsersStore = create(
  persist(
    (set) => ({
      /**
       * Indicates whether the user is authenticated.
       * @type {boolean}
       */
      isAuthenticated: false,

      /**
       * Stores the authenticated user credentials.
       * Contains Firebase user credentials after login.
       * @type {Object|null}
       */
      authUser: null,

      /**
       * Logs in the user anonymously using Firebase authentication and updates the store.
       *
       * @async
       * @function logInAnonymous
       * @returns {Promise<void>} A promise that resolves when the user is logged in.
       * @throws {Error} Will throw an error if the login fails.
       */
      logInAnonymous: async () => {
        const userCredential = await logInAnonymous()
        set({ authUser: userCredential, isAuthenticated: true })
      },

      /**
       * Logs out the user by clearing the authentication state.
       *
       * @function logOut
       */
      logOut: () => {
        set({ authUser: null, isAuthenticated: false })
      },
    }),
    {
      name: 'zstore.user',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
