import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import MenuApp from '../menuapp';
import './upload.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
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
      this.setState(() => ({image}));
    }
  }

  handleUpload = () => {
    var {image} = this.state;
    var storage = firebase.storage();
    var uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
      (snapshot) => {
        // progress function ...
        var progress = Math.round((snapshot.bytesTrasferred / snapshot.totalBytes)*100);
        this.setState({progress});
      }, 
      (error) => {
        // error function ...
        console.log(error);
      }, 
    () => {
        // complete function ...
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        });
    });
  }

  render() {
    return (
      <div>
        <MenuApp/>       
        <div className="container-fluid titulo">
          <div className="offset-lg-3 col-lg-6">
            <h1>UPLOAD DE IMAGEM</h1>
            <p>Selecione o arquivo de imagem para enviar, e clique em Upload</p>
            <input type="file" onChange={this.handleChange} /> {this.state.progress}&nbsp;
            <p></p>
            <img
              src={this.state.url || "https://via.placeholder.com/500"}
              alt="Uploaded Image"
              width="500"
            />
            <div className="mb-3">
              <button onClick={this.handleUpload} type="button" className="btn btn-primary btn-action">UPLOAD</button>
              <Link to="/app/menu/produtos/" className="btn btn-outline-primary btn-action">CANCELAR</Link>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default ImageUpload;