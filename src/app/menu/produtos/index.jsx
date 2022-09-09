import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp.jsx';
import './index.css';

import { storage } from '../../config/api_firebase';
import api from '../../config/api_mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Index() {
  const [produtos, setProdutos] = useState([]);

  const [id_produto, setIdProduto] = useState(null);
  const [id_categoria, setIdCategoria] = useState(null);
  const [id_fornecedor, setIdFornecedor] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vr_custo, setVrCusto] = useState(0.00);
  const [vr_unitario, setVrUnitario] = useState(0.00);
  const [url_imagem, setUrlImagem] = useState('');

  const [file, setFile] = useState(null);

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [confirma, setConfirma] = useState(false);
  const [confirmaId, setConfirmaId] = useState('');   
  const [selecionado, setSelecionado] = useState('');

  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let listagem = []; 
    api.get('/produtos').then(async result => {
      result.data.forEach(doc => {
        // find in between two fields:
        // if ((doc.nome.indexOf(busca) >=0) || (doc.data().descricao.indexOf(busca) >= 0)) {
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
      console.log(listagem);
    })
  }, [busca, excluido, success, url_imagem]);

  function Cadastrar() {
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

  async function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Produto.');
    } else {
      const json = { 
        "id_produto": id_produto, 
        "id_categoria": id_categoria, "id_fornecedor": id_fornecedor,
        "nome": nome, "descricao": descricao, 
        "vr_custo": vr_custo, "vr_unitario": vr_unitario,
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
      setIdCategoria(result.data[0].id_categoria); setIdFornecedor(result.data[0].id_fornecedor);
      setNome(result.data[0].nome); setDescricao(result.data[0].descricao);
      setVrCusto(result.data[0].vr_custo); setVrUnitario(result.data[0].vr_unitario);
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
      if (option === 1 ) { return "OFERTAS" } else    
      if (option === 2 ) { return "SANDUICHES" } else
      if (option === 3 ) { return "HOTDOGS" } else
      if (option === 4 ) { return "BEBIDAS" } else
      if (option === 5 ) { return "PRATOS E PORÇÕES" } else
      if (option === 6 ) { return "SUPERMERCADO" } else
      if (option === 7 ) { return "FRUTAS E VERDURAS" } else
      if (option === 8 ) { return "MEDICAMENTOS" } else
      if (option === 9 ) { return "GÁS DE COZINHA" } else
      if (option === 10) { return "FLORICULTURA" } else
      if (option === 11) { return "ÁGUA MINERAL" } else
      if (option === 12) { return "PEÇAS E SERVIÇOS" } else
      if (option === 13) { return "DISTRIBUIDORAS" }
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
            <th scope="col" className="col-action"></th>
          </tr>
        </thead>
        <tbody>
          {  
            props.array.map((produto) => {
              return (
                <tr key={produto.id_produto}>
                  <th scope="row">{produto.id_produto}</th>
                  <td align="center">
                    <img src={produto.url_imagem || "https://via.placeholder.com/50x50"} alt="imagem" width="50" />
                  </td>
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

  function ImgChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  
  async function ImgUpload(e) {
    e.preventDefault();
    const path = `/images/${file.name}`; const ref = storage.ref(path); await ref.put(file);
    const url = await ref.getDownloadURL();
    setUrlImagem(url);
    setFile(null);
  }
 
  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">
        <h1>Cadastro de Produtos</h1>
        <div className="row">

          <div className="col-6">
            <div className="mt-2">
              {/* -- Button trigger modal -- */}
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novoproduto">
                <i className="fas fa-address-book"></i> NOVO PRODUTO
              </button>
              <button onClick={VisualizarPDF} className="btn btn-warning"><i class="fas fa-file-pdf"></i> PDF</button>
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
      <div className="modal fade" id="md_novoproduto" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
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
                        <textarea onChange={e => setDescricao(e.target.value)} class="form-control" rows="2" id="descricao" ></textarea>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="categoria" className="form-label">Categoria</label>
                        <select onChange={e => setIdCategoria(e.target.value)} class="form-select" id="categoria" placeholder="Selecione a categoria"> 
                          <option value="1">OFERTAS</option>
                          <option value="2">SANDUICHES</option>
                          <option value="3">HOTDOGS</option>
                          <option value="4">BEBIDAS</option>
                          <option value="5">PRATOS E PORÇÕES</option>
                          <option value="6">SUPERMERCADO</option>
                          <option value="7">FRUTAS E VERDURAS</option>
                          <option value="8">MEDICAMENTOS</option>
                          <option value="9">GÁS DE COZINHA</option>
                          <option value="10">FLORICULTURA</option>
                          <option value="11">ÁGUA MINERAL</option>
                          <option value="12">PEÇAS E SERVIÇOS</option>
                          <option value="13">DISTRIBUIDORAS</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="fornecedor" className="form-label">Fornecedor</label>
                        <select onChange={e => setIdFornecedor(e.target.value)} value={id_fornecedor} class="form-select" id="fornecedor" placeholder="Selecione o Fornecedor"> 
                          <option value="1">Fornecedor "A"</option>
                          <option value="2">Fornecedor "B</option>
                          <option value="3">Fornecedor "C"</option>
                        </select>
                      </div>
                      <div className="row mb-2">
                        <div className="col">
                          <label htmlFor="vr_custo" className="form-label">Valor Custo</label>
                          <input onChange={e => setVrCusto(e.target.value)} value={vr_custo} type="text" className="form-control" id="vr_custo" />
                        </div>
                        <div className="col">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <img src={url_imagem || "https://via.placeholder.com/260"} alt="Imagem do Produto" width="260" />
                        <p></p>
                        <form onSubmit={ImgUpload}>
                          <input type="file" onChange={ImgChange} /><br/>
                          <button type="button" className="btn btn-primary" disabled={!file}><i className="fas fa-image"></i> ENVIAR IMAGEM</button>                         
                        </form>
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Redirect to='/app/menu/produtos/'/> : null}
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
              </div>
            </div>
          </div>
        </div>

        {/* -- md_editarproduto -- */}
        <div className="modal fade" id="md_editarproduto" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
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
                        <textarea onChange={e => setDescricao(e.target.value)} value={descricao} class="form-control" rows="2" id="descricao" ></textarea>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="categoria" className="form-label">Categoria</label>
                        <select onChange={e => setIdCategoria(e.target.value)} value={id_categoria} class="form-select" id="categoria"> 
                          <option value="1">OFERTAS</option>
                          <option value="2">SANDUICHES</option>
                          <option value="3">HOTDOGS</option>
                          <option value="4">BEBIDAS</option>
                          <option value="5">PRATOS E PORÇÕES</option>
                          <option value="6">SUPERMERCADO</option>
                          <option value="7">FRUTAS E VERDURAS</option>
                          <option value="8">MEDICAMENTOS</option>
                          <option value="9">GÁS DE COZINHA</option>
                          <option value="10">FLORICULTURA</option>
                          <option value="11">ÁGUA MINERAL</option>
                          <option value="12">PEÇAS E SERVIÇOS</option>
                          <option value="13">DISTRIBUIDORAS</option>
                        </select>
                      </div>
                      <div className="mb-2">
                          <label htmlFor="fornecedor" className="form-label">Fornecedor</label>
                          <select onChange={e => setIdFornecedor(e.target.value)} value={id_fornecedor} class="form-select" id="fornecedor" placeholder="Selecione o Fornecedor"> 
                            <option value="1">Fornecedor "A"</option>
                            <option value="2">Fornecedor "B</option>
                            <option value="3">Fornecedor "C"</option>
                          </select>
                        </div>
                      <div className="row mb-2">
                        <div className="col">
                          <label htmlFor="vr_custo" className="form-label">Valor Custo</label>
                          <input onChange={e => setVrCusto(e.target.value)} value={vr_custo} type="text" className="form-control" id="vr_custo" />
                        </div>
                        <div className="col">
                          <label htmlFor="vr_unitario" className="form-label">Valor Unitário</label>
                          <input onChange={e => setVrUnitario(e.target.value)} value={vr_unitario} type="text" className="form-control" id="vr_unitario" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <img src={url_imagem || "https://via.placeholder.com/260"} alt="Imagem do Produto" width="260" />
                        <p></p>
                        <form onSubmit={ImgUpload}>
                          <input type="file" onChange={ImgChange} /><br/>
                          <button type="button" className="btn btn-primary" disabled={!file}><i className="fas fa-image"></i> ENVIAR IMAGEM</button>                         
                        </form>
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Redirect to='/app/menu/produtos/'/> : null}
                  </div>
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
    );
  }

export default Index;
