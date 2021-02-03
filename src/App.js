import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // every new post's added, this code runs
      setPosts(snapshot.docs.map(doc => doc.data()))
    });
  }, [])

  return (
    <div className="App">

      <div className="app__header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" className="app__headerImage"/>
      </div>

      {
        posts.map(post => (
          <Post 
            username={post.username} 
            caption={post.caption}  
            imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;
