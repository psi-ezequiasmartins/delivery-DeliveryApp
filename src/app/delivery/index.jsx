import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import Menu from "../../components/menu";
import './index.css';

import api from '../../app/config/config.mysql';

function Delivery() {
  const vDelivery = "SANDUBA DO ZÉ"; // localStorage.getItem("delivery");
  const vToken = 1002; // localStorage.getItem("token");

  const [delivery, setDelivery] = useState([]);

  const [nome, setNome] = useState(delivery.Nome || vDelivery);
  const [planoassinatura, setPlanoAssinatura] = useState(delivery.PlanoAssinatura || "BASIC");
  const [situacao, setSituacao] = useState(delivery.Situacao || "ATIVO");
  const [categoria, setCategoria] = useState(delivery.CategoriaID || 101);
  const [responsavel, setResponsavel] = useState(delivery.Responsavel || "");
  const [email, setEmail] = useState(delivery.Email || "");
  const [telefone, setTelefone] = useState(delivery.Telefone || "");
  const [horario, setHorario] = useState(delivery.Horario || "");
  const [mindeliverytime, setMinDeliverTime] = useState(delivery.MinDeliveryTime || 15);
  const [maxdeliverytime, setMaxDeliverTime] = useState(delivery.MaxDeliveryTime || 45);
  const [rating, setRating] = useState(delivery.Rating || 4.9);
  const [taxaentrega, setTaxaEntrega] = useState(delivery.TaxaEntrega || 5.0);
  const [urlimagem, setUrlImagem] = useState(delivery.UrlImagem || "");
  const [endereco, setEndereco] = useState(delivery.Endereco || "");  
  const [latitude, setLatitude] = useState(delivery.Latitude || -19.92273710527297); 
  const [longitude, setLongitude] = useState(delivery.Longitude || -43.945118685204825);
  const [token, setTokenADM] = useState(delivery.TokenADM || "");

  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  async function loadDeliveryInfo() {
    if (vToken) {
      await api.get(`/delivery/${vToken} `) 
      .then((response) => {
        setDelivery(response.data);
        setNome(response.data.Nome);
        setPlanoAssinatura(response.data.PlanoAssinatura); 
        setSituacao(response.data.Situacao);
        setCategoria(response.data.CategoriaID)
        setResponsavel(response.data.Responsavel);
        setEmail(response.data.Email);
        setTelefone(response.data.Telefone);
        setHorario(response.data.Horario);
        setMinDeliverTime(response.data.MinDeliveryTime);
        setMaxDeliverTime(response.data.MaxDeliveryTime);
        setRating(response.data.Rating);
        setTaxaEntrega(response.data.TaxaEntrega);
        setUrlImagem(response.data.UrlImagem);
        setEndereco(response.data.Endereco);
        setLatitude(response.data.Latitude);
        setLongitude(response.data.Longitude);
        setTokenADM(response.data.TokenADM);

        console.count = 0;
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(() => {
    loadDeliveryInfo();
  }, [delivery])

  function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (responsavel.length === 0) {
        setMsg('Favor preencher o campo Nome do Responsável.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = {
          "DeliveryID": null, 
          "Nome": nome,
          "PlanoAssinatura": planoassinatura, 
          "Situacao": situacao,
          "CategoriaID": categoria,
          "Responsavel": responsavel,
          "Email": email,
          "Telefone": telefone,
          "Horario": horario,
          "MinDeliveryTime": mindeliverytime,
          "MaxDeliveryTime": maxdeliverytime,
          "Rating": rating,
          "TaxaEntrega": taxaentrega,
          "UrlImagem": urlimagem,
          "Endereco": endereco,
          "Latitude": latitude, 
          "Longitude": longitude,
          "TokenADM": token
        }
        api.put(`/update/delivery/${vToken} `, json).then(response => {
          setDelivery(response.data);
          // let delivery = {
          // }
          console.log(delivery);
          localStorage.setItem("delivery", response.data.Nome);
          localStorage.setItem("token", response.data.DeliveryID);
          localStorage.setItem("email", response.data.email);
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
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="delivery" />
        </div>

        <div className="col py-3 me-3">
          <div className='shadow-sm delivery'>

            <h1>DADOS DO DELIVERY</h1>

            <form>
              <div className="row">

                <div className="mb-2">
                  <label htmlFor="nome" className="form-label">Nome do Delivery</label>
                  <input onChange={e => setNome(e.target.value)} value={delivery.Nome} type="text" className="form-control" id="delivery" />
                </div>

                <div className="mb-2">
                  <label htmlFor="plano" className="form-label">Plano</label>
                  <select onChange={e => setPlanoAssinatura(e.target.value)} value={planoassinatura} className="form-select" id="plano"> 
                    <option value="101">PLANO FREE até 03 produtos - Degustação (para testar)</option>
                    <option value="102">PLANO BASIC até 10 Produtos - Suporte Offline (via e-mail) R$ 89,90/mês</option>
                    <option value="103">PLANO PRO até 50 Produtos - Suporte Online (videoconferência) + Google Ads R$ 189,90/mês</option>
                  </select>
                  <input onChange={e => setSituacao(e.target.value)} value={situacao} type="hidden" id="status" name="status" />
                  <input onChange={e => setUrlImagem(e.target.value)} value={urlimagem} type="hidden" id="urlimagem" name="urlimagem" />
                </div>

                <div className="mb-2">
                  <label htmlFor="categoria" className="form-label">Categoria</label>
                  <select onChange={e => setCategoria(e.target.value)} value={categoria} className="form-select" id="categoria"> 
                    <option value="101">OFERTAS</option>
                    <option value="102">SANDUICHES</option>
                    <option value="103">HOTDOGS</option>
                    <option value="104">BEBIDAS</option>
                    <option value="105">PRATOS E PORÇÕES</option>
                    <option value="106">SUSHI</option>
                    <option value="107">FRUTAS E VERDURAS</option>
                    <option value="108">MEDICAMENTOS</option>
                    <option value="109">GÁS DE COZINHA</option>
                    <option value="110">FLORICULTURA</option>
                    <option value="111">ÁGUA MINERAL</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="responsavel" className="form-label">Responsável</label>
                  <input onChange={e => setResponsavel(e.target.value)} value={responsavel} type="text" className="form-control" id="responsavel" />
                </div>

                <div className="row">
                  <div className="col-8">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="email" />
                  </div>
                  <div className="col-4">
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    <input onChange={e => setTelefone(e.target.value)} value={telefone} type="text" className="form-control" id="telefone" />
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="horario" className="form-label">Horário</label>
                  <input onChange={e => setHorario(e.target.value)} value={horario} type="text" className="form-control" id="horario" />
                </div>

                <div className="row">
                  <div className="col-3">
                    <label htmlFor="mindeliverytime" className="form-label">Tempo Mín.</label>
                    <input onChange={e => setMinDeliverTime(e.target.value)} value={mindeliverytime} type="text" className="form-control" id="minideliverytime" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="maxdeliverytime" className="form-label">Tempo Máx.</label>
                    <input onChange={e => setMaxDeliverTime(e.target.value)} value={maxdeliverytime} type="text" className="form-control" id="maxdeliverytime" />
                  </div>
                  <div className="col-3">
                    <label htmlFor="rating" className="form-label">Pontuação</label>
                    <select onChange={e => setRating(e.target.value)} value={rating} className="form-select" id="rating"> 
                      <option value="4.9">ÓTIMA</option>
                      <option value="3.5">MUITO BOA</option>
                      <option value="2.5">REGULAR</option>
                      <option value="1.0">FRACA</option>
                      <option value="0.5">RUIM</option>
                      <option value="0.1">PÉSSIMA</option>
                    </select>
                  </div>
                  <div className="col-3">
                    <label htmlFor="taxaentrega" className="form-label">Taxa Entrega</label>
                    <input onChange={e => setTaxaEntrega(e.target.value)} value={taxaentrega} type="text" className="form-control" id="taxaentrega" />
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="endereco" className="form-label">Endereço</label>
                  <input onChange={e => setEndereco(e.target.value)} value={endereco} type="text" className="form-control" id="endereco" />
                </div>

                <div className="row">
                  <div className="col-6">
                    <label htmlFor="latitude" className="form-label">LATITUDE</label>
                    <input onChange={e => setLatitude(e.target.value)} value={latitude} type="text" className="form-control" id="latitude" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="longitude" className="form-label">LONGITUDE</label>
                    <input onChange={e => setLongitude(e.target.value)} value={longitude} type="text" className="form-control" id="longitude" />
                  </div>
                </div>

                <div className="mb-2">
                  <p>Como obter as suas coordenadas no Google Maps:</p>
                  <p>
                    1. No computador, abra o link abaixo para Google Maps.<br/>
                    2. Digite o seu endereço na caixa de pesquisa (busca) do Mapa, será apontado um marcador (ícone na cor vermelha) que vc deverá clicar com o botao direito do mouse, ou tocar e aguardar abrir uma janela pop-up. A latitude e a longitude vão aparecer no formato decimal na parte superior.<br/>
                    3. Para copiar as coordenadas automaticamente, clique (ou toque) na latitude e longitude informadas.
                  </p>
                  <p>* <a href="https://maps.google.com/" target="_blank" rel="noreferrer">Clique aqui</a> para acessar o Google Maps</p>
                </div>

                <input onChange={e => setTokenADM(e.target.value)} value={token} type="hidden" id="token" name="token" />

                {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                {success === 'S' ? redirect("/") : null}

              </div>
            </form>

            <div className="footer">
              <button type="button" className="btn btn-success" onClick={Editar} >SALVAR DADOS</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Delivery;