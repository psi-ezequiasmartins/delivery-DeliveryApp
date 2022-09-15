import React, { useState } from 'react';
import { storage } from '../../config/api_firebase';
import { Link } from 'react-router-dom';
import MenuApp from '../menuapp';

export default function imageUpload(props) {
  const [img_upload, setImgUpload] = useState(null);
  const [img_progress, setImgProgress] = useState(0);
  const [img_url, setImgUrl] = useState('');

  function imgChange(e) {
    console.log(e.target.files);
    setImgUpload(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  }

  async function imgUpload() {
    var uploadTask = storage.ref(`produtos/${img_upload.name}`).put(img_upload);
    uploadTask.on('state_changed', 
      (snapshot) => {
        // progress function...
        var transf_progress = Math.round((snapshot.bytesTrasferred / snapshot.totalBytes) * 100);
        setImgProgress(transf_progress);
        console.log(img_progress);
      },
      (error) => {
        // error function ...
        console.log(error);
      },
    () => {
        // complete function ...
        storage.ref('produtos').child(img_upload.name).getDownloadURL().then(url => {
          setImgUrl(url);
          console.log(img_url);
        });
    });
  }

return (
    <div>
      <MenuApp/>
      <div className="row">
        <div className="mb-2">
          <img src={ img_url || "https://via.placeholder.com/500" } alt="Imagem selecionada" width="500" />
        </div>
        <div className="mb-2">
          <input type="file" onChange={imgChange} />{img_progress} %<br/>
          <button onClick={imgUpload} type="button" className="btn btn-primary" disabled={!file}><i className="fas fa-image"></i> UPLOAD</button>
          <Link to="/app/menu/produtos" className="btn btn-outline-primary btn-action">CANCELA</Link>
        </div>
      </div>
    </div>
  );
}