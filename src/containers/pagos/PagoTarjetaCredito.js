import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import FooterPagos from "../../components/FooterPagos";
import PopupMensaje from "../../components/PopupMensaje";
import pagoServices from "../../services/PagoServices"; 
import autenticacionServices from "../../services/AutenticacionServices";
import clienteServices from "../../services/ClienteServices";
import Constantes from "../../Constantes";




/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function PagoTarjetaCredito() 
{
  const [isTokenValido, setTokenValido] = useState(autenticacionServices.getToken() ? true : false);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesCaducidad, setMesCaducidad] = useState("01");
  const [añoCaducidad, setAñoCaducidad] = useState("2020");
  const [titularTarjeta, setTitularTarjeta] = useState("");
  const [numeroCVV, setNumeroCVV] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");


  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 



  useEffect(() => 
	{
		console.log("useEffect Pago Tarjeta Credito");

    /**
     * Metodo que permite cargar información inicial desde el API-REST
     */
    const cargarInformacion = async () =>
    {
      //Se valida a traves del api-rest si el token es válido
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
            setMensajePopup("Tu sesión ha expirado!!!");
            setMostrarPopup(true);
          }

          autenticacionServices.removerToken();
          break;
  
        default:
          //Valida si hubo un error en el api-rest
          //Si tiene token es porque estoy logueado y debo informar que hubo un error en el backend
          if(autenticacionServices.getToken())
          {
            setMensajePopup("En el momento no es posible realizar la\ntransacción, favor intentarlo en unos minutos.");
            setMostrarPopup(true);
          }
          break;
      };
    }
    
    cargarInformacion();
  }, []);


 


  /**
   * Función que permite validar si el caracter digitado es numérico
   * @param e evento generado por teclear en un input
   */
  const validarNumero = (e) => 
  {
    let numero = e.target.value;

    if (!Number(numero)) 
    {
        return;
    }
   
    if("numeroTarjeta" === e.target.id)
    {
      setNumeroTarjeta(numero);
    }

    if("numeroCVV" === e.target.id)
    {
      setNumeroCVV(numero);
    }
  }




  /**
   * Función que permite validar los datos obligatorios del formulario y registrar el pago
   * @param event Evento generado por el boton del formulario
   */
  const validarFormulario = async (event) => 
  {
    event.preventDefault();
    event.target.className += " was-validated";

    //Valida que los campos obligatorios esten diligenciados
    if (event.target.checkValidity()) 
    {
      try
      {
        //Se valida a traves del api-rest si el token es válido
        let {status, clienteBD} = await clienteServices.getCliente();

        switch (status)
        {
          case Constantes.STATUS_OK:
            let {resultadoTransaccion} = await pagoServices.registrarPagoTC({ numeroTarjeta, mesCaducidad, añoCaducidad, titularTarjeta, numeroCVV, clienteBD });
  
            const location = 
            {
              pathname: '/transaccion',
              state: { resultadoTransaccion }
            }
    
            history.replace(location);
            break;

          case Constantes.STATUS_ACCESO_DENEGADO:
            //Si tiene token es porque estoy logueado y debo informar que la sesión expiro
            if(autenticacionServices.getToken())
            {
              setMensajePopup("Tu sesión ha expirado!!!");
              setMostrarPopup(true);
            }

            autenticacionServices.removerToken();
            break;
    
          default:
            //Valida si hubo un error en el api-rest
            //Si tiene token es porque estoy logueado y debo informar que hubo un error en el backend
            if(autenticacionServices.getToken())
            {
              setMensajePopup("En el momento no es posible realizar la\ntransacción, favor intentarlo en unos minutos.");
              setMostrarPopup(true);
            }
            break;
        };
      }
      catch(error)
      {
        setMensajePopup("En el momento no es posible realizar la\ntransacción, favor intentarlo en unos minutos.");
        setMostrarPopup(true); 
      }
    }
  }


  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
    setTokenValido(false);
  }


  return (
    isTokenValido ?
    <div>
      <Header height={"none"}/>

      <div className="container d-flex flex-column pt-4 bgg-info">
        <h3 className="font-weight-bolder">INTRODUCE LOS DATOS DE TU TARJETA</h3>

        <img className="mt-5 img_border_acuatex" src={require("../../assets/mastercard.png")} alt={"Master Card"} style={{height:55, width:72}}/>

        <div className="my-5 bgg-warning" style={{height:347}}>
          <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>

            <div className="row form-group m-0 bgg-dark" style={{width:"60%"}}>
              <div className="col mt-3 pl-0 bgg-danger">
                <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
                <input type="text" className="form-control" id="numeroTarjeta" placeholderr="Número de tarjeta" required value={numeroTarjeta} onChange={validarNumero} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 bgg-success">
                <label htmlFor="titularTarjeta">Titular de la tarjeta:</label>
                <input type="text" className="form-control" id="titularTarjeta" placeholderr="Titular de la tarjeta" required value={titularTarjeta} onChange={e => setTitularTarjeta(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div> 

            <div className="row form-group m-0 mt-5 bgg-dark" style={{width:"60%"}}>
              <div className="col mt-4 pl-0 bgg-danger">
                <label htmlFor="mesCaducidad">Mes:</label>
                <select className="custom-select" id="mesCaducidad" required value={mesCaducidad} onChange={e => setMesCaducidad(e.target.value)} stylee={{width:"60%"}}>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                </select>
              </div>
              <div className="col mt-4 bgg-info">
                <label htmlFor="añoCaducidad">Año:</label>
                <select className="custom-select" id="añoCaducidad" required value={añoCaducidad} onChange={e => setAñoCaducidad(e.target.value)} stylee={{width:"60%"}}>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="col-sm mt-4 pb-4 bgg-success">
                <label htmlFor="numeroCVV">Número de CVV:</label>
                <input type="text" className="form-control" id="numeroCVV" placeholderr="Número de CVV" required value={numeroCVV} onChange={validarNumero} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>

            <div className="col-sm my-4 py-5 bgg-success" > </div>

            <FooterPagos paginaSiguiente={"/"} paginaAnterior={"/metodos_pago"} siguiente={null} textoBoton={"PAGAR"}/>

          </form>
        </div>
      </div>
      
      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>  
    :
    <Redirect to={"/articulos"} />
    );
}

export default PagoTarjetaCredito;