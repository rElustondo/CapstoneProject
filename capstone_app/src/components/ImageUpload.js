import React, { useEffect, useState } from 'react';
import { Button, Container, Grid} from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as ref2, set } from 'firebase/database';
import { TextField } from '@mui/material';

function ImageUpload({userDataFromDatabase}) {
  const [images, setImages] = useState([]);
  const db = getDatabase()
  const user = JSON.parse(localStorage.getItem("user-capstone"))
  const storage = getStorage();
  const [downloadedUrls, setDownloadedUrls] = useState([])
  console.log(downloadedUrls, "downloadedUrls");
  const handleImageChange = (event) => {
    const fileList = event.target.files;
    if (fileList.length > 0 && fileList.length <= 3) {
      const newImages = [];
      for (let i = 0; i < fileList.length; i++) {
        newImages.push(fileList[i]); // store the actual File object
      }
      setImages(newImages);
    }
  };
  //useEffect(() => {//
function getRandomNumber() {
    return Math.floor(Math.random() * 10000) + 1;
  }
function writeUserImages(urls, index){
    set(ref2(db, 'users/' + user.uid + '/images/' + index), urls[0]?urls[0]:"empty");
  }
function handleUpload() {
    debugger
    images.forEach((image, index) => {
        debugger
        const storageRef = ref(storage, `images/${getRandomNumber()}`);

      const file = image;
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(storageRef)
        .then((url) => {
          let urls = downloadedUrls.concat(url)
            debugger
          writeUserImages(urls, index)
          setDownloadedUrls(urls)
      }) 
    });
    });
  }
  console.log(images, "images");
  const renderImageInputs = () => {
    return (
      <input         accept="image/*"         id="image-input"         type="file"         multiple         onChange={handleImageChange}         style={{ marginTop: '40px' }}       />
    );
  };

  const renderImages = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {images.map((imageUrl, index) => (
          <Grid item key={index}>
            <img src={imageUrl} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </Grid>
        ))}
      </Grid>
    );
  };
console.log(userDataFromDatabase, "userDataFromDatabase");
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {renderImageInputs()}
      </Grid>
      {/* <Grid container spacing={2} justifyContent="center">
        {renderImages()}
      </Grid> */}
      
      {userDataFromDatabase && userDataFromDatabase.images && userDataFromDatabase.images.length >0 && userDataFromDatabase.images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} style={{ maxHeight: '256px', maxWidth: '256px' }} alt={`User Image ${index + 1}`} />
      ))}
      <Grid container justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Grid>
    </Container>
  );
}

export default ImageUpload;