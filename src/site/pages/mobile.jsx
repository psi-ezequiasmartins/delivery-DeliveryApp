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
                <a href="https://drive.google.com/file/d/1OtlXaZlBkAAdw6mag8biYPIh4MyPp1iv/view?usp=sharing" type="button" className="btn btn-success btn-lg btn-app"><i className="fa fa-android"></i> Android<br/>v1.0 Build #2 (versão de teste)</a>
                <a href="https://drive.google.com/file/d/1wDST9zkuhCm0rzNQRFYdc-r8p_kEFfJ0/view?usp=sharing" type="button" className="btn btn-primary btn-lg btn-app"><i className="fa fa-windows"></i> Windows<br/>v1.0 (versão de teste)</a>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="imagens/mobile.jpg" width="800px" alt="deliverybairro.com"/>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Mobile;
