import React, { useState } from 'react';
import api from '../../config/mysql';
import './pedido.css';

export default function Pedido(props){

  const [status, setStatus] = useState(props.status);
  const [visible, setVisible] = useState(true);
  
  function AlterarStatus(status) {
    api.put(`/pedidos/status/${props.id_pedido}`, {
      status: status
    })
    .then((response) => {
      setStatus(status);
      if (status === 'F') {
        setVisible(false)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return !visible ? <></> : 
  <div className='d-flex justify-content-between shadow-sm pedido'>
    <div>
      <span><b>Pedido #{props.id_pedido}</b></span>
      <span className='badge rouded-pill bg-dark ms-2'>{props.dt_pedido}</span>

      {status === "A" ? <span className="badge rouded-pill bg-danger ms-2">AGUARDANDO</span> : null}
      {status === "P" ? <span className="badge rouded-pill bg-success ms-2">EM PRODUÇÃO</span> : null}
      {status === "E" ? <span className="badge rouded-pill bg-primary ms-2">SAIU P/ ENTREGA</span> : null}
      {status === "F" ? <span className="badge rouded-pill bg-dark ms-2">FINALIZADO</span> : null}
      {status === "C" ? <span className="badge rouded-pill bg-secondary ms-2">CANCELADO</span> : null}
      
      {/* <span className='badge rouded-pill bg-success ms-2'>{status}</span> */}

      <small className='d-block mt-1 text-secondary'>{props.nome} - {props.endereco}</small>
      {
        props.itens.map((item) => {
          return <div className='d-inline-block text-center me-4 mt-2' key={item.id_item} >
            <img src={item.url_imagem} className='foto-item' alt='' />
            <small className='d-block text-secondary'>{item.qtd} x</small>
            <small className='d-block text-secondary'>{item.nome}</small>
          </div>
        })
      }
    </div>

    <div className="d-flex me-4" id="status">
      <div className="dropdown">
        <a className="btn btn-dark dropdown-toggle" href="#status" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          Status do Pedido
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a href="#aguardando" onClick={(e)=>AlterarStatus("A")} className="dropdown-item">Aguardando</a></li>
          <li><a href="#producao" onClick={(e)=>AlterarStatus("P")} className="dropdown-item">Em Produção</a></li>
          <li><a href="#entrega" onClick={(e)=>AlterarStatus("E")} className="dropdown-item">Saiu para Entrega</a></li>
          <li><a href="#finalizado" onClick={(e)=>AlterarStatus("F")} className="dropdown-item">Finalizado</a></li>
          <li><a href="#cancelado" onClick={(e)=>AlterarStatus("C")} className="dropdown-item">Cancelado</a></li>
        </ul>
      </div>
    </div>
  </div>
}

