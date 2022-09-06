import React from 'react';
import { Link } from 'react-router-dom';
import './listagem.css';

function Listagem(props) {

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr className="table-secondary">
          <th scope="col">ID</th>
          <th scope="col">Produto</th>
          <th scope="col">Vr. Custo</th>
          <th scope="col">Vr. Unitário</th>
          <th scope="col" className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {
          props.arrayProdutos.map(produto => 
            <tr key={produto.id_produto}>
              <th scope="row">{produto.id_produto}</th>
              <td>{produto.nome}</td>
              <td>{produto.vr_custo}</td>
              <td>{produto.vr_unitario}</td>
              <td>
                <Link to={'/app/menu/produtos/editar/' + produto.id_produto}><i className="fas fa-user-edit icon-action"></i></Link>
                <Link to="#" onClick={() => props.clickDelete(produto.id)} title="EXCLUIR PRODUTO"><i className="fas fa-trash-alt icon-action red"></i></Link>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default Listagem;