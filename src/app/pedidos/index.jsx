import { useState, useEffect } from "react";
import Menu from "../../components/menu";
import Pedido from "./pedido";
import './index.css';

import api from '../config/config.mysql';

export default function Pedidos() {
  const vDelivery = "SANDUBA DO ZÉ"; // localStorage.getItem("delivery");
  const vToken = 1002; // localStorage.getItem("token");

  const [pedidos, setPedidos] = useState(null);

  useEffect(() => {
    ListarPedidos();
  }, [pedidos])

  async function ListarPedidos() {
    if (vToken) {
      await api.get(`/pedidos/abertos/delivery/${vToken}`) 
      .then((response) => {
        setPedidos(response.data);
        console.count = 0;
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  return  <>
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="pedidos" />
        </div>

        <div className="col py-3 me-3">
            <h1>FILA DE PEDIDOS - {vToken} {vDelivery}</h1>
            <button onClick={ListarPedidos} className="btn m-2 btn-primary">ATUALIZAR</button>
            <div className="m-2 mt-2">
              {
                pedidos?.map((pedido) => {
                  return <Pedido 
                            key={pedido.PedidoID}
                            PedidoID={pedido.PedidoID} 
                            Data={pedido.Data}
                            DeliveryID={pedido.token}
                            Status={pedido.Status}
                            Cliente={pedido.Nome}
                            Endereco={pedido.Endereco}
                            itens={pedido.itens}
                          />
                })
              }
            </div>
        </div>

      </div>
    </div>
  </>
}

// eslint-disable-next-line react-hooks/exhaustive-deps
