import React, { useState, useEffect } from 'react';
import api from '../../../config/apiAxios';
import './pedido.css';

export default function Pedido(props) {
  const [status, setStatus] = useState(props.Status);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  async function AlterarStatus(codigo) {
    setStatus(codigo);
    await api.put(`/update/status/pedido/${props.PEDIDO_ID}`, { status: codigo })
      .then((response) => {
        console.log(response);
        sendPushNotification(props.TokenSMS, props.PEDIDO_ID, status);
        if (status === 'FINALIZADO') {
          setVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function sendPushNotification(expoPushToken, PEDIDO_ID, codigo_status) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'DeliveryBairro.com',
      body: 'Pedido #' + PEDIDO_ID + ' atualizado em ' + new Date().toLocaleString() + ' Status: ' + codigo_status,
      data: {
        PedidoID: PEDIDO_ID,
        Status: codigo_status,
      },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'no-cors',
      headers: {
        Accept: '*',
        'Accept-encoding': 'gzip, deflate',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  return !visible ? null : (
    <div className={`shadow-sm pedido ${isMobile ? 'flex-column' : 'flex-row justify-content-between'}`}>
      <div>
        <span><b>PEDIDO #{props.PedidoID}</b></span>
        <span className='badge bg-dark ms-2'>{props.Data}</span>

        {status === 'NOVO' && <span className='badge bg-danger ms-2'>NOVO</span>}
        {status === 'AGUARDANDO' && <span className='badge bg-warning ms-2'>AGUARDANDO</span>}
        {status === 'PREPARANDO' && <span className='badge bg-primary ms-2'>PREPARANDO</span>}
        {status === 'PRONTO_PARA_RETIRADA' && <span className='badge bg-success ms-2'>PRONTO PARA RETIRADA</span>}
        {status === 'SAIU_PARA_ENTREGA' && <span className='badge bg-warning ms-2'>SAIU PARA ENTREGA</span>}
        {status === 'RECEBIDO' && <span className='badge bg-dark ms-2'>RECEBIDO</span>}
        {status === 'FINALIZADO' && <span className='badge bg-secondary ms-2'>FINALIZADO</span>}
        {status === 'CANCELADO' && <span className='badge bg-secondary ms-2'>CANCELADO</span>}

        <small className='d-block mt-1 text-dark'>Endereço de Entrega: <b>{props.Endereco}</b></small>
        <small className='d-block mt-1 text-dark'>Cliente: <b>{props.Cliente}</b></small>
        {/* <small className='d-block mt-1 text-secondary'>{props.TokenMSG}</small> */}
        {props.itens.map((item) => (
          <div className='d-inline-block align-items-start' key={item.ITEM_ID}>
            <div className='text-left me-4 mt-2 card-pedido'>
              <img src={item.URL_IMAGEM} className='foto-item' alt='' />
              <small className='d-block text-dark'><b>({item.QTD}x) {item.PRODUTO_NOME}</b></small>
              {item.ACRESCIMOS && (
                <div className='text-dark acrescimos'>
                  <b>Acrescimos:</b>
                  <ul>
                    {item.ACRESCIMOS.map((acrescimo, index) => (
                      <li key={index}>
                        {acrescimo.Descricao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.OBS && (
                <div className='text-danger obs'>
                  <b>OBSSERVAÇÕES:</b><br />
                  {item.OBS}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='d-flex me-4' id='status'>
        <div className='dropdown'>
          <a className='btn btn-dark dropdown-toggle' href='#status' role='button' id='dropdownMenuLink' data-bs-toggle='dropdown' aria-expanded='false'>
            STATUS DO PEDIDO <i className='bi bi-pin-angle'></i>
          </a>
          <ul className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
            <li><a href='#novo' onClick={() => AlterarStatus('NOVO')} className='dropdown-item'>Novo</a></li>
            <li><a href='#aguardando' onClick={() => AlterarStatus('AGUARDANDO')} className='dropdown-item'>Aguardando</a></li>
            <li><a href='#preparando' onClick={() => AlterarStatus('PREPARANDO')} className='dropdown-item'>Preparando</a></li>
            <li><a href='#retirada' onClick={() => AlterarStatus('PRONTO_PARA_RETIRADA')} className='dropdown-item'>Pronto para retirada</a></li>
            <li><a href='#entrega' onClick={() => AlterarStatus('SAIU_PARA_ENTREGA')} className='dropdown-item'>Saiu para Entrega</a></li>
            <li><a href='#recebido' onClick={() => AlterarStatus('RECEBIDO')} className='dropdown-item'>Recebido</a></li>
            <li><a href='#finalizado' onClick={() => AlterarStatus('FINALIZADO')} className='dropdown-item'>Finalizado</a></li>
            <li><a href='#cancelado' onClick={() => AlterarStatus('CANCELADO')} className='dropdown-item'>Cancelado</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
