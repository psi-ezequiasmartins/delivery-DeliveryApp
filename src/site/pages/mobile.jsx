import React from 'react';

function Mobile() {
    return (
      <section id="mobile">
        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <div className="bloco">
                <h1>Baixe aqui o nosso App DeliveryBairro</h1>
                <h4>e tenha acesso a vários serviços de conveniência com entrega a domicílio próximo a você!</h4>
                <a href="https://drive.google.com/file/d/13-5hTxgEeIiim8Oqf0INTIAFQMF9xvPV/view?usp=sharing" type="button" className="btn btn-success btn-lg btn-app"><i className="fa fa-android"></i> DeliveryBairro.com<br/>UserApp v1.0 Build #1</a>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="images/mobile.jpg" width="800px" alt="deliverybairro.com"/>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Mobile;
