import { createContext, useContext, useEffect, useState } from 'react';
import '../firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const stateChanged = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return stateChanged;
  }, []);

  // signup
  async function signUp(email, password, username) {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    // update profile
    await updateProfile(user, {
      displayName: username,
    });

    setCurrentUser({
      ...user,
    });
  }

  // signIn
  function signIn(email, password) {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  }

  // signout
  function signout() {
    const auth = getAuth();

    return signOut(auth);
  }

  const data = {
    currentUser,
    signUp,
    signIn,
    signout,
  };

  return (
    <AuthContext.Provider value={data}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthContextProvider, useAuth };
