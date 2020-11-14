import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";

import clienteServices from "../../services/ClienteServices"; 
import Constantes from "../../Constantes";



/**
 * Componente funcion que permite loguearse a la plataforma
 */
function Login(props) 
{
  const [isTokenValido, setTokenValido] = useState(false);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 
  
    


  useEffect(() => 
	{
		console.log("useEffect Loguin");

		try
		{
      let token = JSON.parse(localStorage.getItem("@cliente"));
      
      if(null !== token)
      {
        setTokenValido(true);
      }
		}
		catch(error)
		{
			setTokenValido(false);
		}
  }, [])




  /**
   * Función que permite validar el usuario en BD a traves de API-REST
   * @param event Evento que se genera al enviar el formulario
   */
  const validarFormulario = async (event) => 
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      let {status, clienteBD} = await clienteServices.validarCliente({ correo, clave });

      switch (status) 
      {
        case Constantes.STATUS_OK:
          //El cliente se registro exitosamente y se guarda token en AsyncStorage
          localStorage.setItem("@cliente", JSON.stringify(clienteBD));
          history.goBack();
          break;

        case Constantes.STATUS_UNAUTHORIZED:
          //El correo y clave no son validos
          setMensajePopup("Lo sentimos. No hay ninguna cuenta de usuario\nque coincida con el Correo y Contraseña\nproporcionados.\n\nSi no recuerdas tu contraseña utiliza el enlace\n¿Has olvidado tu contraseña?\n\nSi deseas crear una cuenta de usuario nueva,\nutiliza el botón Crear cuenta.");
          setMostrarPopup(true);
          break;
        
        default:
          //Valida si hubo un error en el api-rest al validar el cliente
          setMensajePopup("En el momento no es posible validar el usuario,\nfavor intentarlo más tarde.");
          setMostrarPopup(true);
          break;
      }
    }
  };



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }



  
  return (
    isTokenValido ?
    <Redirect to={"/articulos"} />  
    :
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container-sm d-flex justify-content-center mt-5 pt-4 bgg-dark" >
        <div className="container mr-4 bgg-info" style={{width:"32%"}}>
          <h2>INICIA SESIÓN</h2>
          <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>
            <div className="form-group mt-5">
              <label htmlFor="correo">E-mail:</label>
              <input type="correo" className="form-control" id="correo" placeholder="E-mail" name="correo" required value={correo} onChange={e => setCorreo(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Contraseña:</label>
              <input type="password" className="form-control" id="pwd" placeholder="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="form-group py-2">
                ¿Has olvidado tu contraseña?
            </div>
            <button type="submit" className="btn btn-lg btn-block mt-4 btn-dark">INICIAR SESIÓN</button>
          </form>
        </div>
      
        <div className="container ml-4 bgg-warning" style={{width:"32%"}}>
          <h2 className="pb-4">REGÍSTRATE</h2>
          <p className="pb-3">
            Si todavía no tienes una cuenta de usuario de acuatex.com utiliza esta opción para acceder al formulario de registro.
            Te solicitaremos la información imprescindible para agilizar el proceso de compra.
          </p>
          <Link to="/registro" className="nav-link p-0">
            <button type="button" className="btn btn-lg btn-block mt-4 btn-dark">CREAR CUENTA</button>
          </Link>
        </div>
      </div>
    
      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"DATOS DE ACCESO NO VÁLIDOS"} />
      }
    </div>
  );
}

export default Login;
