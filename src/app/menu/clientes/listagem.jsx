import React from 'react';
import { Link } from 'react-router-dom';
import './listagem.css';

function Listagem(props) {
  
  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr className="table-secondary">
          <th scope="col">ID</th>
          <th scope="col">Cliente</th>
          <th scope="col">Telefone</th>
          <th scope="col">E-mail</th>
          <th scope="col">Bairro</th>
          <th scope="col" className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {  
          props.array.map((cliente) => {
            return (
              <tr key={cliente.id_cliente}>
                <th scope="row">{cliente.id_cliente}</th>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.bairro}</td>
                <td>
                  <Link to={'/app/menu/clientes/editar/' + cliente.id_cliente}><i className="fas fa-user-edit icon-action"></i></Link>
                  <Link to="#" onClick={() => props.clickDelete(cliente.id_cliente)} title="EXCLUIR CLIENTE"><i className="fas fa-trash-alt icon-action red"></i></Link>
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

