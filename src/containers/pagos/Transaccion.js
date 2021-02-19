import * as React from "react";
import { useLocation, Redirect } from "react-router-dom";

import Header from "../../components/Header";



function Transaccion(props) 
{  
  let location = useLocation();

  let msjEstado = "";
  let msjDetalle = "";
  let nroPedido = "";

  console.log("Transaccion")
  if(location.state)
  {
    msjEstado = location.state.resultadoTransaccion.estadoTransaccion;
    msjDetalle = location.state.resultadoTransaccion.mensaje;
    nroPedido = location.state.resultadoTransaccion.nroPedido;
  }
  

  return (
    location.state?
    <div>
      <Header height={"none"}/>
    
      <div className="container d-flex flex-column justify-content-center bgg-dark">
        <div className="d-flex justify-content-center py-5 mt-5 bgg-info">
          <i className="fa fa-check-circle fa-5x" style={{color:"limegreen"}}></i>
        </div>
        <div className="d-flex justify-content-center p-t bgg-secondary">
          <dt className="text-center bgg-success">
              <h1>{msjEstado}</h1>
          </dt>  
        </div>
        <div className="d-flex justify-content-center bgg-success">
          <h5 className="text-center text-black-50 bgg-danger">
            <p>{msjDetalle}</p>
          </h5>
        </div>
        <div className="d-flex justify-content-center bgg-success">
          <h4 className="text-center text-black-50 bgg-danger">
            <p>N° Pedido: {nroPedido}</p>
          </h4>
        </div>
        <br /><br /><br /><br /><br />
        <div className="d-flex justify-content-center bgg-success">
          <h5 className="text-center text-black-50 bgg-danger">
            <p>Recibirás tu pedido </p>
          </h5>
        </div>
        <div className="d-flex justify-content-center bgg-success">
          <h4 className="text-center bgg-danger">
            <p>Jueves 18, diciembre - Sábado 20, diciembre</p>
          </h4>
        </div>
      </div>
    </div>
    :
    <Redirect to={"/articulos"} />
  );
}

export default Transaccion;