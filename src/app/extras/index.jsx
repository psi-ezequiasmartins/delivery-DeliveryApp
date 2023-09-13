/**
 * Cadastro de Produtos
 */

import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Impressao } from './impressao';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebase_app } from "../../config/firebase";
import './index.css';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
import Menu from "../../components/menu";

import api from '../../config/mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Extras() {
  const storage = getStorage(firebase_app);
  const vDelivery = localStorage.getItem("delivery"); 
  const vToken = localStorage.getItem("token");

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [extras, setExtras] = useState([]);
  const [extra_id, setExtraID] = useState(null);
  const [delivery_id, setDeliveryID] = useState(vToken);
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');
  const [CHV, setChv] = useState('S');

  useEffect(() => {
    let listagem = []; 
    api.get(`/listar/extras/delivery/${vToken}`).then(function (result) {
      result.data.forEach(snapshot => {
        if (snapshot.Nome.indexOf(busca) >= 0) {
          listagem.push({
            ExtraID: snapshot.ProdutoID,
            DeliveryID: snapshot.DeliveryID,
            Descricao: snapshot.Descricao,
            VrUnitario: snapshot.VrUnitario,
            UrlImagem: snapshot.UrlImagem,
            CHV: snapshot.CHV
          });
        }
      });
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
      const storageRef = ref(storage, '/extras/' + file.name);
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
            api.put(`/update/imagem/extra/${id} `, {"url_imagem": downloadURL}).then(response => {
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
        "ExtraID": null, 
        "DeliveryID": vToken,
        "Descricao": descricao, 
        "VrUnitario": vr_unitario,
        "UrlImagem": (url_imagem !== "" ? url_imagem : "https://via.placeholder.com/50x50"),
        "CHV": CHV
      }
      await api.post('/add/extra', info).then(() => {
        setMsg('Item extra cadastrado com sucesso!');
        setSuccess('S');
      }).catch((error) => {
        setMsg(error.message);
        setSuccess("N");
      })
    }
  }

  function Editar() {
    if (descricao.length === 0) {
      setMsg('Favor preencher a descrição do Item Extra.');
    } else {
      let info = { 
        "ExtraID": extra_id, 
        "DeliveryID": delivery_id,
        "Descricao": descricao, 
        "VrUnitario": vr_unitario,
        "UrlImagem": url_imagem,
        "CHV": CHV
      }
      api.put(`/update/extra/${extra_id}`, info).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((error) =>{
        setMsg(error.message);
        setSuccess('N');
      })
    }
  }

  function selectById(id){
    api.get(`/produto/${id}`).then((result) => {
      setExtraID(result.data[0].ExtraID);
      setDeliveryID(result.data[0].DeliveryID);
      setDescricao(result.data[0].Descricao);
      setVrUnitario(result.data[0].VrUnitario);
      setUrlImagem(result.data[0].UrlImagem);
      setChv(result.data[0].CHV);
    })
  }

  function deleteByID(id) {
    api.delete(`/delete/extra/${id}`).then(() => {
    setExcluido(id);
    })
  }

  function confirmaExclusao(id) {
    let extra = extras.find(item => item.ExtraID === id);

    Swal.fire({
      title: "Exclusão",
      text: `Confirma excluir ${extra.Descricao} ?`,
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
            'Item extra removido.',
            'success'
        )
      } 
    });
  }

  async function VisualizarPDF() {
    console.log('report', extras);
    const classeImpressao = new Impressao(extras);
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
            <th scope="col">Item</th>
            <th scope="col">Vr. Unitário</th>
            <th scope="col">Delivery</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((extra) => {
              return (
                <tr key={extra.ExtraID}>
                  <th scope="row">{extra.ExtraID}</th>
                  <td>
                    <img src={extra.UrlImagem} alt="imagem" width="50" />
                  </td>
                  <td>{extra.Descricao}</td>
                  <td>{extra.VrUnitario}</td>
                  <th scope="row">{extra.DeliveryID}</th>
                  <td>
                    <Link to="#" onClick={()=>props.select(extra.ExtraID)} title="EDITAR ITEM EXTRA" data-bs-toggle="modal" data-bs-target="#md_editarproduto"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.image_upload(extra.ExtraID)} title="UPLOAD DE IMAGEM"><i className="fas fa-file-image icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(extra.ExtraID)} title="EXCLUIR ITEM EXTRA"><i className="fas fa-trash-alt icon-action red"></i></Link>
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
          <Menu page="extras" />
        </div>

        <div className="col py-3 me-3">

          <h1>Cadastro de Itens Extras - {vDelivery}</h1>
          <div className="row">
            <div className="col-6">
              <div className="mt-2">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novoitemextra">
                  <i className="fas fa-address-book"></i> NOVO ITEM EXTRA
                </button>
                <button onClick={VisualizarPDF} className="btn btn-warning"><i className="fas fa-file-pdf"></i> PDF</button>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mt-2">
                <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Item extra" aria-describedby="bt_pesquisar"/>
              </div>
            </div>
          </div>
          <Listagem array={produtos} select={selectById} delete={confirmaExclusao} image_upload={imgUpload} />

          {/* md_novoproduto */}

          <div className="modal fade" id="md_novoitemextra" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">NOVO ITEM EXTRA</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-2">
                          <label htmlFor="descricao" className="form-label">Breve Descrição</label>
                          <textarea onChange={e => setDescricao(e.target.value)} value={descricao} className="form-control" style={{height: 152}} rows="3" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Imagem do Item extra:<br/>
                        <img className="ref" src={ "https://via.placeholder.com/500" } alt="Imagem do Produto" width="320" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/extras" replace={true} /> : null}
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

          <div className="modal fade" id="md_editaritemextra" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">EDITAR ITEM EXTRA</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">

                      <div className="col-sm-6">
                        <div className="mb-2">
                          <label htmlFor="descricao" className="form-label">Breve Descrição</label>
                          <textarea onChange={e => setDescricao(e.target.value)} value={descricao} className="form-control" style={{height: 152}} rows="3" id="descricao" ></textarea>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        Imagem do Item Extra:<br/>
                        <img className="ref" src={ url_imagem || "https://via.placeholder.com/500" } alt="Imagem do Produto" width="320" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/extras" replace={true} /> : null}
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
