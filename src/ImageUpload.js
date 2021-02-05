import React, { useState } from 'react';
// import { Button } from '@material-ui/core';

// Google Firebase
import firebase from 'firebase'
import { storage, db } from './firebase';

import './ImageUpload.css';


// Material UI
// import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

function ImageUpload({ username }) {
  const [openUpload, setOpenUpload] = useState(false);

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function 
        console.log(error);
      },
      () => {
        // complete function 
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            setOpenUpload(false);
          })
      }
    )
  }

  return (   
    <div>
      <button className="imageupload__open" onClick={() => setOpenUpload(true)}>+</button>

      <Modal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
      >
          <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
          </div>
      </Modal>
    </div>
  )
}

export default ImageUpload
