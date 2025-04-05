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
      await api.get(`/api/pedidos/abertos/delivery/${vID}`) 
      .then((response) => {
        setPedidos(response.data); // console.log(pedidos);
        console.count = 0;
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(() => {
    ListarPedidos(); // eslint-disable-next-line 
  }, [pedidos, vID]) 

  async function loadDeliveryAddress() {
    if (vID) {
      await api.get(`/api/delivery/${vID} `)
        .then((response) => {
          let address = "";
          address += response.data.ENDERECO+", ";
          address += response.data.NUMERO+" "+response.data.COMPLEMENTO+", ";
          address += response.data.BAIRRO+" "+response.data.CIDADE+"-"+response.data.UF+" ";
          address += response.data.CEP;
          localStorage.setItem("vDeliveryAddress", address);
          console.count = 0;
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  loadDeliveryAddress();

  return  <>
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="pedidos" />
        </div>

        <div className="col py-3 me-3">
            <h1>FILA DE PEDIDOS - {vID} {vDelivery}</h1>
            <button onClick={ListarPedidos} className="btn m-2 btn-dark">ATUALIZAR</button>
            <div className="m-2 mt-2">
              {
                pedidos?.map((pedido) => {
                  return  <Pedido 
                            key={pedido.PEDIDO_ID}
                            PEDIDO_ID={pedido.PEDIDO_ID} 
                            DATA={pedido.DATA}
                            DELIVERY_ID={vDelivery}
                            STATUS={pedido.STATUS}
                            USER_ID={pedido.USER_ID}
                            CLIENTE={pedido.CLIENTE.toUpperCase()}
                            ENDERECO_ENTREGA={pedido.ENDERECO_ENTREGA.toUpperCase()}
                            TOKEN_MSG={pedido.TOKEN_MSG}
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
