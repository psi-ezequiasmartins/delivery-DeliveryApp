import React from 'react';

function Banner() {
    return (
      <section id="banner">
        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <img src="imagens/screenshot.jpg" width="800px" alt="deliverybairro.com"/>
            </div>
            <div className="col-lg-6">
              <div className="bloco">
                <h1>Simples e fácil de usar!</h1>
                <h4>Administre a Gestão dos Pedidos, Cadastro de Produtos (Cardápio), Clientes, etc. Tudo em um único lugar, além de divulgar o seu Delivery em nosso Aplicativo Mobile (Android/iOs).</h4>
                <a href="/app/login/novo" type="button" className="btn btn-primary btn-lg btn-app">Criar uma conta</a>
                <a href="/app" type="button" className="btn btn-outline-light btn-lg btn-app">Fazer Login</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Banner;
