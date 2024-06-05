import React from 'react';

function Mobile() {
    return (
      <section id="mobile">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <div className="bloco">
                <h1>Baixe grátis aqui o nosso <br/>aplicativo Mobile (Android/iOs*)</h1>
                <h4>Acesse o nosso catálogo de estabelecimentos com entregas a domicílio próximo a você!</h4>
                <a href="https://drive.google.com/file/d/1jQ--oS23rIcbtoVKiyXdJ5dALYW_-Ksj/view?usp=sharing" type="button" className="btn btn-dark btn-lg btn-app">Download | DeliveryBairro UserApp v1.0 <i className="fa fa-android"></i><br/>
                BUILD 26042024-1647</a>
              </div>
              <p className="text-white">(*) em breve disponível também para dispositivos iOs (iPhone, iPads, etc)</p>
            </div>
            <div className="col-lg-6">
              <img src="images/screens.jpg" width="700px" alt="deliverybairro.com"/>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Mobile;
