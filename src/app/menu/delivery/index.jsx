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

  const [deliverys, setDeliverys] = useState([]);

  const [id_conta, setIdConta] = useState(null);
  const [delivery, setDelivery] = useState('');
  const [plano, setPlano] = useState(101);
  const [status, setStatus] = useState('A');
  const [id_categoria, setIdCategoria] = useState(0);
  const [responsavel, setResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');  
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUf] = useState('');
  const [CEP, setCep] = useState('');
  const [logomarca, setLogomarca] = useState('');
  const [marcador, setMarcador] = useState('');
  const [horario, setHorario] = useState('');

  const [busca, setBusca] = useState('');
  const [excluido, setExcluido] = useState('');
  const [confirma, setConfirma] = useState(false);
  const [confirmaId, setConfirmaId] = useState('');   
  const [selecionado, setSelecionado] = useState('');

  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  const [file, setFile] = useState("https://via.placeholder.com/50x50");

  function imgChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setLogomarca(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function imgUpload() {
    if (file == null)
      return;
    const storageRef = storage.ref(`deliverys/${file.name}`);
    storageRef.put(file).on("state_changed", alert('File uploaded success!'), alert);
    // get the public download img url
    const downloadUrl = await storageRef.getDownloadURL();
    // save the url to local state
    setLogomarca(downloadUrl);
  }

  function img_reset() {
    setLogomarca(null);
    setFile(null);
  }

  useEffect(() => {
    let listagem = []; 
    api.get('/listar/deliverys').then(async result => {
      result.data.forEach(doc => {
        if (doc.delivery.indexOf(busca) >=0 ) {
          listagem.push({
            id_conta: doc.id_conta,
            logomarca: (!doc.logomarca) ? "https://via.placeholder.com/50" : doc.logomarca,
            delivery: doc.delivery,
            id_categoria: doc.id_categoria,
            telefone: doc.telefone,
            email: doc.email,
            status: doc.status
          })
        }
      })
      setDeliverys(listagem);
      console.log(listagem);
    })
  }, [busca, excluido, success]);

  function Cadastrar() {
    if (delivery.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = {
          "id_conta": null, 
          "delivery": delivery,
          "plano": plano,
          "status": status,
          "id_categoria": id_categoria,
          "responsavel": responsavel,
          "email": email,
          "telefone": telefone,
          "cnpj": cnpj, 
          "cpf": cpf,
          "endereco": endereco,
          "complemento": complemento,
          "bairro": bairro, "cidade": cidade,
          "uf": UF,
          "cep": CEP,
          "logomarca": logomarca,
          "marcador": marcador,
          "horario": horario
        }
        api.post('/delivery/add', json).then(response => {
          let delivery = {
            id_conta: response.data.id_conta,
            delivery: response.data.delivery,
            plano: response.data.plano,
            status: response.data.status,
            id_categoria: response.data.id_categoria,
            responsavel: response.data.responsavel,
            email: response.data.email,
            telefone: response.data.telefone,
            cnpj: response.data.cnpj,
            cpf: response.data.cpf,
            endereco: response.data.endereco,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            cidade: response.data.cidade,
            uf: response.data.uf,
            cep: response.data.cep,
            logomarca: response.logomarca,
            marcador: response.data.marcador,
            horario: response.data.horario,
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
    if (delivery.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
      const json = {
        "id_conta": id_conta,
        "delivery": delivery,
        "plano": plano,
        "status": status,
        "id_categoria": id_categoria,
        "responsavel": responsavel,
        "email": email,
        "telefone": telefone,
        "cnpj": cnpj,
        "cpf": cpf,
        "endereco": endereco,
        "complemento": complemento,
        "bairro": bairro,
        "cidade": cidade,
        "uf": UF,
        "cep": CEP,
        "logomarca": logomarca,
        "marcador": marcador,
        "horario": horario
      }
      await api.put(`/delivery/update/${id_conta}`, json).then(response => {
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
      setIdConta(result.data[0].id_conta);
      setDelivery(result.data[0].delivery);
      setPlano(result.data[0].plano);
      setStatus(result.data[0].status);
      setIdCategoria(result.data[0].id_categoria);
      setResponsavel(result.data[0].responsavel);
      setEmail(result.data[0].email);
      setTelefone(result.data[0].telefone);
      setCnpj(result.data[0].cnpj);
      setCpf(result.data[0].cpf);
      setEndereco(result.data[0].endereco);
      setComplemento(result.data[0].complemento);
      setBairro(result.data[0].bairro);
      setCidade(result.data[0].cidade);
      setUf(result.data[0].uf);
      setCep(result.data[0].cep);
      setLogomarca(result.data[0].logomarca);
      setMarcador(result.data[0].marcador);
      setHorario(result.data[0].horario);
    })
  }

  function deleteByID(id) {
    api.delete(`/delivery/delete/${id}`)
    .then(async(result) => {
      setExcluido(id);
      setConfirma(false);
    })
  }

  function confirmaExclusao(id) {
    let delivery = deliverys.find(item => item.id_conta === id);
    setSelecionado(delivery.delivery);
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
            <th scope="col">Logo</th>
            <th scope="col">Delivery</th>
            <th scope="col">Categoria</th>
            <th scope="col">Telefone</th>
            <th scope="col">E-mail</th>
            <th scope="col">Status</th>
            <th scope="col" className="col-action"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.array.map((delivery) => {
              return (
                <tr key={delivery.id_conta}>
                  <th scope="row">{delivery.id_conta}</th>
                  <td><img src={delivery.logomarca} alt="logo" width="50" /></td>
                  <td>{delivery.delivery}</td>
                  <td>{categoria(delivery.id_categoria)}</td>
                  <td>{delivery.telefone}</td>
                  <td>{delivery.email}</td>
                  <td>{delivery.status}</td>
                  <td>
                    <Link to="#" onClick={()=>props.select(delivery.id_conta)} title="EDITAR DELIVERY" data-bs-toggle="modal" data-bs-target="#md_editardelivery"><i className="fas fa-user-edit icon-action"></i></Link>
                    <Link to="#" onClick={()=>props.delete(delivery.id_conta)} title="EXCLUIR DELIVERY"><i className="fas fa-trash-alt icon-action red"></i></Link>
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
              <button onClick={VisualizarPDF} className="btn btn-warning"><i className="fas fa-file-pdf"></i> PDF</button>
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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-2">
                      <label htmlFor="delivery" className="form-label">Nome do Delivery</label>
                      <input onChange={e => setDelivery(e.target.value)} type="text" className="form-control" id="delivery" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="categoria" className="form-label">Categoria</label>
                      <select onChange={e => setIdCategoria(e.target.value)} className="form-select" id="categoria"> 
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
                      <label htmlFor="responsavel" className="form-label">Responsável</label>
                      <input onChange={e => setResponsavel(e.target.value)} type="text" className="form-control" id="responsavel" />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-2">
                      <img src={logomarca || "https://via.placeholder.com/100"} alt="Logomarca" width="100" />
                      <p></p>
                      <form onSubmit={imgUpload}>
                        <input type="file" onChange={imgChange} /><br/>
                        <button type="button" className="btn btn-primary" disabled={!file}><i className="fas fa-image"></i> ENVIAR IMAGEM</button>                         
                      </form>
                    </div>
                  </div>
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
                    <label htmlFor="cnpj" className="form-label">CNPJ</label>
                    <input onChange={e => setCnpj(e.target.value)} type="text" className="form-control" id="cnpj" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input onChange={e => setCpf(e.target.value)} type="text" className="form-control" id="cpf" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="endereco" className="form-label">Endereço</label>
                    <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
                  </div>
                  <div className="col-sm-2">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input onChange={e => setComplemento(e.target.value)} type="text" className="form-control" id="complemento" />
                  </div>
                  <div className="col-sm-4">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <input onChange={e => setBairro(e.target.value)} type="text" className="form-control" id="bairro" />
                    </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input onChange={e => setCidade(e.target.value)} type="text" className="form-control" id="cidade" />
                  </div>
                  <div className="col">
                    <label htmlFor="UF" className="form-label">UF</label>
                    <select onChange={e => setUf(e.target.value)} className="form-select" id="UF" defaultValue="MG">
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
                      <option value="MG">MINAS GERAIS</option>
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
                  <div className="col">
                    <label htmlFor="CEP" className="form-label">CEP</label>
                    <input onChange={e => setCep(e.target.value)} type="text" className="form-control" id="CEP" />
                  </div>
                </div>

                <div className="mb-2">
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

                <div className="mb-2">
                  <label htmlFor="horario" className="form-label">Horário</label>
                  <input onChange={e => setHorario(e.target.value)} type="text" className="form-control" id="horario" />
                </div>

                {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                {success === 'S' ? <Redirect to='/app/menu/delivery'/> : null}

              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={img_reset}>CANCELAR</button>
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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-2">
                      <label htmlFor="delivery" className="form-label">Nome do Delivery</label>
                      <input onChange={e => setDelivery(e.target.value)} value={delivery} type="text" className="form-control" id="delivery" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="categoria" className="form-label">Categoria</label>
                      <select onChange={e => setIdCategoria(e.target.value)} className="form-select" value={id_categoria} id="categoria"> 
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
                      <label htmlFor="responsavel" className="form-label">Responsável</label>
                      <input onChange={e => setResponsavel(e.target.value)} value={responsavel} type="text" className="form-control" id="responsavel" />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-2">
                      <img src={logomarca || "https://via.placeholder.com/100"} alt="Logomarca" width="100" />
                      <p></p>
                      <form onSubmit={imgUpload}>
                        <input type="file" onChange={imgChange} /><br/>
                        <button type="button" className="btn btn-primary" disabled={!file}><i className="fas fa-image"></i> ENVIAR IMAGEM</button>                         
                      </form>
                    </div>
                  </div>
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
                    <label htmlFor="cnpj" className="form-label">CNPJ</label>
                    <input onChange={e => setCnpj(e.target.value)} value={cnpj} type="text" className="form-control" id="cnpj" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input onChange={e => setCpf(e.target.value)} value={cpf} type="text" className="form-control" id="cpf" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="endereco" className="form-label">Endereço</label>
                    <input onChange={e => setEndereco(e.target.value)} value={endereco} type="text" className="form-control" id="endereco" />
                  </div>
                  <div className="col-sm-2">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input onChange={e => setComplemento(e.target.value)} value={complemento} type="text" className="form-control" id="complemento" />
                  </div>
                  <div className="col-sm-4">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <input onChange={e => setBairro(e.target.value)} value={bairro} type="text" className="form-control" id="bairro" />
                    </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input onChange={e => setCidade(e.target.value)} value={cidade} type="text" className="form-control" id="cidade" />
                  </div>
                  <div className="col">
                    <label htmlFor="UF" className="form-label">UF</label>
                    <select onChange={e => setUf(e.target.value)} value={UF} className="form-select" id="UF" defaultValue="MG">
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
                      <option value="MG">MINAS GERAIS</option>
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
                  <div className="col">
                    <label htmlFor="CEP" className="form-label">CEP</label>
                    <input onChange={e => setCep(e.target.value)} value={CEP} type="text" className="form-control" id="CEP" />
                  </div>
                </div>

                <div className="mb-2">
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
    
                <div className="mb-2">
                  <label htmlFor="horario" className="form-label">Horário</label>
                  <input onChange={e => setHorario(e.target.value)} value={horario} type="text" className="form-control" id="horario" />
                </div>

                {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                {success === 'S' ? <Redirect to='/app/menu/delivery'/> : null}

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
