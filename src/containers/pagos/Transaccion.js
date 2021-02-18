import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import autenticacionServices from "../../services/AutenticacionServices";
import Constantes from "../../Constantes";



function Transaccion(props) 
{  
  let location = useLocation();
  const [isTokenValido, setTokenValido] = useState(autenticacionServices.getToken() ? true : false);

  let msjEstado = "";
  let msjDetalle = "";
  let nroPedido = "";

  console.log("Transaccion");

  if(location.state)
  {
    msjEstado = location.state.resultadoTransaccion.estadoTransaccion;
    msjDetalle = location.state.resultadoTransaccion.mensaje;
    nroPedido = location.state.resultadoTransaccion.nroPedido;
  }


  useEffect(() => 
	{
		console.log("useEffect Metodos de Pago");

    /**
     * Metodo que permite cargar información inicial desde el API-REST
     */
    const cargarInformacion = async () =>
    {
      //Se obtiene el correo del cliente a traves del api-rest
      let {status} = await autenticacionServices.validarToken();
  
      switch (status)
      {
        case Constantes.STATUS_OK:
          let cantidadBadge = JSON.parse(localStorage.getItem("@cantidadBadge"));

          if(null === cantidadBadge)
          {
            setTokenValido(false);
          }
          break;

        case Constantes.STATUS_ACCESO_DENEGADO:
          
          //Si tiene token es porque estoy logueado y debo informar que la sesión expiro
          if(autenticacionServices.getToken())
          {
            alert("Tu sesión ha expirado!!!");
          }
validar xq se estalla al setear el token ... estoy colocando seguriada a la web Transaccion
          autenticacionServices.logout();
          setTokenValido(false);
          break;
  
        default:
          //Valida si hubo un error en el api-rest al validar los datos del cliente
          //Si tiene token es porque estoy logueado y debo informar que hubo un error en el backend
          if(autenticacionServices.getToken())
          {
            // setMensajePopup("En el momento no es posible acceder al\nmétodo de pago, favor intentarlo más tarde.");
            // setMostrarPopup(true);
          }
          break;
      };
    }
    
    cargarInformacion();
  }, []);
  

  return (
    isTokenValido ?
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