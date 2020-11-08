import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import FooterPagos from "../../components/FooterPagos";
import PopupMensaje from "../../components/PopupMensaje";
import pagoServices from "../../services/PagoServices"; 



/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function PagoTarjetaCredito() 
{
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
		console.log("useEffect Tarjeta Credito");


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
  

  
  /**
   * Función que permite enviar los datos a la pasarela de pago
   */
  const pagar = async () =>
  {
    try
    {
      let {mensaje} = await pagoServices.registrarPagoTC({ numeroTarjeta, mesCaducidad, añoCaducidad, titularTarjeta, numeroCVV });

      const location = 
      {
        pathname: '/transaccion',
        state: { mensaje }
      }

      history.replace(location);
    }
    catch(error)
    {
      setMensajePopup("En el momento no es posible registrar el pago.");
      setMostrarPopup(true); 
    }
  }



  /**
   * Función que permite validar y registrar un pago
   * @param event Evento generado por el boton del formulario
   */
  const validarFormulario = (event) => 
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      console.log("pasoo")
    }
  }



  return (
    <div>
      <Header height={"none"}/>

      <div className="container d-flex flex-column pt-4 bgg-info">
        <h3 className="font-weight-bolder">INTRODUCE LOS DATOS DE TU TARJETA</h3>

        <img className="mt-5 img_border_acuatex" src={require("../../assets/mastercard.png")} alt={"Master Card"} style={{height:55, width:72}}/>

        <div className="my-5 bgg-warning" style={{height:347}}>
          <form className="needs-validation bg-warning" onSubmit={validarFormulario} noValidate>

            <div className="row form-group m-0 bg-dark" style={{width:"60%"}}>
              <div className="col mt-3 pl-0 bg-danger">
                <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
                <input type="text" className="form-control" id="numeroTarjeta" placeholderr="Número de tarjeta" required value={numeroTarjeta} onChange={e => setNumeroTarjeta(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 bg-success">
                <label htmlFor="titularTarjeta">Titular de la tarjeta:</label>
                <input type="text" className="form-control" id="titularTarjeta" placeholderr="Titular de la tarjeta" required value={titularTarjeta} onChange={e => setTitularTarjeta(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div> 
          

            <div className="row form-group m-0 mt-5 bg-dark" style={{width:"60%"}}>
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
              <div className="col-sm mt-4 bgg-success">
                <label htmlFor="numeroCVV">Número de CVV:</label>
                <input type="text" className="form-control" id="numeroCVV" placeholderr="Número de CVV" required value={numeroCVV} onChange={e => setNumeroCVV(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>
            
            

            {/* <div className="col-sm my-4 py-5 bgg-success" > .</div> */}

            <FooterPagos paginaSiguiente={"/"} paginaAnterior={"/metodos_pago"} siguiente={pagar} textoBoton={"PAGAR"}/>

          </form>
        </div>
      
        {/* <FooterPagos paginaSiguiente={"/"} paginaAnterior={"/metodos_pago"} siguiente={pagar} textoBoton={"PAGAR"}/> */}
      </div>
      
      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>  
    );
}

export default PagoTarjetaCredito;