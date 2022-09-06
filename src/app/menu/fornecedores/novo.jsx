import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp';
import './novo.css';

import api from '../../config/api_mysql';

function Novo(props) {
  // const [id_fornecedor, setIdFornecedor] = useState(null);
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
 
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState('N');

  function CadastrarDados() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Fornecedor.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = {
          "id_fornecedor": null, 
          "nome": nome, "email": email, "telefone": telefone,
          "endereco": endereco, "complemento": complemento, "bairro": bairro, "cidade": cidade, "uf": UF, "cep": CEP,
          "cnpj": cnpj, "cpf": cpf
        }
        api.post('/fornecedor/add', json).then(response => {
          let fornecedor = {
            id_fornecedor: response.data.id_fornecedor,
            nome: response.data.nome, email: response.data.email, telefone: response.data.telefone,
            endereco: response.data.endereco, complemento: response.data.complemento, bairro: response.data.bairro, cidade: response.data.cidade, uf: response.data.uf, cep: response.data.cep,
            cnpj: response.data.cnpj, cpf: response.data.cpf 
          }
          console.log(fornecedor);
      }).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((erro) => {
        setMsg(erro);
        setSuccess("N");
      })  
    }
  }

  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">

<div className="offset-lg-3 col-lg-6">
  <h1>CADASTRAR DADOS DO FORNECEDOR</h1>
  <form>

    <div className="mb-2">
      <label htmlFor="nome" className="form-label">Nome do Fornecedor</label>
      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
    </div>

    <div className="row mb-2">
      <div className="col-sm-8">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
      </div>
      <div className="col-sm-4">
        <label htmlFor="telefone" className="form-label">Telefone</label>
        <input onChange={e => setTelefone(e.target.value)} type="text" className="form-control" id="telefone" />
      </div>
    </div>
 
    <div className="row mb-2">
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

    <div className="row mb-2">
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

    <div className="row mb-2">
      <div className="col-sm-6">
        <label htmlFor="cnpj" className="form-label">CNPJ</label>
        <input onChange={e => setCnpj(e.target.value)} type="text" className="form-control" id="cnpj" />
      </div>
      <div className="col-sm-6">
        <label htmlFor="cpf" className="form-label">CPF</label>
        <input onChange={e => setCpf(e.target.value)} type="text" className="form-control" id="cpf" />
      </div>
    </div>

    <div className="mb-3">
      <Link to="/app/menu/fornecedores/" className="btn btn-outline-primary btn-action">CANCELAR</Link>
      <button onClick={CadastrarDados} type="button" className="btn btn-primary btn-action">SALVAR</button>
    </div>

    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
    {success === 'S' ? <Redirect to='/app/menu/fornecedores/'/> : null}

  </form>
</div>

      </div>
    </div>
  );
}

export default Novo;
