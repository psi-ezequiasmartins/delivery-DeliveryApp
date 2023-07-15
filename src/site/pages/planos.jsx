import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import './planos.css';

import api from '../../app/config/config.mysql';

function Planos() {
    // eslint-disable-next-line

    const [nome, setNome] = useState("");
    const [planoassinatura, setPlanoAssinatura] = useState("BASIC");
    const [situacao, setSituacao] = useState("ATIVO");
    const [categoria, setCategoria] = useState(101);
    const [responsavel, setResponsavel] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [horario, setHorario] = useState("");
    const [mindeliverytime, setMinDeliverTime] = useState(15);
    const [maxdeliverytime, setMaxDeliverTime] = useState(45);
    const [rating, setRating] = useState(4.9);
    const [taxaentrega, setTaxaEntrega] = useState(5.0);
    const [urlimagem, setUrlImagem] = useState("");
    const [endereco, setEndereco] = useState("");  
    const [latitude, setLatitude] = useState(-19.92273710527297); 
    const [longitude, setLongitude] = useState(-43.945118685204825);
    const [token, setTokenADM] = useState("");

    const [success, setSuccess] = useState('N');
    const [msg, setMsg] = useState('');

    function Cadastrar() {
      if (nome.length === 0) {
        setMsg('Favor preencher o campo Nome do Delivery.');
      } else if (email.length === 0) {
        setMsg('Favor preencher o campo E-mail.');
      } else {
          const json = {
            DeliveryID: null, 
            Nome: nome,
            PlanoAssinatura: planoassinatura, 
            Situacao: situacao,
            CategoriaID: categoria,
            Responsavel: responsavel,
            Email: email,
            Telefone: telefone,
            Horario: horario,
            MinDeliveryTime: mindeliverytime,
            MaxDeliveryTime: maxdeliverytime,
            Rating: rating,
            TaxaEntrega: taxaentrega,
            UrlImagem: urlimagem,
            Endereco: endereco,
            Latitude: latitude, 
            Longitude: longitude,
            TokenADM: token
          }
          api.post('/delivery/add/', json).then(response => {
            let delivery = {
              DeliveryID: response.data.DeliveryID, 
              Nome: response.data.Nome,
              PlanoAssinatura: response.data.PlanoAssinatura, 
              Situacao: response.data.Situacao,
              CategoriaID: response.data.CategoriaID,
              Responsavel: response.data.Responsavel,
              Email: response.data.Email,
              Telefone: response.data.Telefone,
              Horario: response.data.Horario,
              MinDeliveryTime: response.data.MinDeliveryTime,
              MaxDeliveryTime: response.data.MaxDeliveryTime,
              Rating: response.data.Rating,
              TaxaEntrega: response.data.TaxaEntrega,
              UrlImagem: response.data.UrlImagem,
              Endereco: response.data.Endereco,
              Latitude: response.data.Latitude, 
              Longitude: response.data.Longitude,
              TokenADM: response.data.TokenADM
            }
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
      <section id="planos-e-precos">
        <div className="container">

          <div className="row text-center">
            <div className="titulo">
              <h1>Planos e Preços</h1>
              <p>Comece sua avaliação gratuita. Não é necessário cartão de crédito.</p>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Free</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 0,00</h2>  
                  <p>até 03 produtos</p>
                  <p>Degustação (para testar)<br/>sem suporte.</p>
                  <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Basic</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 89,90</h2>  
                  <p>Até 10 produtos</p>
                  <p>Suporte Offline (básico)+<br/>Via E-mail</p>
                  <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Pro</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 189,90</h2>  
                  <p>Até 50 produtos</p>
                  <p>Suporte Online (acesso remoto)+<br/>Publicidade no Google Ads*</p>
                  <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row text-center">
            <div className="titulo">
              <h3>(*) Google Ads</h3>
              <p>Promova o seu Delivery em sua região através do nosso Markting Digital c/ Google Ads.<br/>Outros planos e informações, por favor entre em contato conosco.</p>
            </div>
          </div>

        </div>

        {/* -- md_assinatura -- */}
        <div className="modal fade" id="md_assinatura" aria-hidden="true" aria-labelledby="titulo_modal" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="titulo_modal">ASSINATURA (NOVO DELIVERY)</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="row">

                    <div className="mb-2">
                      <label htmlFor="nome" className="form-label">Nome do Delivery</label>
                      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="delivery" />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="plano" className="form-label">Plano</label>
                      <select onChange={e => setPlanoAssinatura(e.target.value)} className="form-select" id="plano" value=""> 
                        <option value="101">PLANO FREE somente até 3 Produtos (Demonstração) R$ 0,00</option>
                        <option value="102">PLANO BASIC até 10 Produtos (Suporte Offline) R$ 49,90/mês</option>
                        <option value="103">PLANO PRO até 50 Produtos (Suporte Online + Google Ads) R$ 99,90/mês</option>
                      </select>
                      <input onChange={e => setSituacao(e.target.value)} type="hidden" id="status" name="status" value="ATIVO"/>
                      <input onChange={e => setUrlImagem(e.target.value)} type="hidden" id="urlimagem" name="urlimagem" value=""/>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="categoria" className="form-label">Categoria</label>
                      <select onChange={e => setCategoria(e.target.value)} className="form-select" id="categoria" value=""> 
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
                      <input onChange={e => setResponsavel(e.target.value)} type="text" className="form-control" id="responsavel" />
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                      </div>
                      <div className="col-4">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input onChange={e => setTelefone(e.target.value)} type="text" className="form-control" id="telefone" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="horario" className="form-label">Horário</label>
                      <input onChange={e => setHorario(e.target.value)} type="text" className="form-control" id="horario" />
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <label htmlFor="mindeliverytime" className="form-label">Tempo Mín.</label>
                        <input onChange={e => setMinDeliverTime(e.target.value)} type="text" className="form-control" id="minideliverytime" />
                      </div>
                      <div className="col-3">
                        <label htmlFor="maxdeliverytime" className="form-label">Tempo Máx.</label>
                        <input onChange={e => setMaxDeliverTime(e.target.value)} type="text" className="form-control" id="maxdeliverytime" />
                      </div>
                      <div className="col-3">
                        <label htmlFor="rating" className="form-label">Pontuação</label>
                        <select onChange={e => setRating(e.target.value)} className="form-select" id="rating" value=""> 
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
                        <input onChange={e => setTaxaEntrega(e.target.value)} type="text" className="form-control" id="taxaentrega" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="latitude" className="form-label">LATITUDE</label>
                        <input onChange={e => setLatitude(e.target.value)} type="text" className="form-control" id="latitude" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="longitude" className="form-label">LONGITUDE</label>
                        <input onChange={e => setLongitude(e.target.value)} type="text" className="form-control" id="longitude" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <p>Como obter as suas coordenadas no Google Maps:</p>
                      <p>
                        1. No computador, abra o Google Maps.<br/>
                        2. Clique com o botão direito do mouse no lugar ou na área no mapa. Uma janela pop-up será aberta. A latitude e a longitude vão aparecer no formato decimal na parte superior.<br/>
                        3. Para copiar as coordenadas automaticamente, clique na latitude e longitude.
                      </p>
                      <p>* <a href="https://maps.google.com/" target="_blank" rel="noreferrer">Clique aqui</a> para acessar o Google Maps</p>
                    </div>

                    <input onChange={e => setTokenADM(e.target.value)} type="hidden" id="token" name="token" value=""/>
                    
                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? redirect("/") : null}

                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCELAR</button>
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={Cadastrar}>CONCLUIR</button>
              </div>

            </div>
          </div>
        </div>

      </section>
    );
  }

export default Planos;
