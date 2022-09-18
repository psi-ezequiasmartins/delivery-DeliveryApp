import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp.jsx';
import './index.css';

import { storage } from '../../config/firebase';
import api from '../../config/mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Index() {
  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [confirma, setConfirma] = useState(false);
  const [confirmaId, setConfirmaId] = useState('');
  const [selecionado, setSelecionado] = useState('');
  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [produtos, setProdutos] = useState([]);

  const [id_produto, setIdProduto] = useState(null);
  const [id_categoria, setIdCategoria] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');

  const [file, setFile] = useState("https://via.placeholder.com/50x50");

  function imgChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrlImagem(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function imgUpload() {
    if (file == null)
      return;

    const storageRef = storage.ref(`produtos/${file.name}`);
    storageRef.put(file).on("state_changed", alert('File uploaded success!'), alert);
    // get the public download img url
    const downloadUrl = await storageRef.getDownloadURL();
    // save the url to local state
    setUrlImagem(downloadUrl);
  }

  function img_reset() {
    setUrlImagem(null);
    setFile(null);
  }

  useEffect(() => {
    let listagem = []; 
    api.get('/produtos').then(async result => {
      result.data.forEach(doc => {
        if (doc.nome.indexOf(busca) >=0) {
          listagem.push({
            id_produto: doc.id_produto,
            id_categoria: doc.id_categoria,
            nome: doc.nome,
            descricao: doc.descricao,
            vr_custo: doc.vr_custo,
            vr_unitario: doc.vr_unitario,
            url_imagem: doc.url_imagem
          })
        }
      })
      setProdutos(listagem);
    })
  }, [busca, excluido, success, url_imagem]);

  function Cadastrar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = {
        "id_produto": null, 
        "id_categoria": id_categoria, 
        "nome": nome, 
        "descricao": descricao, 
        "vr_unitario": vr_unitario,
        "url_imagem": url_imagem
      }
      api.post('/produto/add/', json).then(response => {
        let produto = {
          id_produto: response.data.id_produto, 
          id_categoria: response.data.id_categoria, 
          nome: response.data.nome, descricao: response.data.descricao,
          vr_unitario: response.data.vr_unitario,
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

  async function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = { 
        "id_produto": id_produto, 
        "id_categoria": id_categoria, 
        "nome": nome, 
        "descricao": descricao, 
        "vr_unitario": vr_unitario,
        "url_imagem": url_imagem
      }
      await api.put(`/produto/update/${id_produto}`, json).then(response => {
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
      setIdProduto(result.data[0].id_produto);
      setIdCategoria(result.data[0].id_categoria); 
      setNome(result.data[0].nome); 
      setDescricao(result.data[0].descricao);
      setVrUnitario(result.data[0].vr_unitario);
      setUrlImagem(result.data[0].url_imagem);
    })
  }

  function deleteByID(id) {
    api.delete(`/produto/delete/${id}`).then(async(result) => {
    setExcluido(id);
    setConfirma(false);
    })
  }

  function confirmaExclusao(id) {
    let produto = produtos.find(item => item.id_produto === id);
    setSelecionado(produto.nome);
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

    function categoria(option) {
      if (option === 101) { return "OFERTAS" } else
      if (option === 102) { return "SANDUICHES" } else
      if (option === 103) { return "HOTDOGS" } else
      if (option === 104) { return "BEBIDAS" } else
      if (option === 105) { return "PRATOS E PORÇÕES" } else
      if (option === 106) { return "SUPERMERCADO" } else
      if (option === 107) { return "FRUTAS E VERDURAS" } else
      if (option === 108) { return "MEDICAMENTOS" } else
      if (option === 109) { return "GÁS DE COZINHA" } else
      if (option === 110) { return "FLORICULTURA" } else
      if (option === 111) { return "ÁGUA MINERAL" } else
      if (option === 112) { return "PEÇAS E SERVIÇOS" } else
      if (option === 113) { return "DISTRIBUIDORAS" }
    }

    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col">ID</th>
            <th scope="col">Imagem</th>
            <th scope="col">Produto</th>
            <th scope="col">Categoria</th>
            <th scope="col">Vr. Unitário</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((produto) => {
              return (
                <tr key={produto.id_produto}>
                  <th scope="row">{produto.id_produto}</th>
                  <td><img src={produto.url_imagem} alt="imagem" width="50" /></td>
                  <td>{produto.nome}</td>
                  <td>{categoria(produto.id_categoria)}</td>
                  <td>{produto.vr_unitario}</td>
                  <td>
                    <Link to="#" onClick={()=>props.select(produto.id_produto)} title="EDITAR PRODUTO" data-bs-toggle="modal" data-bs-target="#md_editarproduto"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(produto.id_produto)} title="EXCLUIR PRODUTO"><i className="fas fa-trash-alt icon-action red"></i></Link>
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
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">
        <h1>Cadastro de Produtos</h1>
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
          confirma ? <SweetAlert
            warning
            showCancel
            showCloseButtom
            confirmBtnText="Sim"
            confirmBtnBsStyle="primary"
            cancelBtnText="Não"
            cancelBtnBsStyle="danger"
            title="Exclusão"
            onConfirm={() => deleteByID(confirmaId)}
            onCancel={() => setConfirma(false)}
            reverseButtons={true}
            >
            Deseja excluir <strong>{selecionado}</strong>?
          </SweetAlert> : null
        }
      </div>

      {/* -- md_novoproduto -- */}
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
                        <label htmlFor="categoria" className="form-label">Categoria</label>
                        <select onChange={e => setIdCategoria(e.target.value)} className="form-select" id="categoria" placeholder="Selecione a categoria"> 
                          <option value="101">OFERTAS</option>
                          <option value="102">SANDUICHES</option>
                          <option value="103">HOTDOGS</option>
                          <option value="104">BEBIDAS</option>
                          <option value="105">PRATOS E PORÇÕES</option>
                          <option value="106">SUPERMERCADO</option>
                          <option value="107">FRUTAS E VERDURAS</option>
                          <option value="108">MEDICAMENTOS</option>
                          <option value="109">GÁS DE COZINHA</option>
                          <option value="110">FLORICULTURA</option>
                          <option value="111">ÁGUA MINERAL</option>
                          <option value="112">PEÇAS E SERVIÇOS</option>
                          <option value="113">DISTRIBUIDORAS</option>
                        </select>
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
                    {success === 'S' ? <Redirect to='/app/menu/produtos/'/> : null}
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

        {/* -- md_editarproduto -- */}
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
                        <label htmlFor="categoria" className="form-label">Categoria</label>
                        <select onChange={e => setIdCategoria(e.target.value)} value={id_categoria} className="form-select" id="categoria"> 
                          <option value="101">OFERTAS</option>
                          <option value="102">SANDUICHES</option>
                          <option value="103">HOTDOGS</option>
                          <option value="104">BEBIDAS</option>
                          <option value="105">PRATOS E PORÇÕES</option>
                          <option value="106">SUPERMERCADO</option>
                          <option value="107">FRUTAS E VERDURAS</option>
                          <option value="108">MEDICAMENTOS</option>
                          <option value="109">GÁS DE COZINHA</option>
                          <option value="110">FLORICULTURA</option>
                          <option value="111">ÁGUA MINERAL</option>
                          <option value="112">PEÇAS E SERVIÇOS</option>
                          <option value="113">DISTRIBUIDORAS</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                        <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      Atualizar imagem:<br/>
                      <img className="ref" src={ url_imagem } alt="Imagem do Produto" width="200" />
                      <p></p>
                      <input type="file" id="file" onChange={imgChange}/>
                      <button type="button" className="btn btn-primary btn-action" onClick={imgUpload} disabled={!file}>ENVIAR ARQUIVO DE IMAGEM</button>
                    </div>

                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Redirect to='/app/menu/produtos/'/> : null}
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
    );
  }

export default Index;
