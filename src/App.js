import React from 'react'
import './App.css';
import Post from './Post'

function App() {
  const [posts, setPosts] = useState([
    { 
      username="egorrya",
      caption="It Works",
      imageUrl="https://lh3.googleusercontent.com/proxy/1t8XOZlwJj9ftVykiE_kcLAo5S16bGP9XwxHXn_zq0VRzI0-mXGKTiw4n-d1K4CF9kD-Sd_1fFGkeXP-GlLXS9JrwPEhyt-9yLdR50CvjA" 
    },
    { 
      username="egorrya",
      caption="It Works",
      imageUrl="https://lh3.googleusercontent.com/proxy/1t8XOZlwJj9ftVykiE_kcLAo5S16bGP9XwxHXn_zq0VRzI0-mXGKTiw4n-d1K4CF9kD-Sd_1fFGkeXP-GlLXS9JrwPEhyt-9yLdR50CvjA" 
    }
  ]);

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
