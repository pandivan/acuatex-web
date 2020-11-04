import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function FooterPagos(props) 
{
  const [cantidadArticulos, setCantidadArticulos] = useState(0);
  const [totalPedido, setTotalPedido] = React.useState(0);



  useEffect(() => 
	{
    let totalPedido = 0;
    let cantidadArticulosPedido = 0;

    let mapArticulosPedido = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

    mapArticulosPedido.forEach((articulo, codigo) => 
    {
      totalPedido += articulo.precio * articulo.cantidad;
      cantidadArticulosPedido += articulo.cantidad;
    });

    setCantidadArticulos(cantidadArticulosPedido);
    setTotalPedido(totalPedido);
  }, [])


  return (
    <div className="d-flex align-items-end justify-content-between bgg-warning border border-right-0 border-left-0 border-bottom-0 pt-5">
      <Link to={props.paginaAnterior} className="nav-link p-0">
        <button type="button" className="btn btn-dark btn_pagos_acuatex" >
          VOLVER
        </button>
      </Link>

      <div className="bgg-warning" style={{ width: "40%" }}>
        <div className="row">
          <div className="col text-right bgg-info">{cantidadArticulos} artículos</div>
          <div className="col bgg-success">{totalPedido.toFixed(2)} USD</div>
        </div>
        <div className="row">
          <div className="col text-right bgg-info">Envío</div>
          <div className="col bgg-warning">0 USD</div>
        </div>
        <div className="row">
          <div className="col text-right bgg-info font-weight-bolder">
            <h5>TOTAL</h5>
          </div>
          <div className="col bgg-warning font-weight-bold">
            <h5>{totalPedido.toFixed(2)} USD</h5>
          </div>
        </div>
      </div>

      <Link to={props.paginaSiguiente} className="nav-link p-0">
        <button type="button" className="btn btn-dark btn_pagos_acuatex" >
          CONTINUAR
        </button>
      </Link>
    </div>
  );
}

export default FooterPagos;
