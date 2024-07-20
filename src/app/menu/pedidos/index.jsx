import { useState, useEffect } from "react";
import Menu from "../../../components/menu";
import Pedido from "./pedido";
import './index.css';

import api from "../../../config/apiAxios";

export default function Pedidos() {
  const vDelivery = localStorage.getItem("vDelivery"); 
  const vID = localStorage.getItem("vID");

  const [pedidos, setPedidos] = useState(null);

  async function ListarPedidos() {
    if (vID) {
      await api.get(`/pedidos/abertos/delivery/${vID}`) 
      .then((response) => {
        setPedidos(response.data);
        // console.log(pedidos);
        console.count = 0;
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(() => {
    ListarPedidos(); // eslint-disable-next-line 
  }, [pedidos, vID]) 
  // verificar monitoramento da constante "pedidos"

  return  <>
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="pedidos" />
        </div>

        <div className="col py-3 me-3">
            <h1>FILA DE PEDIDOS - {vID} {vDelivery}</h1>
            <button onClick={ListarPedidos} className="btn m-2 btn-primary">ATUALIZAR</button>
            <div className="m-2 mt-2">
              {
                pedidos?.map((pedido) => {
                  return  <Pedido 
                            key={pedido.PEDIDO_ID}
                            PedidoID={pedido.PEDIDO_ID} 
                            Data={pedido.DATA}
                            DeliveryID={vDelivery}
                            Status={pedido.STATUS}
                            UserID={pedido.USER_ID}
                            Cliente={pedido.NOME}
                            Endereco={pedido.ENDERECO_ENTREGA}
                            TokenMSG={pedido.TOKEN_MSG}
                            itens={pedido.ITENS}
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
