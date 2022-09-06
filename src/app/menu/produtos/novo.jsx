import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp';
import './novo.css';

import firebase from '../../config/api_firebase';
import api from '../../config/api_mysql';

function Novo(props) {
  // const [id_produto, setIdProduto] = useState(null);
  const [id_categoria, setIdCategoria] = useState(null);
  const [id_fornecedor, setIdFornecedor] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_custo, setVrCusto] = useState(0.00);
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');

  const [file, setFile] = useState(null);

  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState('N');

  function ChangeImg(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function UploadImg() {
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    var storage = firebase.storage();
    var uploadTask = storage.ref(`images/${file.name}`).put(file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
            // ...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrlImagem(downloadURL);
        });
      }
    );
  }

  function CadastrarDados() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
        const json = {
          "id_produto": null, 
          "id_categoria": id_categoria, "id_fornecedor": id_fornecedor, "nome": nome, "descricao": descricao, 
          "vr_custo": vr_custo, "vr_unitario": vr_unitario,
          "url_imagem": url_imagem
        }
        api.post('/produto/add/', json).then(response => {
          let produto = {
            id_produto: response.data.id_produto, 
            id_categoria: response.data.id_categoria, id_fornecedor: response.data.id_fornecedor,
            nome: response.data.nome, descricao: response.data.descricao,
            vr_custo: response.data.vr_custo, vr_unitario: response.data.vr_unitario,
            url_imagem: response.data.url_imagem
          }
          console.log(produto);
      }).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((erro) => {
        setMsg(erro);
        setSuccess("N");
      })  
    }
  }

  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">

        <div className="offset-lg-3 col-lg-6">
          <h1>CADASTRAR NOVO PRODUTO</h1>
          <form> 

            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Produto</label>
              <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
            </div>

            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição</label>
              <textarea onChange={e => setDescricao(e.target.value)} class="form-control" rows="3" id="descricao" ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria</label>
              <select onChange={e => setIdCategoria(e.target.value)} class="form-select" id="categoria" placeholder="Selecione a categoria"> 
                <option value="1">OFERTAS</option>
                <option value="2">SANDUICHES</option>
                <option value="3">HOTDOGS</option>
                <option value="4">BEBIDAS</option>
                <option value="5">PRATOS & PORÇÕES</option>
                <option value="6">SUPERMERCADO</option>
                <option value="7">FRUTAS & VERDURAS</option>
                <option value="8">MEDICAMENTOS</option>
                <option value="9">GÁS DE COZINHA</option>
                <option value="10">FLORICULTURA</option>
                <option value="11">ÁGUA MINERAL</option>
                <option value="12">PEÇAS E SERVIÇOS</option>
                <option value="13">DISTRIBUIDORAS</option>
              </select>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="fornecedor" className="form-label">Fornecedor</label>
                <select onChange={e => setIdFornecedor(e.target.value)} class="form-select" id="fornecedor" placeholder="Selecione o Fornecedor"> 
                  <option value="1">Fornecedor 1 ...</option>
                  <option value="2">Fornecedor 2 ...</option>
                  <option value="3">Fornecedor 3 ...</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label htmlFor="vr_custo" className="form-label">Valor Custo</label>
                <input onChange={e => setVrCusto(e.target.value)} type="text" className="form-control" id="vr_custo" />
              </div>
              <div className="col-sm-3">
                <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                <input onChange={e => setVrUnitario(e.target.value)} type="text" className="form-control" id="vr_unitario" />
              </div>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="url_imagem" className="form-label">URL/Imagem</label>
              <input onChange={e => setUrlImagem(e.target.value)} type="text" className="form-control" id="url_imagem" />
            </div> */}

            <p></p>
            <div className="row">
              <div className="col-sm-6">
                <p>Selecione um arquivo de imagem para enviar, e clique em Upload</p>
                <input type="file" onChange={ChangeImg}/> 
              </div>
              <div className='col-sm-6'>
                <img
                  src={url_imagem || "https://via.placeholder.com/150"}
                  alt="Uploaded Image"
                  width="150"
                />
              </div>
            </div>

            <div className="mb-3">
              <Link to="/app/menu/produtos/" className="btn btn-outline-primary btn-action">CANCELAR</Link>
              <button onClick={CadastrarDados} type="button" className="btn btn-primary btn-action">SALVAR</button>
              <button onClick={UploadImg} type="button" className="btn btn-primary btn-action"><i className="fas fa-address-book"></i> UPLOAD IMAGEM</button>
            </div>

            {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
            {success === 'S' ? <Redirect to='/app/menu/produtos/'/> : null}

          </form>
        </div>

      </div>
    </div>
  );
}

export default Novo;