import React from 'react';

function Banner() {
    return (
      <section id="banner">
        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <img src="images/screenshot.jpg" width="500px" alt="deliverybairro.com"/>
            </div>
            <div className="col-lg-6">
              <div className="bloco">
                <h1>Simples e fácil de usar!</h1>
                <p></p>
                <h4>Gestão de Pedidos e Cardápio Digital para Bares, Restaurantes, Pizzarias, Sushis, Fast-foods, Deliveries em Geral. Tudo isso em um único lugar!</h4> 
                <p></p>
                <h5>Cadastre hoje mesmo o seu Delivery e receba uma demonstração completa e gratuita sem compromisso.</h5>
                <a href="#planos-e-precos" type="button" className="btn btn-primary btn-lg btn-app">Cadastre-se</a>
                <a href="/app/login" type="button" className="btn btn-outline-light btn-lg btn-app">Fazer Login</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Banner;
