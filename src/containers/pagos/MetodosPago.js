import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import FooterPagos from "../../components/FooterPagos";
import PopupMensaje from "../../components/PopupMensaje";



/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function MetodosPago() 
{
  const [tipoPago, setTipoPago] = useState("TC");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 


  useEffect(() => 
	{
		console.log("useEffect Metodos de Pago");


    let cantidadBadge = JSON.parse(localStorage.getItem("@cantidadBadge"));

    if(null === cantidadBadge)
    {
      history.push("/");
    }
  }, [history]);



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }



  const continuar = () =>
  {
    if("" === tipoPago)
    {
      setMensajePopup("Debes seleccionar una forma de pago.\nHaz click sobre uno de los iconos para\nescoger la forma de pago que prefieras.");
      setMostrarPopup(true);
    }
    else
    {
      let urlSiguiente = "/pago_tarjeta_credito";

      if("PSE" === tipoPago)
      {
        urlSiguiente = "/pago_pse";
      }

      history.push(urlSiguiente);
    }
  }


  return (
    <div>
      <Header height={"none"}/>

      <div className="container d-flex flex-column pt-4 bgg-info">
       
        {/* <h3 className="font-weight-boldR" stye={{fontFamily:"Titillium Web, sans-serif"}} >ELIGE UN MÉTODO DE PAGO</h3> */}
        <h3 className="font-weight-bolder" >ELIGE UN MÉTODO DE PAGO</h3>
       
        <div className="my-5 bgg-warning" style={{height:450}}>
          <button className="mr-4 mb-4 p-1 btn btn-primary" >
            <img src={require("../../assets/mastercard.png")} alt={"Master Card"} style={{height:100, width:100}} onClick={() => setTipoPago("TC")}/>
          </button>
          <button className="mr-4 mb-4 p-1 btn btn-dark" >
            <img src={require("../../assets/visa.png")} alt={"Visa"} style={{height:100, width:100}} onClick={() => setTipoPago("TC")}/>
          </button>
          <button className="mr-4 mb-4 p-0 btn btn-dark" >
            <img src={require("../../assets/pse.png")} alt={"PSE"} style={{height:100, width:100}} onClick={() => setTipoPago("PSE")}/>
          </button>
        </div>

        <FooterPagos paginaAnterior={"/carrito"} siguiente={continuar} textoBoton="CONTINUAR"/>
      </div>

      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>
  );
}

export default MetodosPago;