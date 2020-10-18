import React from "react";
import { Link } from "react-router-dom";



/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function FooterPagos(props) 
{
  
  return (
    <div className="d-flex align-items-end justify-content-between bgg-warning border border-right-0 border-left-0 border-bottom-0 pt-5">
      <Link to={props.paginaAnterior} className="nav-link p-0">
        <button type="button" className="btn btn-dark btn_pagos_acuatex" onClick={props.volver}>
          VOLVER
        </button>
      </Link>

      <div className="bgg-warning" style={{ width: "40%" }}>
        <div className="row">
          <div className="col text-right bgg-info">3 artículos</div>
          <div className="col bgg-success">1.028.800 COP</div>
        </div>
        <div className="row">
          <div className="col text-right bgg-info">Envío</div>
          <div className="col bgg-warning">9.900 COP</div>
        </div>
        <div className="row">
          <div className="col text-right bgg-info font-weight-bolder">
            <h5>TOTAL</h5>
          </div>
          <div className="col bgg-warning font-weight-bold">
            <h5>1.038.700 COP</h5>
          </div>
        </div>
      </div>

      <Link to={props.paginaSiguiente} className="nav-link p-0">
        <button type="button" className="btn btn-dark btn_pagos_acuatex" onClick={props.continuar}>
          CONTINUAR
        </button>
      </Link>
    </div>
  );
}

export default FooterPagos;
