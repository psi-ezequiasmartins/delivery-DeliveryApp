import React, { useState } from 'react';
import api from '../config/config.mysql';

import './pedido.css';

export default function Pedido(props){
  const [status, setStatus] = useState(props.Status);
  const [visible, setVisible] = useState(true);
  console.log(props.TokenSMS);

  async function AlterarStatus(codigo) {
    setStatus(codigo);
    await api.put(`/update/status/pedido/${props.PedidoID}`, {status: codigo}).then((response) => {
      console.log(response);
      sendPushNotification(props.TokenSMS, props.PedidoID, status);
      if (status === "FINALIZADO") {
        setVisible(false)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Send Push Notification

  async function sendPushNotification(expoPushToken, pedido_id, codigo_status) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "DeliveryBairro.com",
      body: "Pedido #"+pedido_id+" atualizado em "+new Date().toLocaleString()+" Status: "+codigo_status,
      data: {
        "PedidoID": pedido_id, 
        "Status": codigo_status
      }
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "no-cors",
      headers: {
        "Accept": "*",
        "Accept-encoding": "gzip, deflate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });
  }

  return !visible ? <></> : 
  <div className='d-flex justify-content-between shadow-sm pedido'>
    <div>
      <span><b>Pedido #{props.PedidoID}</b></span>
      <span className='badge rouded-pill bg-dark ms-2'>{props.Data}</span>

      {status === "NOVO" ? <span className="badge rouded-pill bg-danger ms-2">NOVO</span> : null}
      {status === "AGUARDANDO" ? <span className="badge rouded-pill bg-warning ms-2">AGUARDANDO</span> : null}
      {status === "PREPARANDO" ? <span className="badge rouded-pill bg-primary ms-2">PREPARANDO</span> : null}
      {status === "PRONTO_PARA_RETIRADA" ? <span className="badge rouded-pill bg-success ms-2">PRONTO PARA RETIRADA</span> : null}
      {status === "SAIU_PARA_ENTREGA" ? <span className="badge rouded-pill bg-warning ms-2">SAIU PARA ENTREGA</span> : null}
      {status === "RECEBIDO" ? <span className="badge rouded-pill bg-dark ms-2">RECEBIDO</span> : null}
      {status === "FINALIZADO" ? <span className="badge rouded-pill bg-info ms-2">FINALIZADO</span> : null}
      {status === "CANCELADO" ? <span className="badge rouded-pill bg-secondary ms-2">CANCELADO</span> : null}

      <small className='d-block mt-1 text-secondary'>{props.Cliente} - {props.Endereco}</small>
      <small className='d-block mt-1 text-secondary'>{props.token}</small>
      {
        props.itens.map((item) => {
          return <div className='d-inline-block text-center me-4 mt-2' key={item.ItemID} >
            <img src={item.UrlImagem} className='foto-item' alt='' />
            <small className='d-block text-secondary'>{item.Qtd} x</small>
            <small className='d-block text-secondary'>{item.Produto}</small>
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
          <li><a href="#novo" onClick={(e)=>AlterarStatus("NOVO")} className="dropdown-item">Novo</a></li>
          <li><a href="#aguardando" onClick={(e)=>AlterarStatus("AGUARDANDO")} className="dropdown-item">Aguardando</a></li>
          <li><a href="#preparando" onClick={(e)=>AlterarStatus("PREPARANDO")} className="dropdown-item">Preparando</a></li>
          <li><a href="#retirada" onClick={(e)=>AlterarStatus("PRONTO_PARA_RETIRADA")} className="dropdown-item">Pronto para retirada</a></li>
          <li><a href="#entrega" onClick={(e)=>AlterarStatus("SAIU_PARA_ENTREGA")} className="dropdown-item">Saiu para Entrega</a></li>
          <li><a href="#recebido" onClick={(e)=>AlterarStatus("RECEBIDO")} className="dropdown-item">Recebido</a></li>
          <li><a href="#finalizado" onClick={(e)=>AlterarStatus("FINALIZADO")} className="dropdown-item">Finalizado</a></li>
          <li><a href="#cancelado" onClick={(e)=>AlterarStatus("CANCELADO")} className="dropdown-item">Cancelado</a></li>
        </ul>
      </div>
    </div>
    
  </div>
}

/*
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
*/

/*
  async function SendNotification(expoPushToken, pedido_id, codigo_status) {
    const message = {
      "AuthenticationKey": expoPushToken,
      "payload": {
        "to": "Pedidos",
        // "collapse_key" : "type_a",
        "notification": {
          "title": "DeliveryBairro.com",
          "body": "Pedido #"+pedido_id+" atualizado em "+new Date().toLocaleString(),
          "data": {"PedidoID": pedido_id, "Status": codigo_status},
          "sound": "default",
          "priority": "high",
          "color": "#1A73E8",
          // "tag": "app"
        }
      }
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "no-cors",
      headers: {
        'Accept': '*',
        "Accept-encoding": "gzip, deflate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });
  }

*/
