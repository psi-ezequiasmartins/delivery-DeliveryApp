import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './planos.css';

import api from '../../app/config/mysql';

function Planos() {
    // const [id_conta, setIdConta] = useState(null);

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

    const [success, setSuccess] = useState('N');
    const [msg, setMsg] = useState('');
 
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
            "endereco": endereco, 
            "complemento": complemento, 
            "bairro": bairro, 
            "cidade": cidade, 
            "uf": UF, 
            "cep": CEP,
            "logomarca": logomarca,
            "marcador": marcador, 
            "horario": horario, 
            "cnpj": cnpj, 
            "cpf": cpf
          }
          api.post('/delivery/add/', json).then(response => {
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
            localStorage.setItem("empresa", response.data.delivery);
            localStorage.setItem("token", response.data.id_conta);
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
                  <p>somente até 03 produtos</p>
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
                  <p>Até 30 produtos</p>
                  <p>Suporte Offline (por e-mail)+<br/>Tutoriais Online</p>
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
                  <h2>R$ 135,00</h2>  
                  <p>Acima de 30 produtos</p>
                  <p>Suporte Online (acesso remoto)+<br/>Google Ads*</p>
                  <a className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" href="#md_assinatura" role="button">Assine Agora</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row text-center">
            <div className="titulo">
              <h3>(*) Google Ads</h3>
              <p>Promova o seu delivery em sua região através do nosso Markting Digital c/ Google Ads.<br/>Outros planos e mais informações, por favor entre em contato conosco.</p>
            </div>
          </div>

        </div>

        {/* -- md_assinatura -- */}
        <div className="modal fade" id="md_assinatura" aria-hidden="true" aria-labelledby="titulo_modal" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog">
          {/* <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"> */}
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="titulo_modal">ASSINATURA (NOVO DELIVERY)</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="row">

                    <div className="mb-2">
                      <label htmlFor="delivery" className="form-label">Nome do Delivery</label>
                      <input onChange={e => setDelivery(e.target.value)} type="text" className="form-control" id="delivery" />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="plano" className="form-label">Plano</label>
                      <select onChange={e => setPlano(e.target.value)} className="form-select" id="plano" value=""> 
                        <option value="101">PLANO FREE somente até 03 Produtos (Demonstração) R$ 0,00</option>
                        <option value="102">PLANO BASIC até 30 Produtos (Suporte Offline) R$ 49,90/mês</option>
                        <option value="103">PLANO PRO até 50 Produtos (Suporte Online + Google Ads) R$ 99,90/mês</option>
                      </select>
                      <input onChange={e => setStatus(e.target.value)} type="hidden" id="status" name="status" value="A"/>
                      <input onChange={e => setLogomarca(e.target.value)} type="hidden" id="logomarca" name="logomarca" value=""/>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="categoria" className="form-label">Categoria</label>
                      <select onChange={e => setIdCategoria(e.target.value)} className="form-select" id="categoria" value=""> 
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

                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="cnpj" className="form-label">CNPJ</label>
                        <input onChange={e => setCnpj(e.target.value)} type="text" className="form-control" id="cnpj" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input onChange={e => setCpf(e.target.value)} type="text" className="form-control" id="cpf" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
                      </div>

                      <div className="col-4">
                        <label htmlFor="complemento" className="form-label">Complemento</label>
                        <input onChange={e => setComplemento(e.target.value)} type="text" className="form-control" id="complemento" />
                      </div>
                    </div>

                    <div className="mb-2 col-8">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <input onChange={e => setBairro(e.target.value)} type="text" className="form-control" id="bairro" />
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="cidade" className="form-label">Cidade</label>
                        <input onChange={e => setCidade(e.target.value)} type="text" className="form-control" id="cidade" />
                      </div>
                      <div className="col-4">
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
                      <div className="col-2">
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
                    {success === 'S' ? <Redirect to='/app/login/novo' /> : null}

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
