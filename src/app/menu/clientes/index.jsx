import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp.jsx';
import './index.css';

import api from '../../config/api_mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Index() {

    const [clientes, setClientes] = useState([]);

    const [id_cliente, setIdCliente] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');  
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [UF, setUf] = useState('');
    const [CEP, setCep] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');

    const [busca, setBusca] = useState('');
    const [excluido, setExcluido] = useState('');
    const [confirma, setConfirma] = useState(false);
    const [confirmaId, setConfirmaId] = useState('');   
    const [selecionado, setSelecionado] = useState('');

    const [success, setSuccess] = useState('N');
    const [msg, setMsg] = useState('');

    useEffect(() => {
      let listagem = []; 
      api.get('/clientes').then(async result => {
        result.data.forEach(doc => {
          if (doc.nome.indexOf(busca) >=0 ) {
            listagem.push({
              id_cliente: doc.id_cliente,
              nome: doc.nome,
              telefone: doc.telefone,
              email: doc.email,
              bairro: doc.bairro
            })
          }
        })
        setClientes(listagem);
        console.log(listagem);
      })
    }, [busca, excluido, success]);

    function Cadastrar() {
      if (nome.length === 0) {
        setMsg('Favor preencher o campo Nome do Cliente.');
      } else if (email.length === 0) {
        setMsg('Favor preencher o campo E-mail.');
      } else {
          const json = {
            "id_cliente": null, 
            "nome": nome, "email": email, "telefone": telefone,
            "endereco": endereco, "complemento": complemento, "bairro": bairro, "cidade": cidade, "uf": UF, "cep": CEP,
            "cnpj": cnpj, "cpf": cpf
          }
          api.post('/cliente/add/', json).then(response => {
            let cliente = {
              id_cliente: response.data.id_cliente,
              nome: response.data.nome, email: response.data.email, telefone: response.data.telefone,
              endereco: response.data.endereco, complemento: response.data.complemento, bairro: response.data.bairro, cidade: response.data.cidade, uf: response.data.uf, cep: response.data.cep,
              cnpj: response.data.cnpj, cpf: response.data.cpf 
            }
            console.log(cliente);
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
        setMsg('Favor preencher o campo Nome do Cliente.');
      } else if (email.length === 0) {
        setMsg('Favor preencher o campo E-mail.');
      } else {
        const json = { 
          "id_cliente": id_cliente,
          "nome": nome, "email": email, "telefone": telefone,
          "endereco": endereco, "complemento": complemento, "bairro": bairro,  "cidade": cidade, "uf": UF, "cep": CEP,
          "cnpj": cnpj, "cpf": cpf
        }
        await api.put(`/cliente/update/${id_cliente}`, json).then(response => {
          console.log(response.data);
        }).then(() => {
          setMsg('');
          setSuccess('S');
        }).catch((erro) => {
          setMsg(erro);
          setSuccess('N');
        })
      }
    }

    function selectById(id){
      api.get(`/cliente/${id}`)
      .then(result => {
        setIdCliente(result.data[0].id_cliente);
        setNome(result.data[0].nome); 
        setEmail(result.data[0].email); setTelefone(result.data[0].telefone);
        setEndereco(result.data[0].endereco); setComplemento(result.data[0].complemento); setBairro(result.data[0].bairro);
        setCidade(result.data[0].cidade); setUf(result.data[0].uf); setCep(result.data[0].cep);
        setCnpj(result.data[0].cnpj); setCpf(result.data[0].cpf);
      })
    }

    function deleteByID(id) {
      api.delete(`/cliente/delete/${id}`).then(async(result) => {
      setExcluido(id);
      setConfirma(false);
      })
    }

    function confirmaExclusao(id) {
      let cliente = clientes.find(item => item.id_cliente === id);
      setSelecionado(cliente.nome);
      setConfirmaId(id);
      setConfirma(true);
    }

    const VisualizarPDF = async () => {
      console.log('report', clientes);
      const classeImpressao = new Impressao(clientes);
      const documento = await classeImpressao.PreparaDocumento();
      pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    function Listagem(props) {
      return (
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Cliente</th>
              <th scope="col">Telefone</th>
              <th scope="col">E-mail</th>
              <th scope="col">Bairro</th>
              <th scope="col" className="col-action"></th>
            </tr>
          </thead>
          <tbody>
            {  
              props.array.map((cliente) => {
                return (
                  <tr key={cliente.id_cliente}>
                    <th scope="row">{cliente.id_cliente}</th>
                    <td>{cliente.nome}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.bairro}</td>
                    <td>
                      <Link to="#" onClick={()=>props.select(cliente.id_cliente)} title="EDITAR CLIENTE" data-bs-toggle="modal" data-bs-target="#md_editarcliente"><i className="fas fa-user-edit icon-action"></i></Link>
                      <Link to="#" onClick={()=>props.delete(cliente.id_cliente)} title="EXCLUIR CLIENTE"><i className="fas fa-trash-alt icon-action red"></i></Link>
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
          <h1>Listagem de Clientes</h1>

          <div className="row">

            <div className="col-6">
              <div className="mt-2">
                {/* -- Button trigger modal -- */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novocliente">
                  <i className="fas fa-address-book"></i> NOVO CLIENTE
                </button>
                <button onClick={VisualizarPDF} className="btn btn-warning"><i class="fas fa-file-pdf"></i> PDF</button>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mt-2">
                <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Cliente" aria-describedby="bt_pesquisar"/>
              </div>
            </div>
          </div>
          
          <Listagem array={clientes} select={selectById} delete={confirmaExclusao} />
          
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

        {/* -- md_novocliente -- */}
        <div className="modal fade" id="md_novocliente" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="titulo_modal">NOVO CLIENTE</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>

              <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nome" className="form-label">Nome do Cliente</label>
                      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
                    </div>
                    <div className="row">
                      <div className="col-sm-8">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input onChange={e => setTelefone(e.target.value)} type="text" className="form-control" id="telefone" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
                      </div>
                      <div className="col-sm-3">
                        <label htmlFor="complemento" className="form-label">Complemento</label>
                        <input onChange={e => setComplemento(e.target.value)} type="text" className="form-control" id="complemento" />
                      </div>
                      <div className="col-sm-3">
                        <label htmlFor="bairro" className="form-label">Bairro</label>
                        <input onChange={e => setBairro(e.target.value)} type="text" className="form-control" id="bairro" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-5">
                        <label htmlFor="cidade" className="form-label">Cidade</label>
                        <input onChange={e => setCidade(e.target.value)} type="text" className="form-control" id="cidade" />
                      </div>
                      <div className="col-sm-4">
                        <label htmlFor="UF" className="form-label">UF</label>
                        <select onChange={e => setUf(e.target.value)} className="form-select" data-size="6" id="UF">
                          <option value="AC">ACRE</option>
                          <option value="AL">ALAGOAS</option>
                          <option value="AP">AMAPA</option>
                          <option value="AM">AMAZONAS</option>
                          <option value="BA">BAHIA</option>
                          <option value="CE">CEARA</option>
                          <option value="DF">DISTRITO FEDERAL</option>
                          <option value="ES">ESP.SANTO</option>
                          <option value="GO">GOIAS</option>
                          <option value="MA">MARANHAO</option>
                          <option value="MT">MATO GROSSO</option>
                          <option value="MS">MATO GROSSO SUL</option>
                          <option value="MG" selected="selected">MINAS GERAIS</option>
                          <option value="PA">PARA</option>
                          <option value="PB">PARAIBA</option>
                          <option value="PR">PARANA</option>
                          <option value="PE">PERNAMBUCO</option>
                          <option value="PI">PIAUI</option>
                          <option value="RJ">RIO DE JANEIRO</option>
                          <option value="RN">RIO GRANDE DO NORTE</option>
                          <option value="RS">RIO GRANDE DO SUL</option>
                          <option value="RO">RONDONIA</option>
                          <option value="RR">RORAIMA</option>
                          <option value="SC">SANTA CATARINA</option>
                          <option value="SP">SAO PAULO</option>
                          <option value="SE">SERGIPE</option>
                          <option value="TO">TOCANTINS</option>
                        </select>
                      </div>
                      <div className="col-sm-3">
                        <label htmlFor="CEP" className="form-label">CEP</label>
                        <input onChange={e => setCep(e.target.value)} type="text" className="form-control" id="CEP" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="cnpj" className="form-label">CNPJ</label>
                        <input onChange={e => setCnpj(e.target.value)} type="text" className="form-control" id="cnpj" />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input onChange={e => setCpf(e.target.value)} type="text" className="form-control" id="cpf" />
                      </div>
                    </div>
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? <Redirect to='/app/menu/clientes/'/> : null}
                  </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
              </div>
            </div>
          </div>
        </div>

        {/* -- md_editarcliente -- */}
        <div className="modal fade" id="md_editarcliente" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="titulo_modal">EDITAR CLIENTE</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
              </div>

              <div className="modal-body">
                <form>

                  <div className="mb-2">
                    <label htmlFor="nome" className="form-label">Nome do Cliente</label>
                    <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" />
                  </div>

                  <div className="row mb-2">
                    <div className="col-sm-8">
                      <label htmlFor="email" className="form-label">E-mail</label>
                      <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="email" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="telefone" className="form-label">Telefone</label>
                      <input onChange={e => setTelefone(e.target.value)} value={telefone} type="text" className="form-control" id="telefone" />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <label htmlFor="endereco" className="form-label">Endereço</label>
                      <input onChange={e => setEndereco(e.target.value)} value={endereco} type="text" className="form-control" id="endereco" />
                    </div>
                    <div className="col-sm-3">
                      <label htmlFor="complemento" className="form-label">Complemento</label>
                      <input onChange={e => setComplemento(e.target.value)} value={complemento} type="text" className="form-control" id="complemento" />
                    </div>
                    <div className="col-sm-3">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <input onChange={e => setBairro(e.target.value)} value={bairro} type="text" className="form-control" id="bairro" />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-sm-5">
                      <label htmlFor="cidade" className="form-label">Cidade</label>
                      <input onChange={e => setCidade(e.target.value)} value={cidade} type="text" className="form-control" id="cidade" />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="UF" className="form-label">UF</label>
                      <select onChange={e => setUf(e.target.value)} value={UF} class="form-select" id="UF">
                        <option value="AC">ACRE</option>
                        <option value="AL">ALAGOAS</option>
                        <option value="AP">AMAPA</option>
                        <option value="AM">AMAZONAS</option>
                        <option value="BA">BAHIA</option>
                        <option value="CE">CEARA</option>
                        <option value="DF">DISTRITO FEDERAL</option>
                        <option value="ES">ESP.SANTO</option>
                        <option value="GO">GOIAS</option>
                        <option value="MA">MARANHAO</option>
                        <option value="MT">MATO GROSSO</option>
                        <option value="MS">MATO GROSSO SUL</option>
                        <option value="MG" selected="selected">MINAS GERAIS</option>
                        <option value="PA">PARA</option>
                        <option value="PB">PARAIBA</option>
                        <option value="PR">PARANA</option>
                        <option value="PE">PERNAMBUCO</option>
                        <option value="PI">PIAUI</option>
                        <option value="RJ">RIO DE JANEIRO</option>
                        <option value="RN">RIO GRANDE DO NORTE</option>
                        <option value="RS">RIO GRANDE DO SUL</option>
                        <option value="RO">RONDONIA</option>
                        <option value="RR">RORAIMA</option>
                        <option value="SC">SANTA CATARINA</option>
                        <option value="SP">SAO PAULO</option>
                        <option value="SE">SERGIPE</option>
                        <option value="TO">TOCANTINS</option>
                      </select>
                    </div>
                    <div className="col-sm-3">
                      <label htmlFor="CEP" className="form-label">CEP</label>
                      <input onChange={e => setCep(e.target.value)} value={CEP} type="text" className="form-control" id="CEP" />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <label htmlFor="cnpj" className="form-label">CNPJ</label>
                      <input onChange={e => setCnpj(e.target.value)} value={cnpj} type="text" className="form-control" id="cnpj" />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="cpf" className="form-label">CPF</label>
                      <input onChange={e => setCpf(e.target.value)} value={cpf} type="text" className="form-control" id="cpf" />
                    </div>
                  </div>

                  {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                  {success === 'S' ? <Redirect to='/app/menu/clientes'/> : null}
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
