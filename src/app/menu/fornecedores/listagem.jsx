import React from 'react';
import { Link } from 'react-router-dom';
import './listagem.css';

function Listagem(props) {
  
  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr className="table-secondary">
          <th scope="col">ID</th>
          <th scope="col">Fornecedor</th>
          <th scope="col">Telefone</th>
          <th scope="col">E-mail</th>
          <th scope="col" className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {  
          props.array.map((fornecedor) => {
            return (
              <tr key={fornecedor.id_fornecedor}>
                <th scope="row">{fornecedor.id_fornecedor}</th>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <Link to={'/app/menu/fornecedores/editar/' + fornecedor.id_fornecedor}><i className="fas fa-user-edit icon-action"></i></Link>
                  <Link to="#" onClick={() => props.clickDelete(fornecedor.id_fornecedor)} title="EXCLUIR FORNECEDOR"><i className="fas fa-trash-alt icon-action red"></i></Link>
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

