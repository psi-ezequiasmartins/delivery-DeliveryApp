import { useState, useEffect } from 'react';
import { Impressao } from './impressao';
import { Link, redirect } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebase_app } from '../config/config.firebase';
import Menu from "../../components/menu";
import Swal from 'sweetalert2';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import './index.css';

import api from '../config/config.mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Produtos() {
  const storage = getStorage(firebase_app);
  const vDelivery = "SANDUBA DO ZÉ"; // localStorage.getItem("delivery");
  const vToken = 1002; // localStorage.getItem("token");

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [confirma, setConfirma] = useState(false);
  const [confirmaId, setConfirmaId] = useState('');
  const [selecionado, setSelecionado] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [produtos, setProdutos] = useState([]);

  const [produto_id, setProdutoID] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');
  const [delivery_id, setDeliveryID] = useState(vToken);

  const [file, setFile] = useState("https://via.placeholder.com/50x50");

  function imgChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrlImagem(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function imgUpload() {
    if (file == null) {
      return;
    }
    /** @type {any} */ // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };
    const imgStorageRef = ref(storage, `produtos/${file.name}`);
    const uploadTask = uploadBytesResumable(imgStorageRef, file, metadata);
    uploadTask.on('state_changed', (snapshot) => {
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
        alert('Error! Fail on upload file', error.message);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrlImagem(downloadURL);
        });
      }
    );
  }

  function img_reset() {
    setUrlImagem(null);
    setFile(null);
  }

  useEffect(() => {
    let listagem = []; 
    api.get(`/listar/produtos/delivery/${vToken}`).then(async(result) => {
      await result.data.forEach(snapshot => {
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

  function Cadastrar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = {
        "ProdutoID": null, 
        "Nome": nome, 
        "Descricao": descricao, 
        "VrUnitario": vr_unitario,
        "UrlImagem": url_imagem,
        "DeliveryID": vToken
      }
      api.post('/produto/add/', json).then(response => {
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
    api.delete(`/produto/delete/${id}`).then(async(result) => {
    setExcluido(id);
    setConfirma(false);
    })
  }

  function confirmaExclusao(id) {
    let produto = produtos.find(item => item.ProdutoID === id);
    setSelecionado(produto.Nome);
    setConfirmaId(id);
    setConfirma(true);
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
          <Listagem array={produtos} select={selectById} delete={confirmaExclusao} />
          { 
            confirma ?
            Swal.fire({
              title: "Exclusão",
              text: `Confirma excluir ${selecionado} ?`,
              icon: 'warning',
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancelar',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
            }).then((result) => {
              if (result.isConfirmed) {
                deleteByID(confirmaId);
                Swal.fire(
                  'Excluído!',
                  'Produto removido.',
                  'success'
                )
              } else {
                if (result.dismiss) {
                  setConfirma(false);
                }
              }
            }) : null
          }
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
                          <textarea onChange={e => setDescricao(e.target.value)} className="form-control" rows="2" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Adicionar uma imagem:<br/>
                        <img className="ref" src={ url_imagem || "https://via.placeholder.com/200" } alt="Imagem do Produto" width="200" />
                        <p></p>
                        <input type="file" id="file" onChange={imgChange}/>
                        <button type="button" className="btn btn-primary btn-action" onClick={imgUpload} disabled={!file}>ENVIAR ARQUIVO DE IMAGEM</button>
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
                          <textarea onChange={e => setDescricao(e.target.value)} value={descricao} className="form-control" rows="2" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Atualizar imagem:<br/>
                        <img className="ref" src={ url_imagem || "https://via.placeholder.com/200" } alt="Imagem do Produto" width="200" />
                        <p></p>
                        <input type="file" id="file" onChange={imgChange}/>
                        <button type="button" className="btn btn-primary btn-action" onClick={imgUpload} disabled={!file}>ENVIAR ARQUIVO DE IMAGEM</button>
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
