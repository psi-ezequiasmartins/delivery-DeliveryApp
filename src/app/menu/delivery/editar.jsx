import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp';
import './editar.css';

import api from '../../config/api_mysql';

function Editar(props) {
  const [id, setId] = useState(0);
  const [categoria, setCategoria] = useState(0);
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

  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState('N');

  useEffect(() => {
    console.log(props.match.params.id);
    api.get(`/delivery/${props.match.params.id}`)
    .then(result => {
      console.log(result.data[0]);
      setId(result.data[0].id_delivery);
      setCategoria(result.data[0].id_categoria);
      setNome(result.data[0].nome);
      setResponsavel(result.data[0].responsavel);
      setEmail(result.data[0].email);
      setTelefone(result.data[0].telefone);
      setEndereco(result.data[0].endereco);
      setComplemento(result.data[0].complemento);
      setBairro(result.data[0].bairro);
      setCidade(result.data[0].cidade);
      setUf(result.data[0].uf);
      setCep(result.data[0].cep);
      setMarcador(result.data[0].marcador);
      setHorario(result.data[0].horario);
      setCnpj(result.data[0].cnpj);
      setCpf(result.data[0].cpf);
    })
  }, [props.match.params.id])

  function AlterarDados() {

    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = { 
          "id_delivery": id, "id_categoria": categoria,
          "nome": nome, "responsavel": responsavel, "email": email, "telefone": telefone,
          "endereco": endereco, "complemento": complemento, "bairro": bairro,  "cidade": cidade, "uf": UF, "cep": CEP,
          "marcador": marcador, "horario": horario, 
          "cnpj": cnpj, "cpf": cpf
        }
        console.log(json);
        api.put('/delivery/update/', json).then(response => {
          console.log(response.data);
          let delivery = {
            categoria: response.data.id_categoria,
            nome: response.data.nome,
            responsavel: response.data.responsavel,
            email: response.data.email,
            telefone: response.data.telefone,
            endereco: response.data.endereco,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            cidade: response.data.cidade,
            uf: response.data.uf,
            cep: response.data.cep,
            marcador: response.data.marcador,
            horario: response.data.horario,
            cnpj: response.data.cnpj,
            cpf: response.data.cpf 
          }
          alert('Dados atualizados com sucesso!');
          console.log(delivery);
        }).then(() => {
          setMsg('');
          setSuccess('S');
        }).catch((erro) =>{
          setMsg(erro);
          setSuccess('N');
        })
      }
    }

  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">

<div className="offset-lg-3 col-lg-6">
  <h1>EDITAR DADOS DO DELIVERY</h1> 
  <form>
      
    <div className="mb-3">
      <label htmlFor="nome" className="form-label">Nome do Delivery</label>
      <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" />
    </div>
    
    <div className="mb-3">
      <label htmlFor="categoria" className="form-label">Categoria</label>

      <select onChange={e => setCategoria(e.target.value)} class="form-select" value={categoria} id="categoria"> 
        <option value="1">OFERTAS</option>
        <option value="2">SANDUICHES</option>
        <option value="3">HOTDOGS</option>
        <option value="4">BEBIDAS</option>
        <option value="5">PRATOS & PORÇÕES</option>
        <option value="6">SUPERMERCADO</option>
        <option value="7">FRUTAS & VERDURAS</option>
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
        <input onChange={e => setUf(e.target.value)} value={UF} type="text" className="form-control" id="UF" />
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
      <p>* <a href="https://maps.google.com/" target="_blank">Clique aqui</a> para acessar o Google Maps</p>
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

    <div className="mb-3">
      <Link to="/app/menu/delivery" className="btn btn-outline-primary btn-action">CANCELAR</Link>
      <button onClick={AlterarDados} type="button" className="btn btn-primary btn-action">SALVAR</button>
    </div>

    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
    {success === 'S' ? <Redirect to='/app/menu/delivery'/> : null}

  </form>
</div>

      </div>
    </div>
  );
}

export default Editar;