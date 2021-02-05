import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';

// Google Firebase
import { db, auth } from './firebase';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';


// Styling for Material Ui
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    border: '0',
    outline: 'none',
    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
    padding: theme.spacing(2, 4, 3),
  },
}));

// Our App
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        setUser(authUser);      
      } else {
        // user has logged out     
        setUser(null)
      }
    }) 

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // every new post's added, this code runs
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="App">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <form className="app__signup">

              <h2 className="app__logo">Neinsta</h2>
              
              <Input 
                placeholder="Username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>

              <Input 
                placeholder="Email" 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

              <Input 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>

              <Button type="submit" onClick={signUp}>Sign Up</Button>

          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>

          <form className="app__signup">

              <h2 className="app__logo">Neinsta</h2>
             
              <Input 
                placeholder="Email" 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

              <Input 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>

              <Button type="submit" onClick={signIn}>Log In</Button>

          </form>
        </div>
      </Modal>

      <div className="app__header">
      
      <h2 className="app__logo">Neinsta</h2>
      
        {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>   
        )}
      
      
      </div>
      
      {
        posts.map(({id, post}) => (
          <Post 
            key={id}
            username={post.username} 
            caption={post.caption}  
            imageUrl={post.imageUrl}/>
        ))
      }

      {/* Image Upload */}
      {/* user? < is like "try catch method" */}
      {user?.displayName ? (
      <ImageUpload username={user.displayName} />
      ) : (
        <h3> </h3>
      )} 
      
    </div>
  );
}

export default App;
