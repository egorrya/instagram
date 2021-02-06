import React, { useState, useEffect } from 'react';
import './Post.css';
import { db } from './firebase';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setComment('');
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar 
          className="post__avatar" 
          alt="{username}" 
          src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"/>
    
        <h3 className="post__name">{username}</h3>
      </div>


      <img 
        className="post__image" 
        src={imageUrl} 
        alt=""/>

      <p className="post__text">
        <strong>{username}</strong> {caption}
      </p>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user?.displayName && (
        <form className="post__commentBox">
          <input 
            type="text" 
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}/>

          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}>Post</button>
        </form>
      )} 
      
    </div>
  )
}

export default Post
