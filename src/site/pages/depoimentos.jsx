import React from 'react';

function Depoimentos() {
    return (
      <section id="depoimentos">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <center>
              <h1>Depoimentos</h1>
          </center>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <img src="imagens/heliomarmarques.jpg" alt="Heliomar P. Marques"/><br/>
              <em>Heliomar P Marques - São Paulo</em>  
              <p>Excelente ferramenta para administrar seu Delivery no dia a dia.</p>
            </div>      
            <div className="carousel-item" data-bs-interval="5000">
              <img src="imagens/afonsomotta.jpg" alt="Afonso Motta"/><br/>
              <em>Afonso Motta - Rio de Janeiro</em>  
              <p>Design simples e elegante, interface intuitiva e agradável para todos os usuários.</p>
            </div>     
            <div className="carousel-item" data-bs-interval="5000">
              <img src="imagens/ezequiasmartins.jpg" alt="Ezequias Martins"/><br/>
              <em>Ezequias Martins - Belo Horizonte</em>  
              <p>O DeliveryBairro é uma ferramenta útil e intuitiva para gestão de Delivery's em geral.</p>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img src="imagens/sergiosales.jpg" alt="Sérgio Sales"/><br/>
              <em>Sérgio Sales - Belo Horizonte</em>  
              <p>O DeliveryBairro reduz os custos e a distância entre você e seus clientes.</p>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>

      </section>
    );
  }

export default Depoimentos;
