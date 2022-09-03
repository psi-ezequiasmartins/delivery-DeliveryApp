import React from 'react';

function Planos() {
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
                  <p>de 03 a 09 produtos</p>
                  <p>Degustação (demo)<br/>sem suporte.</p>
                  <button className="btn btn-lg btn-outline-primary">Assine Agora</button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Basic</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 49,90</h2>  
                  <p>Até 30 produtos</p>
                  <p>Suporte Offline (por e-mail)+<br/>Tutoriais Online</p>
                  <button className="btn btn-lg btn-outline-primary">Assinar Agora</button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h1>Pro</h1>
                </div>
                <div className="card-body">
                  <h2>R$ 99,90</h2>  
                  <p>Até 50 produtos</p>
                  <p>Suporte Online (acesso remoto)+<br/>Google Ads*</p>
                  <button className="btn btn-lg btn-outline-primary">Assinar Agora</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row text-center">
            <div className="titulo">
              <h3>(*) Google Ads</h3>
              <p>Promova o seu delivery em sua região através do nosso Plano de Markting c/ Google Ads.<br/>Outros planos e informações, por favor entre em contato conosco.</p>
            </div>
          </div>

        </div>
      </section>
    );
  }

export default Planos;
