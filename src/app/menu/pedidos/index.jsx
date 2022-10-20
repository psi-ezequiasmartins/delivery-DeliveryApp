import { useState, useEffect } from "react";
import MenuApp from '../menuapp.jsx';
import Pedido from "./pedido";

import api from '../../config/mysql';

import './index.css';

export default function Pedidos() {
  let vEmpresa = localStorage.getItem("empresa");
  let vToken = localStorage.getItem("token");

  const [pedidos, setPedidos] = useState([]);
  
  useEffect(() => {
    ListarPedidos();
  }, [vEmpresa])

  function ListarPedidos() {
    api.get(`/pedidos/itens/${vToken}`) 
    .then((response) => {
      // console.log(response.data);
      setPedidos(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return  <>
    <MenuApp/>
    <div className="container-fluid titulo">
      <h1>Gestão de Pedidos - ID {vToken} {vEmpresa}</h1>

      <button className="btn m-2 btn-primary" onClick={ListarPedidos}>Atualizar Lista</button>
      <div className="m-2 mt-2">
        {
          pedidos.map((pedido) => {
            return <Pedido 
                      key={pedido.id_pedido}
                      id_pedido={pedido.id_pedido} 
                      dt_pedido={pedido.dt_pedido}
                      token={pedido.token}
                      status={pedido.status}
                      nome={pedido.nome}
                      endereco={pedido.endereco}
                      itens={pedido.itens}
                    />
          })
        }
      </div>
    </div>
  </>  
}
