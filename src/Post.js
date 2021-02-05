import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="{username}" src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"/>
    
        <h3 className="post__name">{username}</h3>
      </div>

      {/* header > avatar and username */}

      <img 
        className="post__image" 
        src={imageUrl} 
        alt=""/>
      {/* image */}

      <h4 className="post__text">
        <strong>{username}: </strong>
        {caption}
      </h4>
      {/* username and caption */}
    </div>
  )
}

export default Post
