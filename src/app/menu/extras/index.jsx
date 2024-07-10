/**
 * Cadastro de Extras (acrécimos de pedido)
 */

import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Impressao } from './impressao';
import './index.css';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
import Menu from '../../../components/menu';

import api from '../../../config/apiAxios';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Extras() {
  const vDelivery = localStorage.getItem("vDelivery"); 
  const vID = localStorage.getItem("vID");

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [extras, setExtras] = useState([]);
  const [extra_id, setExtraID] = useState(null);
  const [delivery_id, setDeliveryID] = useState(vID);
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);

  useEffect(() => {
    let listagem = []; 
    api.get(`/listar/extras/delivery/${vID}`).then(function (result) {
      result.data.forEach(snapshot => {
        if (snapshot.Descricao.indexOf(busca) >= 0) {
          listagem.push({
            ExtraID: snapshot.ExtraID,
            DeliveryID: snapshot.DeliveryID,
            Descricao: snapshot.Descricao,
            VrUnitario: snapshot.VrUnitario
          });
        }
      });
      setExtras(listagem);
    })
  }, [busca, excluido, success, vID]);

  async function Cadastrar() {
    if (descricao.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const info = {
        "ExtraID": null, 
        "DeliveryID": vID,
        "Descricao": descricao, 
        "VrUnitario": vr_unitario
      }
      await api.post('/add/extra', info).then(() => {
        setMsg('Item de Acréscimo cadastrado com sucesso!');
        setSuccess('S');
      }).catch((error) => {
        setMsg(error.message);
        setSuccess("N");
      })
    }
  }

  function Editar() {
    if (descricao.length === 0) {
      setMsg('Favor preencher a descrição do Item de Acréscimo.');
    } else {
      let info = { 
        "ExtraID": extra_id, 
        "DeliveryID": delivery_id,
        "Descricao": descricao, 
        "VrUnitario": vr_unitario
      }
      api.put(`/update/extra/${extra_id}`, info).then(() => {
        setMsg('');
        setSuccess("S");
      }).catch((error) =>{
        setMsg(error.message);
        setSuccess("N");
      })
    }
  }

  function selectById(id){
    api.get(`/extra/${id}`).then((result) => {
      setExtraID(result.data[0].ExtraID);
      setDeliveryID(result.data[0].DeliveryID);
      setDescricao(result.data[0].Descricao);
      setVrUnitario(result.data[0].VrUnitario);
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
            <th scope="col">Delivery</th>
            <th scope="col">Item</th>
            <th scope="col">Vr. Unitário</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((extra) => {
              return (
                <tr key={extra.ExtraID}>
                  <th scope="row">{extra.ExtraID}</th>
                  <th scope="row">{extra.DeliveryID}</th>
                  <td>{extra.Descricao}</td>
                  <td>R$ { parseFloat(extra.VrUnitario).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }</td>
                  <td>
                    <Link to="#" onClick={()=>props.select(extra.ExtraID)} title="EDITAR ITEM DE ACRÉSCIMO" data-bs-toggle="modal" data-bs-target="#md_editar"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(extra.ExtraID)} title="EXCLUIR ITEM DE ACRÉSCIMO"><i className="fas fa-trash-alt icon-action red"></i></Link>
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

          <h1>Itens de Acréscimo - {vDelivery}</h1>
          <div className="row">
            <div className="col-6">
              <div className="mt-2">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novo">
                  <i className="fas fa-address-book"></i> NOVO ITEM ACRÉSCIMO
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
          <Listagem array={extras} select={selectById} delete={confirmaExclusao} />

          {/* md_novo */}

          <div className="modal fade" id="md_novo" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">NOVO ITEM DE ACRÉSCIMO</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="mb-2">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <input onChange={e => setDescricao(e.target.value)} type="text" className="form-control" id="descricao" />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                        <input onChange={e => setVrUnitario(e.target.value)} type="text" className="form-control" id="vr_unitario" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/extras" replace={true} /> : null}
                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
                </div>

              </div>
            </div>
          </div>

          {/* md_editar */}

          <div className="modal fade" id="md_editar" tabIndex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="titulo_modal">EDITAR ITEM DE ACRÉSCIMO</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="mb-2">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <input onChange={e => setDescricao(e.target.value)} value={descricao} type="text" className="form-control" id="descricao" />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                        <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Navigate to="/app/extras" replace={true} /> : null}
                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
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
