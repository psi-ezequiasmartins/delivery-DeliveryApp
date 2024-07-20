import React, { useState, useEffect } from 'react';
import './banner.css'

function Banner() {
  const texts = [
    "Gestão de Pedidos Simplificada para Deliveries em Geral de forma ágil e descomplicada + Cardápio Digital integrado ao WhatsApp",
    "Solução Completa para Seu Delivery! Agilize a gestão de pedidos do seu bar, restaurante ou fastfood de forma automática e simples",
    "Cardápio Digital e Gestão de Pedidos sem complicações, ideal para todos os tipos de delivery: Bares, Restaurantes, Pizzarias, Hamburguerias, Sushi, etc. ",
    "Sistema prático para Bares, Restaurantes, Pizzarias, Sushis, Deliveries em geral. Gestão de Pedidos e Cardápio Digital, tudo em único lugar",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prevIndex => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 1500); // Duração do efeito fade
    }, 8000); // 8 segundos para leitura
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section id="banner">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <img src="images/banner.jpg" className="img-fluid" alt="deliverybairro.com"/>
          </div>
          <div className="col-lg-6">
            <div className="bloco">
              <h1>Simples de configurar <br/>e fácil de usar!</h1>
              <div className={`${fade ? 'fade-in' : 'fade-out'}`}>
                <h4>{texts[index].split('.')[0]}. {texts[index].split('.')[1]}</h4> 
              </div>
              <h5>Cadastre hoje mesmo o seu Delivery e faça parte do nosso Catálogo a partir do plano Free.</h5>
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
