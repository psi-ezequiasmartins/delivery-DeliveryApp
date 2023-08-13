import React from 'react';

function Depoimentos() {
    return (
      <section id="depoimentos">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">

          <center>
            <h1>Depoimentos</h1>
          </center>

          <div className="carousel-inner">
            <div className="carousel-item active" class="d-block w-100" data-bs-interval="5000">
              <img src="images/heliomarmarques.jpg" alt="Heliomar P. Marques"/><br/>
              <em>Heliomar P Marques - São Paulo</em>  
              <p>Excelente ferramenta para administrar seu Delivery no dia a dia.</p>
            </div>
            <div className="carousel-item" class="d-block w-100" data-bs-interval="5000">
              <img src="images/afonsomotta.jpg" alt="Afonso Motta"/><br/>
              <em>Afonso Motta - Rio de Janeiro</em>  
              <p>Design simples e elegante, interface intuitiva e agradável para todos os usuários.</p>
            </div>
            <div className="carousel-item" class="d-block w-100" data-bs-interval="5000">
              <img src="images/ezequiasmartins.jpg" alt="Ezequias Martins"/><br/>
              <em>Ezequias Martins - Belo Horizonte</em>  
              <p>O DeliveryBairro é uma ferramenta útil e intuitiva para gestão de Delivery's em geral.</p>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img src="images/sergiosales.jpg" alt="Sérgio Sales"/><br/>
              <em>Sérgio Sales - Belo Horizonte</em>  
              <p>O DeliveryBairro reduz os custos e a distância entre você e seus clientes.</p>
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>

        </div>

      </section>
    );
  }

export default Depoimentos;
