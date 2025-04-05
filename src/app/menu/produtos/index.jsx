/**
 * src/app/menu/produtos/index.jsx
 */

import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Impressao } from './impressao';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebase_app } from "../../../config/apiFirebase";
import './index.css';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
import Menu from '../../../components/menu';
import api from '../../../config/apiAxios';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Produtos() {
  const storage = getStorage(firebase_app);
  const vDelivery = localStorage.getItem("vDelivery"); 
  const vID = localStorage.getItem("vID");

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [produtos, setProdutos] = useState([]);
  const [delivery_id, setDeliveryID] = useState(vID);
  const [produto_id, setProdutoID] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const result = await api.get(`/api/listar/produtos/delivery/${vID}`);
        const searchLower = busca.toLowerCase();
        const listagem = result.data.filter((snapshot) =>
          snapshot.PRODUTO_ID.toString().includes(searchLower) ||
          snapshot.PRODUTO_NOME.toLowerCase().includes(searchLower) ||
          snapshot.DESCRICAO.toLowerCase().includes(searchLower) ||
          snapshot.VR_UNITARIO.toLowerCase().includes(searchLower)
        );
        setProdutos(listagem);
      } catch (error) {
        console.error('Error fetching professores:', error);
      }
    }
    fetchProdutos();
  }, [busca, excluido, msg, vID]);

  async function imgUpload(id) {
    // let produto = produtos.find(item => item.PRODUTO_ID === id);

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
        }, (error) => {
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
        }, () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            console.log('File available at', downloadURL);
            setUrlImagem(downloadURL);
            // alert(id.toString()+' '+downloadURL); 
            api.put(`/api/update/imagem/produto/${id} `, {"url_imagem": downloadURL}).then(response => {
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
      const info = {
        "PRODUTO_ID": null, 
        "PRODUTO_NOME": nome, 
        "DESCRICAO": descricao, 
        "VR_UNITARIO": vr_unitario,
        "URL_IMAGEM": (url_imagem !== "" ? url_imagem : "https://via.placeholder.com/50x50"),
        "DELIVERY_ID": vID
      }
      await api.post('/api/add/produto', info).then(() => {
        setMsg('Produto cadastrado com sucesso!');
        setSuccess('S');
      }).catch((error) => {
        setMsg(error.message);
        setSuccess("N");
      })
    }
  }

  function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      let info = { 
        "PRODUTO_ID": produto_id, 
        "PRODUTO_NOME": nome, 
        "DESCRICAO": descricao, 
        "VR_UNITARIO": vr_unitario,
        "URL_IMAGEM": url_imagem,
        "DELIVERY_ID": delivery_id
      }
      api.put(`/api/update/produto/${produto_id}`, info).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((error) =>{
        setMsg(error.message);
        setSuccess('N');
      })
    }
  }

  function selectById(id){
    api.get(`/api/produto/${id}`).then((result) => {
      setProdutoID(result.data[0].PRODUTO_ID);
      setNome(result.data[0].PRODUTO_NOME); 
      setDescricao(result.data[0].DESCRICAO);
      setVrUnitario(result.data[0].VR_UNITARIO);
      setUrlImagem(result.data[0].URL_IMAGEM);
      setDeliveryID(result.data[0].DELIVERY_ID);
    })
  }

  function deleteByID(id) {
    api.delete(`/api/delete/produto/${id}`).then(() => {
    setExcluido(id);
    })
  }

  function confirmaExclusao(id) {
    let produto = produtos.find(item => item.PRODUTO_ID === id);
    Swal.fire({
      title: "Exclusão",
      text: `Confirma excluir ${produto.PRODUTO_NOME} ?`,
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

  async function VisualizarPDF() {
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
            <th scope="col">IMAGEM</th>
            <th scope="col">PRODUTO</th>
            <th scope="col">VALOR UN.</th>
            <th scope="col">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((produto) => {
              return (
                <tr key={produto.PRODUTO_ID}>
                  <th scope="row">{produto.PRODUTO_ID}</th>
                  <td><img src={produto.URL_IMAGEM} alt="imagem" width="50" /></td>
                  <td>{produto.PRODUTO_NOME}</td>
                  <td>R$ { parseFloat(produto.VR_UNITARIO).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }</td>
                  <td>
                    <Link to="#" onClick={()=>props.select(produto.PRODUTO_ID)} title="EDITAR PRODUTO" data-bs-toggle="modal" data-bs-target="#md_editarproduto"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.image_upload(produto.PRODUTO_ID)} title="UPLOAD DE IMAGEM"><i className="fas fa-file-image icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(produto.PRODUTO_ID)} title="EXCLUIR PRODUTO"><i className="fas fa-trash-alt icon-action red"></i></Link>
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

          <h1>Cadastro de Produtos - {vID} {vDelivery}</h1>
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
                          <textarea onChange={e => setDescricao(e.target.value)} type="text" className="form-control" style={{height: 152}} rows="3" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Imagem do Produto:<br/>
                        <img className="ref" src={ "https://via.placeholder.com/500" } alt="Imagem do Produto" width="320" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/produtos" replace={true} /> : null}
                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary ml-2" data-bs-dismiss="modal" onClick={img_reset}>CANCELAR</button>
                  <button type="button" className="btn btn-primary ml-2" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
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
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/produtos" replace={true} /> : null}
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