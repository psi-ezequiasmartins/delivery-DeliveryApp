import React from 'react';

function Mobile() {
    return (
      <section id="mobile">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <div className="bloco">
                <h1>Baixe grátis o nosso <br/>App Mobile (Android/iOs*)</h1>
                <h4>Acesse o nosso catálogo de estabelecimentos com entregas a domicílio próximo a você!</h4>
                <a 
                  href="https://drive.google.com/file/d/1unq8uZQD2B53R36XFHgxm65tHMRypLeP/view?usp=drive_link" 
                  type="button" 
                  className="btn btn-dark btn-lg btn-app"
                >DOWNLOAD<br/>UserApp v3.0 <i className="fa fa-android"></i><br/>Build 7644633 · 22032025-211654</a>
              </div>
              <p className="text-white">(*) em breve disponível também para dispositivos iOs (iPhone, iPads, etc)</p>
            </div>
            <div className="col-lg-6">
              <img src="images/mobile.jpg" width="700px" alt="deliverybairro.com"/>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Mobile;
