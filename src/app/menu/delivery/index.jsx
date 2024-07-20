import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import Menu from "../../../components/menu";
import './index.css';

import api from "../../../config/apiAxios";

function Delivery() {
  const vDelivery = localStorage.getItem("vDelivery"); 
  const vID = localStorage.getItem("vID");

  const [delivery, setDelivery] = useState([]);

  const [nome, setNome] = useState(delivery?.DELIVERY_NOME || vDelivery);
  const [planoassinatura, setPlanoAssinatura] = useState(delivery?.PLANO || "BASIC");
  const [situacao, setSituacao] = useState(delivery?.SITUACAO || "ATIVO");
  const [categoria, setCategoria] = useState(delivery?.CATEGORIA_ID || 101);
  const [responsavel, setResponsavel] = useState(delivery?.RESPONSAVEL || "");
  const [email, setEmail] = useState(delivery?.EMAIL || "");
  const [telefone, setTelefone] = useState(delivery?.TELEFONE || "");
  const [horario, setHorario] = useState(delivery?.HORARIO || "");
  const [mindeliverytime, setMinDeliverTime] = useState(delivery?.MIN_DELIVERY_TIME || 15);
  const [maxdeliverytime, setMaxDeliverTime] = useState(delivery?.MAX_DELIVERY_TIME || 45);
  const [taxaentrega, setTaxaEntrega] = useState(delivery?.TAXA_ENTREGA || 5.0);
  const [rating, setRating] = useState(delivery?.RATING || 4.9);
  const [urlimagem, setUrlImagem] = useState(delivery?.URL_IMAGEM || "");
  const [endereco, setEndereco] = useState(delivery?.ENDERECO || "");  
  const [numero, setNumero] = useState(delivery?.NUMERO || "");
  const [complemento, setComplemento] = useState(delivery?.COMPLEMENTO || "");
  const [bairro, setBairro] = useState(delivery?.BAIRRO || "");
  const [cidade, setCidade] = useState(delivery?.CIDADE || "");
  const [UF, setUf] = useState(delivery?.UF || "");
  const [CEP, setCep] = useState(delivery?.CEP || "");
  // const [latitude, setLatitude] = useState(delivery?.LATITUDE || -19.92273710527297); 
  // const [longitude, setLongitude] = useState(delivery?.LONGITUDE || -43.945118685204825);
  const [token_msg, setTokenMSG] = useState(delivery?.TOKEN_MSG || "");

  const [success, setSuccess] = useState('N');
  const [msg, setMsg] = useState('');

  async function loadDeliveryInfo() {
    if (vID) {
      await api.get(`/delivery/${vID} `) 
      .then((response) => {
        setDelivery(response.data);
        setNome(response.data.DELIVERY_NOME);
        setPlanoAssinatura(response.data.PLANO); 
        setSituacao(response.data.SITUACAO);
        setCategoria(response.data.CATEGORIA_ID)
        setResponsavel(response.data.RESPONSAVEL);
        setEmail(response.data.EMAIL);
        setTelefone(response.data.TELEFONE);
        setHorario(response.data.HORARIO);
        setMinDeliverTime(response.data.MIN_DELIVERY_TIME);
        setMaxDeliverTime(response.data.MAX_DELIVERY_TIME);
        setRating(response.data.RATING);
        setTaxaEntrega(response.data.TAXA_ENTREGA);
        setUrlImagem(response.data.URL_IMAGEM);
        setEndereco(response.data.ENDERECO);
        setNumero(response.data.NUMERO);
        setComplemento(response.data.COMPLEMENTO);
        setBairro(response.data.BAIRRO);
        setCidade(response.data.CIDADE);
        setUf(response.data.UF);
        setCep(response.data.CEP);
        // setLatitude(response.data.Latitude);
        // setLongitude(response.data.Longitude);
        setTokenMSG(response.data.TOKEN_MSG);
        console.count = 0;
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(() => {
    loadDeliveryInfo(); // eslint-disable-next-line
  }, [vID])

  async function Editar() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else {
      const json = {
        "DELIVERY_ID": vID, 
        "DELIVERY_NOME": nome,
        "PLANO": planoassinatura, 
        "SITUACAO": situacao,
        "CATEGORIA_ID": categoria,
        "RESPONSAVEL": responsavel,
        "EMAIL": email,
        "TELEFONE": telefone,
        "HORARIO": horario,
        "MIN_DELIVERY_TIME": mindeliverytime,
        "MAX_DELIVERY_TIME": maxdeliverytime,
        "RATING": rating,
        "TAXA_ENTREGA": taxaentrega,
        "URL_IMAGEM": urlimagem,
        "ENDERECO": endereco,
        "NUMERO": numero,
        "COMPLEMENTO": complemento,
        "BAIRRO": bairro,
        "CIDADE": cidade,
        "UF": UF,
        "CEP": CEP,
        // "Latitude": latitude, 
        // "Longitude": longitude,
        "TOKEN_MSG": token_msg
      }
      await api.put(`/update/delivery/${vID} `, json).then((response) => {
        console.log(response.data);
        setMsg('Dados atualizados com sucesso!');
        setSuccess('S'); 
      }).catch((error) => {
        setMsg(error);
        setSuccess("N"); 
      });
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
                  <input onChange={e => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" />
                </div>

                <div className="mb-2">
                  <label htmlFor="plano" className="form-label">Plano*</label>
                  {/* <input type="text" className="form-control" id="plano" value={planodeassinatura} readOnly />  */}
                  <select value={planoassinatura} className="form-select" id="plano" readOnly> 
                    <option value="BASIC">Plano Free | Até 7 produtos, Suporte Offline (via e-mail): R$ 0,00</option>
                    <option value="PRO">Plano Pro | Até 30 produtos, Suporte Online (videoconferência) + Cardápio Online: R$ 79,90/mês</option>
                    <option value="PREMIUM">Plano Premium | Até 50 Produtos, Suporte Online (videoconferência) + Cardápio Online + Google Ads + Vídeo: R$ 179,90/mês</option>
                  </select>
                  <input onChange={e => setSituacao(e.target.value)} value={situacao} type="hidden" id="status" name="status" />
                  <input onChange={e => setUrlImagem(e.target.value)} value={urlimagem} type="hidden" id="urlimagem" name="urlimagem" />
                </div>

                <div className="mb-2">
                  <label htmlFor="categoria" className="form-label">Categoria*</label>
                  {/* <input type="text" className="form-control" id="categoria" value={categoria} readOnly />  */}
                  <select value={categoria} className="form-select" id="categoria" readOnly> 
                    <option value="101">Ofertas</option>
                    <option value="102">Sanduiches</option>
                    <option value="103">Hotdog</option>
                    <option value="104">Bebidas</option>
                    <option value="105">Pratos e Porções</option>
                    <option value="106">Sushi</option>
                    <option value="107">Frutas e Verduras</option>
                    <option value="108">Medicamentos</option>
                    <option value="109">Gás de Cozinha</option>
                    <option value="110">Floricultura</option>
                    <option value="111">Água Mineral</option>
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
                    <label htmlFor="rating" className="form-label">Pontuação*</label>
                    <select value={rating} className="form-select" id="rating" readOnly> 
                      <option value="4.9">Ótima</option>
                      <option value="3.5">Muito Boa</option>
                      <option value="2.5">Regular</option>
                      <option value="1.0">Fraca</option>
                      <option value="0.5">Ruim</option>
                      <option value="0.1">Péssima</option>
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

                {/* <div className="row">
                  <div className="col-6">
                    <label htmlFor="latitude" className="form-label">LATITUDE</label>
                    <input onChange={e => setLatitude(e.target.value)} value={latitude} type="text" className="form-control" id="latitude" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="longitude" className="form-label">LONGITUDE</label>
                    <input onChange={e => setLongitude(e.target.value)} value={longitude} type="text" className="form-control" id="longitude" />
                  </div>
                </div> */}

                <div className="mb-2">
                  <p></p>
                  <p>(*) Alguns campos são protegidos (somente para leitura), para atualizar e/ou modificá-los, entre em contato conosco.</p>
                  <p>Como obter as suas coordenadas no Google Maps:</p>
                  <p>
                    1. No computador, abra o link abaixo para Google Maps.<br/>
                    2. Digite o seu endereço na caixa de pesquisa (busca) do Mapa, será apontado um marcador (ícone na cor vermelha) que vc deverá clicar com o botao direito do mouse, ou tocar e aguardar abrir uma janela pop-up. A latitude e a longitude vão aparecer no formato decimal na parte superior.<br/>
                    3. Para copiar as coordenadas automaticamente, clique (ou toque) na latitude e longitude informadas.
                  </p>
                  <p>* <a href="https://maps.google.com/" target="_blank" rel="noreferrer">Clique aqui</a> para acessar o Google Maps</p>
                </div>

                <input onChange={e => setTokenMSG(e.target.value)} value={token_msg} type="hidden" id="token" name="token" />

                {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                {success === 'S' ? redirect("/") : null}

              </div>
            </form>

            <div className="footer">
              <button type="button" className="btn btn-dark" onClick={Editar} >SALVAR DADOS</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Delivery;