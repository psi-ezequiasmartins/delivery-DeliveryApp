import './index.css';
import { useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import { Impressao } from './impressao';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebase_app } from "../config/config.firebase";
import Swal from 'sweetalert2';
import Menu from "../../components/menu";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import api from '../config/config.mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Produtos() {
  const storage = getStorage(firebase_app);
  const vDelivery = "SANDUBA DO ZÉ"; // localStorage.getItem("delivery");
  const vToken = 1002; // localStorage.getItem("token");

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [produtos, setProdutos] = useState([]);

  const [produto_id, setProdutoID] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');
  const [delivery_id, setDeliveryID] = useState(vToken);

  useEffect(() => {
    let listagem = []; 
    api.get(`/listar/produtos/delivery/${vToken}`).then(async(result) => {
      result.data.forEach(snapshot => {
        if (snapshot.Nome.indexOf(busca) >=0) {
          listagem.push({
            ProdutoID: snapshot.ProdutoID,
            Nome: snapshot.Nome,
            Descricao: snapshot.Descricao,
            VrUnitario: snapshot.VrUnitario,
            UrlImagem: snapshot.UrlImagem,
            DeliveryID: snapshot.DeliveryID
          })
        }
      })
      setProdutos(listagem);
    })
  }, [busca, excluido, success, url_imagem, vToken]);

  async function imgUpload(id) {
    // let produto = produtos.find(item => item.ProdutoID === id);

    const { value: file } = await Swal.fire({
      confirmButtonText: 'ENVIAR',
      confirmButtonColor: '#3085d6',
      title: 'Selecione a imagem:',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Selecione a imagem'
      }
    })

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        Swal.fire({
          title: 'Imagem enviada com sucesso!',
          imageUrl: e.target.result,
          imageAlt: 'Imagem selecionada'
        })
      }
      reader.readAsDataURL(file)

      console.log('File', file.name);

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, '/produtos/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              // do nothing
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
            default:
              // do nothing 
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            console.log('File available at', downloadURL);
            setUrlImagem(downloadURL);
            // alert(id.toString()+' '+downloadURL); 
            api.put(`/update/imagem/produto/${id} `, {"url_imagem": downloadURL}).then(response => {
              console.log(response.data);
            });
          });
        }
      );
    }
  }

  function img_reset() {
    setUrlImagem(null);
  }

  async function Cadastrar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = {
        "ProdutoID": null, 
        "Nome": nome, 
        "Descricao": descricao, 
        "VrUnitario": vr_unitario,
        "UrlImagem": (url_imagem !== "" ? url_imagem : "https://via.placeholder.com/50x50"),
        "DeliveryID": vToken
      }
      await api.post('/add/produto/', json).then(response => {
        let produto = {
          ProdutoID: response.data.ProdutoID, 
          Nome: response.data.Nome, 
          Descricao: response.data.Descricao,
          VrUnitario: response.data.VrUnitario,
          UrlImagem: response.data.UrlImagem,
          DeliveryID: response.data.DeliveryID
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

  async function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = { 
        "ProdutoID": produto_id, 
        "Nome": nome, 
        "Descricao": descricao, 
        "VrUnitario": vr_unitario,
        "UrlImagem": url_imagem,
        "DeliveryID": delivery_id
      }
      await api.put(`/produto/update/${produto_id}`, json).then(response => {
        console.log(response.data);
      }).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((erro) =>{
        setMsg(erro);
        setSuccess('N');
      })
    }
  }

  function selectById(id){
    api.get(`/produto/${id}`)
    .then(result => {
      setProdutoID(result.data[0].ProdutoID);
      setNome(result.data[0].Nome); 
      setDescricao(result.data[0].Descricao);
      setVrUnitario(result.data[0].VrUnitario);
      setUrlImagem(result.data[0].UrlImagem);
      setDeliveryID(result.data[0].DeliveryID);
    })
  }

  function deleteByID(id) {
    api.delete(`/delete/produto/${id}`).then(async(result) => {
    setExcluido(id);
    })
  }

  function confirmaExclusao(id) {
    let produto = produtos.find(item => item.ProdutoID === id);

    Swal.fire({
      title: "Exclusão",
      text: `Confirma excluir ${produto.Nome} ?`,
      icon: 'warning',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteByID(id);
        Swal.fire(
            'Excluído!',
            'Produto removido.',
            'success'
        )
      } 
    });
  }

  const VisualizarPDF = async () => {
    console.log('report', produtos);
    const classeImpressao = new Impressao(produtos);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
  }

  function Listagem(props) {

    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col">ID</th>
            <th scope="col">Imagem</th>
            <th scope="col">Produto</th>
            <th scope="col">Vr. Unitário</th>
            <th scope="col">Delivery</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((produto) => {
              return (
                <tr key={produto.ProdutoID}>
                  <th scope="row">{produto.ProdutoID}</th>
                  <td>
                    <img src={produto.UrlImagem} alt="imagem" width="50" />
                  </td>
                  <td>{produto.Nome}</td>
                  <td>{produto.VrUnitario}</td>
                  <th scope="row">{produto.DeliveryID}</th>
                  <td>
                    <Link to="#" onClick={()=>props.select(produto.ProdutoID)} title="EDITAR PRODUTO" data-bs-toggle="modal" data-bs-target="#md_editarproduto"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.image_upload(produto.ProdutoID)} title="UPLOAD DE IMAGEM"><i className="fas fa-file-image icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(produto.ProdutoID)} title="EXCLUIR PRODUTO"><i className="fas fa-trash-alt icon-action red"></i></Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="produtos" />
        </div>

        <div className="col py-3 me-3">

          <h1>Cadastro de Produtos - {vDelivery}</h1>
          <div className="row">
            <div className="col-6">
              <div className="mt-2">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novoproduto">
                  <i className="fas fa-address-book"></i> NOVO PRODUTO
                </button>
                <button onClick={VisualizarPDF} className="btn btn-warning"><i className="fas fa-file-pdf"></i> PDF</button>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mt-2">
                <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Produto" aria-describedby="bt_pesquisar"/>
              </div>
            </div>
          </div>
          <Listagem array={produtos} select={selectById} delete={confirmaExclusao} image_upload={imgUpload} />

          {/* md_novoproduto */}

          <div className="modal fade" id="md_novoproduto" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">NOVO PRODUTO</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-2">
                          <label htmlFor="nome" className="form-label">Nome do Produto</label>
                          <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="descricao" className="form-label">Descrição</label>
                          <textarea onChange={e => setDescricao(e.target.value)} value={descricao} className="form-control" style={{height: 152}} rows="3" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Imagem do Produto:<br/>
                        <img className="ref" src={ "https://via.placeholder.com/500" } alt="Imagem do Produto" width="320" />
                      </div>

                      {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                      {success === 'S' ? redirect('/app/produtos/') : null}
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={img_reset}>CANCELAR</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
                </div>

              </div>
            </div>
          </div>

          {/* md_editarproduto */}

          <div className="modal fade" id="md_editarproduto" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">EDITAR PRODUTO</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="mb-2">
                          <label htmlFor="nome" className="form-label">Nome do Produto</label>
                          <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="descricao" className="form-label">Descrição</label>
                          <textarea onChange={e => setDescricao(e.target.value)} value={descricao} className="form-control" style={{height: 152}} rows="3" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Imagem do Produto:<br/>
                        <img className="ref" src={ url_imagem || "https://via.placeholder.com/500" } alt="Imagem do Produto" width="320" />
                      </div>

                      {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                      {success === 'S' ? redirect('/app/produtos/') : null}

                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={img_reset}>CANCELAR</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Editar}>SALVAR</button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
