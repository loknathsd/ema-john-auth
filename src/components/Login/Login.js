// import './App.css';
import { initializeApp } from 'firebase/app'
import { GithubAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';


const app = initializeApp(firebaseConfig);
function Login() {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  const [newUser, setNewUser] = useState(false)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })
  // SignIn With Google
  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        setLoggedInUser(signedInUser)
        history.replace(from);

        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      const userSignOut = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(userSignOut)
    }).catch((error) => {

    });

  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          console.log(res)
        })
        .catch(error => {
          const errorMessage = error.message;
          const newUserInfo = { ...user }
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo)

        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(res)
        })
        .catch(error => {
          const errorMessage = error.message;
          const newUserInfo = { ...user }
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo)

        });
    }
    e.preventDefault()
  }
  const handleBlur = (e) => {
    // console.log(event.target.name, event.target.value)
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      //  console.log(isEmailValid);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value)
      isFormValid = isPasswordValid && passwordNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }

  }
  // Facebook with Sign In

  const fbProvider = new FacebookAuthProvider();
  const handleFbSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorMessage)
      });
  }
  // SignIn With GitHub
  const ghProvider = new GithubAuthProvider();
  const handleGitSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)
        setUser(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorMessage,email)
      });
  }


  return (
    <div style={{textAlign:'center'}}>
      <br /><br />
      {
        user.isSignIn ? <button onClick={handleSignOut}>SignOut</button>
          : <button onClick={handleSignIn}>SignIn With Google</button>


      } <br /><br />
      <button onClick={handleFbSignIn} style={{ fontSize: '20px' }}>SignIn with Facebook</button><br /><br />
      <button onClick={handleGitSignIn}>SignIn With Github</button>
    
      {
        user.isSignIn && <div>
          <h1>welcome {user.name}</h1>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New User SignUp</label>
      <form onSubmit={handleSubmit} action="">
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" />}<br />
        <input name="email" onBlur={handleBlur} type="text" placeholder="Your Email" required /><br />
        <input name="password" onBlur={handleBlur} type="password" placeholder="Your Password" required /><br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}> {user.error}</p>
      {user.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : 'loggedIn'} successfully</p>}

    </div>
  );
}

export default Login;
