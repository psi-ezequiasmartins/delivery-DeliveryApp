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

  const [deliverys, setDeliverys] = useState([]);

  const [id_delivery, setIdDelivery] = useState(0);
  const [id_categoria, setIdCategoria] = useState(0);
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');  
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUf] = useState('');
  const [CEP, setCep] = useState('');
  const [marcador, setMarcador] = useState('');
  const [horario, setHorario] = useState('');
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
    api.get('/deliverys').then(async result => {
      result.data.forEach(doc => {
        if (doc.nome.indexOf(busca) >=0 ) {
          listagem.push({
            id_delivery: doc.id_delivery,
            id_categoria: doc.id_categoria,
            nome: doc.nome,
            telefone: doc.telefone,
            email: doc.email
          })
        }
      })
      setDeliverys(listagem);
      console.log(listagem);
    })
  }, [busca, excluido, success]);

  function Cadastrar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = {
          "id_delivery": null, "id_categoria": id_categoria,
          "nome": nome, "responsavel": responsavel, "email": email, "telefone": telefone,
          "endereco": endereco, "complemento": complemento, "bairro": bairro, "cidade": cidade, "uf": UF, "cep": CEP,
          "marcador": marcador, "horario": horario, "cnpj": cnpj, "cpf": cpf
        }
        api.post('/delivery/add/', json).then(response => {
          let delivery = {
            id_delivery: response.data.id_delivery,  id_categoria: response.data.id_categoria,
            nome: response.data.nome, responsavel: response.data.responsavel, email: response.data.email, telefone: response.data.telefone,
            endereco: response.data.endereco, complemento: response.data.complemento, bairro: response.data.bairro, cidade: response.data.cidade, uf: response.data.uf, cep: response.data.cep,
            marcador: response.data.marcador, horario: response.data.horario, cnpj: response.data.cnpj, cpf: response.data.cpf 
          }
          console.log(delivery);
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
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
      const json = { 
        "id_delivery": id_delivery, "id_categoria": id_categoria,
        "nome": nome, "responsavel": responsavel, "email": email, "telefone": telefone,
        "endereco": endereco, "complemento": complemento, "bairro": bairro,  "cidade": cidade, "uf": UF, "cep": CEP,
        "marcador": marcador, "horario": horario, 
        "cnpj": cnpj, "cpf": cpf
      }
      await api.put(`/delivery/update/${id_delivery}`, json).then(response => {
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
    api.get(`/delivery/${id}`)
    .then(result => {
      setIdDelivery(result.data[0].id_delivery); setIdCategoria(result.data[0].id_categoria);
      setNome(result.data[0].nome); setResponsavel(result.data[0].responsavel);
      setEmail(result.data[0].email); setTelefone(result.data[0].telefone);
      setEndereco(result.data[0].endereco); setComplemento(result.data[0].complemento); setBairro(result.data[0].bairro);
      setCidade(result.data[0].cidade); setUf(result.data[0].uf); setCep(result.data[0].cep);
      setMarcador(result.data[0].marcador); setHorario(result.data[0].horario); 
      setCnpj(result.data[0].cnpj); setCpf(result.data[0].cpf);
    }) 
  }

  function deleteByID(id) {
    api.delete(`/delivery/delete/${id}`).then(async(result) => {
      setExcluido(id);
      setConfirma(false);
    })
  }

  function confirmaExclusao(id) {
    let delivery = deliverys.find(item => item.id_delivery === id);
    setSelecionado(delivery.nome);
    setConfirmaId(id);
    setConfirma(true);
  }

  const VisualizarPDF = async () => {
    console.log('report', deliverys);
    const classeImpressao = new Impressao(deliverys);
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
            <th scope="col">Delivery</th>
            <th scope="col">Categoria</th>
            <th scope="col">Telefone</th>
            <th scope="col">E-mail</th>
            <th scope="col" className="col-action"></th>
          </tr>
        </thead>
        <tbody>
          {  
            props.array.map((delivery) => {
              return (
                <tr key={delivery.id_delivery}>
                  <th scope="row">{delivery.id_delivery}</th>
                  <td>{delivery.nome}</td>
                  <td>{categoria(delivery.id_categoria)}</td>
                  <td>{delivery.telefone}</td>
                  <td>{delivery.email}</td>
                  <td>
                    <Link to="#" onClick={()=>props.select(delivery.id_delivery)} title="EDITAR DELIVERY" data-bs-toggle="modal" data-bs-target="#md_editardelivery"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(delivery.id_delivery)} title="EXCLUIR DELIVERY"><i className="fas fa-trash-alt icon-action red"></i></Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">
        <h1>Listagem de Deliverys</h1>

        <div className="row">

          <div className="col-6">
            <div className="mt-2">
              {/* -- Button trigger modal -- */}
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#md_novodelivery">
                <i className="fas fa-address-book"></i> NOVO DELIVERY
              </button>
              <button onClick={VisualizarPDF} className="btn btn-warning"><i class="fas fa-file-pdf"></i> PDF</button>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group mt-2">
              <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Delivery" aria-describedby="bt_pesquisar"/>
            </div>
          </div>
        </div>

        <Listagem array={deliverys} select={selectById} delete={confirmaExclusao} />

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

      {/* -- md_novodelivery -- */}
      <div className="modal fade" id="md_novodelivery" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="titulo_modal">NOVO DELIVERY</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome do Delivery</label>
                  <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label htmlFor="responsavel" className="form-label">Responsável</label>
                  <input onChange={e => setResponsavel(e.target.value)} type="text" className="form-control" id="responsavel" />
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
                    <select onChange={e => setUf(e.target.value)} class="form-select" id="UF">
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

                <div className="mb-3">
                  <label htmlFor="marcador" className="form-label">Marcador (Coordenadas Google Maps)*</label>
                  <input onChange={e => setMarcador(e.target.value)} type="text" className="form-control" id="marcador" />
                  <p>Como obter as suas coordenadas no Google Maps:</p>
                  <p>
                    1. No computador, abra o Google Maps.<br/>
                    2. Clique com o botão direito do mouse no lugar ou na área no mapa. Uma janela pop-up será aberta. A latitude e a longitude vão aparecer no formato decimal na parte superior.<br/>
                    3. Para copiar as coordenadas automaticamente, clique na latitude e longitude.
                  </p>
                  <p>* <a href="https://maps.google.com/" target="_blank" rel="noreferrer">Clique aqui</a> para acessar o Google Maps</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="horario" className="form-label">Horário</label>
                  <input onChange={e => setHorario(e.target.value)} type="text" className="form-control" id="horario" />
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
                {success === 'S' ? <Redirect to='/app/menu/delivery/'/> : null}
                
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Cadastrar}>SALVAR</button>
            </div>
          </div>
        </div>
      </div>

      {/* -- md_editardelivery -- */}
      <div className="modal fade" id="md_editardelivery" tabindex="-1" aria-labelledby="titulo_modal" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="titulo_modal">EDITAR DELIVERY</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome do Delivery</label>
                  <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" />
                </div>

                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">Categoria</label>
                  <select onChange={e => setIdCategoria(e.target.value)} class="form-select" value={id_categoria} id="categoria"> 
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

                <div className="mb-3">
                  <label htmlFor="responsavel" className="form-label">Responsável</label>
                  <input onChange={e => setResponsavel(e.target.value)} value={responsavel} type="text" className="form-control" id="responsavel" />
                </div>

                <div className="row">
                  <div className="col-sm-8">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="email" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    <input onChange={e => setTelefone(e.target.value)} value={telefone} type="text" className="form-control" id="telefone" />
                  </div>
                </div>
              
                <div className="row">
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

                <div className="row">
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

                <div className="mb-3">
                  <label htmlFor="marcador" className="form-label">Marcador (Coordenadas Google Maps)*</label>
                  <input onChange={e => setMarcador(e.target.value)} value={marcador} type="text" className="form-control" id="marcador" />
                  <p>Como obter as suas coordenadas no Google Maps:</p>
                  <p>
                    1. No computador, abra o Google Maps.<br/>
                    2. Clique com o botão direito do mouse no lugar ou na área no mapa. Uma janela pop-up será aberta. A latitude e a longitude vão aparecer no formato decimal na parte superior.<br/>
                    3. Para copiar as coordenadas automaticamente, clique na latitude e longitude.
                  </p>
                  <p>* <a href="https://maps.google.com/" target="_blank" rel="noreferrer">Clique aqui</a> para acessar o Google Maps</p>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="horario" className="form-label">Horário</label>
                  <input onChange={e => setHorario(e.target.value)} value={horario} type="text" className="form-control" id="horario" />
                </div>

                <div className="row">
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
                {success === 'S' ? <Redirect to='/app/menu/delivery'/> : null}

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
