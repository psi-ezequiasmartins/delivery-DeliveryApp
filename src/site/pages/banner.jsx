import React from 'react';

function Banner() {
    return (
      <section id="banner">
        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <img src="images/screenshot.jpg" width="800px" alt="deliverybairro.com"/>
            </div>
            <div className="col-lg-6">
              <div className="bloco">
                <h1>Simples e fácil de usar!</h1>
                <h4>Gestão de Pedidos e Cardápio de Produtos para Bares, Restaurantes, Fast-foods e Delivery's em Geral. Tudo isso em um único lugar! Além da divulgação do seu Cardápio em nosso aplicativo para Mobile (Android/iOs).</h4>
                <a href="/app/login/novo" type="button" className="btn btn-primary btn-lg btn-app">Criar uma conta</a>
                <a href="/app/login" type="button" className="btn btn-outline-light btn-lg btn-app">Fazer Login</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Banner;
