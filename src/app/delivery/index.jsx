import Menu from "../../components/menu";
import './index.css';

function Delivery() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <Menu page="delivery" />
        </div>

        <div className="col py-3 me-3">
          <div className="d-flex justify-content-between">
            <h1>DADOS DO DELIVERY</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery;