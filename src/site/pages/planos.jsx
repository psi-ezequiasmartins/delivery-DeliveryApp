import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import './planos.css';

import api from '../../config/mysql';

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
            localStorage.setItem("token", response.data.DeliveryID);
            localStorage.setItem("delivery", response.data.Nome);
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
                  <h1>Basic</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 49,90</h2>  
                  <p>Até 10 produtos</p>
                  <p>Suporte Offline (via e-mail)+<br/>Documentação Online</p>

                  {/* !-- INICIO FORMULARIO BOTAO PAGBANK: NAO EDITE OS COMANDOS DAS LINHAS ABAIXO -- */}
                  <form action="https://pagseguro.uol.com.br/pre-approvals/request.html" method="post">
                  <input type="hidden" name="code" value="D56951268585189884B60FB3D4F3D67C" />
                  <input type="hidden" name="iot" value="button" />
                  <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/assinaturas/209x48-assinar-azul-assina.gif" name="submit" alt="Pague com PagBank - É rápido, grátis e seguro!" width="209" height="48" />
                  </form>
                  {/* !-- FINAL FORMULARIO BOTAO PAGBANK -- */}
                  {/* <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a> */}
                </div>
              </div>
            </div> 


            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Pro</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 179,90</h2>  
                  <p>Até 30 produtos</p>
                  <p>Suporte Online (videoconferência)+<br/>Publicidade no Google Ads*</p>
                  {/* !-- INICIO FORMULARIO BOTAO PAGBANK: NAO EDITE OS COMANDOS DAS LINHAS ABAIXO -- */}
                  <form action="https://pagseguro.uol.com.br/pre-approvals/request.html" method="post">
                  <input type="hidden" name="code" value="E0BBDF39242432E224507F9DD48F0BC9" />
                  <input type="hidden" name="iot" value="button" />
                  <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/assinaturas/209x48-assinar-azul-assina.gif" name="submit" alt="Pague com PagBank - É rápido, grátis e seguro!" width="209" height="48" />
                  </form>
                  {/* !-- FINAL FORMULARIO BOTAO PAGBANK -- */}
                  {/* <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a> */}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Premium</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 375,00</h2>  
                  <p>Até 50 produtos</p>
                  <p>Suporte Online (acesso remoto)+<br/>Public. Google Ads + Vídeo *</p>
                  {/* !-- INICIO FORMULARIO BOTAO PAGBANK: NAO EDITE OS COMANDOS DAS LINHAS ABAIXO -- */}
                  <form action="https://pagseguro.uol.com.br/pre-approvals/request.html" method="post">
                  <input type="hidden" name="code" value="57C4BA0E3B3B6F200483DFA9A8A37810" />
                  <input type="hidden" name="iot" value="button" />
                  <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/assinaturas/209x48-assinar-azul-assina.gif" name="submit" alt="Pague com PagBank - É rápido, grátis e seguro!" width="209" height="48" />
                  </form>
                  {/* !-- FINAL FORMULARIO BOTAO PAGBANK -- */}
                  {/* <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a> */}
                </div>
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

        {/* -- md_assinatura -- */}
        <div className="modal fade" id="md_assinatura" aria-hidden="true" aria-labelledby="titulo_modal" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="titulo_modal">ASSINATURA (PRÉ-CADASTRO PARA NOVOS DELIVERIES)</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="row">

                    <div className="mb-2">
                      <label htmlFor="nome" className="form-label">Nome do Delivery</label>
                      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="delivery" />
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <label htmlFor="plano" className="form-label">Plano</label>
                        <select onChange={e => setPlanoAssinatura(e.target.value)} className="form-select" id="plano"> 
                          {/* <option value="101">PLANO FREE até 03 produtos - Degustação (para testar)</option> */}
                          <option value="102">PLANO BASIC   (até 10 Produtos)</option>
                          <option value="103">PLANO PRO     (até 30 Produtos)</option>
                          <option value="103">PLANO PREMIUM (até 50 Produtos)</option>
                        </select>
                        <input onChange={e => setSituacao(e.target.value)} type="hidden" id="status" name="status" value="ATIVO"/>
                        <input onChange={e => setUrlImagem(e.target.value)} type="hidden" id="urlimagem" name="urlimagem" value=""/>
                      </div>
                      <div className="col-4">
                        <label htmlFor="categoria" className="form-label">Categoria</label>
                        <select onChange={e => setCategoria(e.target.value)} className="form-select" id="categoria"> 
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
                          <option value="112">MERCADO</option>
                        </select>
                      </div>
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

                    <input onChange={e => setMinDeliverTime(e.target.value)} type="hidden" id="mindeliverytime" name="mindeliverytime" value="15"/>
                    <input onChange={e => setMaxDeliverTime(e.target.value)} type="hidden" id="maxdeliverytime" name="maxdeliverytime" value="45"/>
                    <input onChange={e => setRating(e.target.value)} type="hidden" id="rating" name="rating" value="4.9"/>
                    <input onChange={e => setTaxaEntrega(e.target.value)} type="hidden" id="taxaentrega" name="taxaentrega" value="5" />

                    <div className="mb-2">
                      <label htmlFor="endereco" className="form-label">Endereço</label>

                      <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
                      <input onChange={e => setLatitude(e.target.value)} type="hidden" id="latitude" name="latitude" value="-19.999999"/>
                      <input onChange={e => setLongitude(e.target.value)} type="hidden" id="longitude" name="longitude" value="-43.999999"/>
                    </div>

                    <div className="mb-2">
                      <p>(*) Um dos nossos representantes entrará em contato para confirmar, orientar e configurar a sua assinatura. Outros dados importantes poderão serem preenchidos em "Dados do Delivery" após o login.</p>
                    </div>

                    <input onChange={e => setTokenADM(e.target.value)} type="hidden" id="token" name="token" value=""/>

                    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
                    {success === 'S' ? redirect("/app/login/novo") : null}

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
