import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import clienteServices from "../../services/ClienteServices"; 




/**
 * Componente funcion que permite loguearse a la plataforma
 */
function Login(props) 
{
  const [isTokenValido, setTokenValido] = useState(false);
  const [login, setLogin] = useState("ivan.hernandez.coral@gmail.com");
  const [password, setPassword] = useState("Cusito");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  // const [isMostrar, setIsMostrar] = useState(false);

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 
  let mensaje = "";
  
    


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
      try 
      {
        let {success, cliente} = await clienteServices.validarCliente({ login, password });
        
        if(success)
        {
          // console.log("Iniciando sesion: ".concat(cliente.tipoCliente));
          //Gurdando token en AsyncStorage...
          localStorage.setItem("@cliente", JSON.stringify(cliente));

          history.goBack();
        }
        else
        {
          mensaje = "Lo sentimos. No hay ninguna cuenta de usuario\nque coincida con el Email y Contraseña\nproporcionados.\n\nSi no recuerdas tu contraseña utiliza el enlace\n¿Has olvidado tu contraseña?\n\nSi deseas crear una cuenta de usuario nueva,\nutiliza el botón Crear cuenta.";
          setMensajePopup(mensaje);
          setMostrarPopup(true);
        }
      } 
      catch (error) 
      {
        mensaje = "En el momento no es posible validar el usuario, favor intentarlo más tarde.";
        setMensajePopup(mensaje);
        setMostrarPopup(true);
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
    <Redirect to={"/productos"} />  
    :
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container-sm d-flex justify-content-center mt-5 pt-4 bgg-dark" >
        <div className="container mr-4 bgg-info" style={{width:"32%"}}>
          <h2>INICIA SESIÓN</h2>
          <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>
            <div className="form-group mt-5">
              <label htmlFor="email">E-mail:</label>
              <input type="email" className="form-control" id="email" placeholder="E-mail" name="email" required value={login} onChange={e => setLogin(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Contraseña:</label>
              <input type="password" className="form-control" id="pwd" placeholder="Contraseña" name="pswd" required value={password} onChange={e => setPassword(e.target.value)} />
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
