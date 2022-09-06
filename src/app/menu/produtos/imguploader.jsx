import React, { Component } from 'react';
import storage from 'firebase';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: ''
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this
      .handleUpload
      .bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed', 
      snapshot => {
        // progress function ...
      }, 
      error => {
        // error function ...
        console.log(error);
      }, 
      () => {
        // complete function ...
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <div>
        <p></p>
        <input type="file" onChange={this.handleChange} />&nbsp; 
        <button onClick={this.handleUpload}>Upload</button> 
        <p></p>

        <img 
          src={this.state.url || 'http://via.placeholder.com/400x300'} 
          alt="Uploaded image"
          heigth="300"
          width="400"
        />


      </div>
    )
  }
}

export default ImageUpload;