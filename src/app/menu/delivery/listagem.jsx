import React from 'react';
import { Link } from 'react-router-dom';
import './listagem.css';

function Listagem(props) {
  
  function categoria(option) {
    if (option === 1 ) { return "OFERTAS" } else    
    if (option === 2 ) { return "SANDUICHES" } else
    if (option === 3 ) { return "HOTDOGS" } else
    if (option === 4 ) { return "BEBIDAS" } else
    if (option === 5 ) { return "PRATOS & PORÇÕES" } else
    if (option === 6 ) { return "SUPERMERCADO" } else
    if (option === 7 ) { return "FRUTAS & VERDURAS" } else
    if (option === 8 ) { return "MEDICAMENTOS" } else
    if (option === 9 ) { return "GÁS DE COZINHA" } else
    if (option === 10) { return "FLORICULTURA" } else
    if (option === 11) { return "ÁGUA MINERAL" } else
    if (option === 12) { return "PEÇAS E SERVIÇOS" } else
    if (option === 13) { return "DISTRIBUIDORAS" }
  }

  return (    
    <table className="table table-hover table-bordered">
      <thead>
        <tr className="table-secondary">
          <th scope="col">ID</th>
          <th scope="col">Delivery</th>
          <th scope="col">Categoria</th>
          <th scope="col">Telefone</th>
          <th scope="col">E-mail</th>
          <th scope="col" className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {  
          props.array.map((delivery) => {
            return (
              <tr key={delivery.id_delivery}>
                <th scope="row">{delivery.id_delivery}</th>
                <td>{delivery.nome}</td>
                <td>{categoria(delivery.id_categoria)}</td>
                <td>{delivery.telefone}</td>
                <td>{delivery.email}</td>
                <td>
                  <Link to={'/app/menu/delivery/editar/' + delivery.id_delivery}><i className="fas fa-user-edit icon-action"></i></Link>
                  <Link to="#" onClick={() => props.clickDelete(delivery.id_delivery)} title="EXCLUIR DELIVERY"><i className="fas fa-trash-alt icon-action red"></i></Link>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default Listagem;

