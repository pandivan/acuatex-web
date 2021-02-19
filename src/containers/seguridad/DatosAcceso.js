import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import autenticacionServices from "../../services/AutenticacionServices";
import clienteServices from "../../services/ClienteServices";
import Constantes from "../../Constantes";





/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function DatosAcceso()
{
  const [isTokenValido, setTokenValido] = useState(autenticacionServices.getToken() ? true : false);
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [repetirCorreo, setRepetirCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [repetirClave, setRepetirClave] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [correo, setCorreo] = useState("");




  useEffect(() =>
	{

    console.log("useEffect DatosAcceso");

    /**
     * Metodo que permite cargar información inicial desde el API-REST
     */
    const cargarInformacion = async () =>
    {
      try
      {
        //Se obtiene el correo del cliente a traves del api-rest
        let {status, correoBD} = await clienteServices.getCorreoCliente();

        switch (status)
        {
          case Constantes.STATUS_OK:
            setCorreo(correoBD);
            break;

          case Constantes.STATUS_ACCESO_DENEGADO:
            
            //Si tiene token es porque estoy logueado y debo informar que la sesión expiro
            if(autenticacionServices.getToken())
            {
              alert("Tu sesión ha expirado!!!");
            }
            
            autenticacionServices.logout();
            setTokenValido(false);
            break;

          default:
            //Valida si hubo un error en el api-rest
            //Si tiene token es porque estoy logueado y debo informar que hubo un error en el backend
            if(autenticacionServices.getToken())
            {
              setMensajePopup("En el momento no es posible acceder a la\ninformación, favor intentarlo más tarde.");
              setMostrarPopup(true);
            }
            break;
        }
      }
      catch (error)
      {
        //TODO: Guardar log del error en BD
        console.log("error")
      }
    };

    cargarInformacion();
  }, [])



  /**
   * Función que permite cambiar el correo del cliente
   * @param event Evento que se genera al enviar el formulario
   */
  const actualizarCorreo = async (event) =>
  {
    event.preventDefault();
    event.target.className += " was-validated";

    //Se valida campos obligatorios del formulario
    if (event.target.checkValidity())
    {
      if(nuevoCorreo === repetirCorreo)
      {
        let cliente =
        {
          claveIngresada: clave,
          nuevoCorreo,
          token: autenticacionServices.getToken()
        };

        //Se llama al api-res para actualizar datos del cliente
        let { status, clienteBD } = await clienteServices.actualizarDatosAccesoCliente(cliente);

        switch (status)
        {
          case Constantes.STATUS_OK:
            autenticacionServices.setTokenLocalStorage(clienteBD.token);
            setCorreo(clienteBD.correo);
            setMensajePopup("La cuenta de correo fue actualizada correctamente.");
            setMostrarPopup(true);
            break;

          case Constantes.STATUS_CREATED:
            setMensajePopup("La dirección de correo especificada\n(" + nuevoCorreo + ")\nya está siendo utilizada. Por favor, elige otra.");
            setMostrarPopup(true);
            break;

          case Constantes.STATUS_NO_CONTENT:
            //Fallo validando la contraseña actual digitada
            setMensajePopup("La contraseña actual no es correcta. Es necesario\nque indiques tu contraseña actual para poder\ncambiar la cuenta de correo.");
            setMostrarPopup(true);
            break;

          case Constantes.STATUS_ACCESO_DENEGADO:
            autenticacionServices.logout();
            alert("Tu sesión ha expirado!!!");
            setTokenValido(false);
            break;

          default:
            //Valida si hubo un error en el api-rest
            setMensajePopup("En el momento no es posible actualizar la cuenta\nde correo, favor intentarlo más tarde.");
            setMostrarPopup(true);
            break;
        }
      }
      else
      {
        setMensajePopup("Las cuentas de correo no coinciden.");
        setMostrarPopup(true);
      }
    }
  };



  /**
   * Función que permite cambiar el clave del cliente
   * @param event Evento que se genera al enviar el formulario
   */
  const actualizarClave = async (event) =>
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity())
    {
      if(nuevaClave === repetirClave)
      {
        let cliente =
        {
          claveIngresada: clave,
          nuevaClave,
          token: autenticacionServices.getToken()
        };

        let { status } = await clienteServices.actualizarDatosAccesoCliente(cliente);


        switch (status)
        {
          case Constantes.STATUS_OK:
            setMensajePopup("Contraseña actualizada correctamente");
            setMostrarPopup(true);
            break;

          case Constantes.STATUS_NO_CONTENT:
            //Fallo validando la contraseña actual digitada
            setMensajePopup("La contraseña actual no es correcta. Es necesario\nque indiques tu contraseña actual para poder\ncambiarla por una nueva.");
            setMostrarPopup(true);
            break;

          case Constantes.STATUS_ACCESO_DENEGADO:
            autenticacionServices.logout();
            alert("Tu sesión ha expirado!!!");
            setTokenValido(false);
            break;

          default:
            //Valida si hubo un error en el api-rest
            setMensajePopup("En el momento no es posible actualizar la\ncontraseña, favor intentarlo más tarde.");
            setMostrarPopup(true);
            break;
        }
      }
      else
      {
        setMensajePopup("Las contraseñas de correo no coinciden.");
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
    <div className="bgg-info">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="d-flex justify-content-center p-0 mt-5 bgg-warning">
        <div>
          <h3 className="font-weight-bolder">DATOS DE ACCESO</h3>

          <div className="mt-5 bgg-warning">
            <h5 className="font-weight-bolder">Cambio de dirección de correo electrónico</h5>
              <h6>Si deseas cambiar la dirección de correo electrónico asociada a tu cuenta rellena los campos siguientes. Se solicita tu contraseña por motivos de seguridad.</h6>

              <p>Tu correo actual es <span className="font-weight-bold">{correo}</span></p>
          </div>

          <form className="needs-validation pb-5 bgg-warning" onSubmit={actualizarCorreo} style={{width:"66%"}} noValidate>
            <div className="row form-group">
              <div className="col mt-3">
                <label htmlFor="txtClaveCorreo">Contraseña Actual</label>
                <input type="password" className="form-control" id="txtClaveCorreo" placeholderr="Contraseña" required value={clave} onChange={e => setClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-5 mr-4">
                
              </div>
            </div>


            <div className="row form-group mt-5 bgg-warning">
              <div className="col mt-3 bgg-success">
                <label htmlFor="nuevoCorreo">Nuevo correo</label>
                <input type="correo" className="form-control" id="nuevoCorreo" placeholderr="Nuevo correo" maxLength="50" required value={nuevoCorreo} onChange={e => setNuevoCorreo(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 ml-4 pl-4 pr-0 bgg-info">
                <label htmlFor="repetirCorreo">Repetir correo</label>
                <input type="correo" className="form-control" id="repetirCorreo" placeholderr="Repetir correo" maxLength="50" required value={repetirCorreo} onChange={e => setRepetirCorreo(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>

            <div className="row form-group mt-3">
              <div className="col">
                <button type="submit" className="btn p-2 mt-4 btn-dark" style={{width:190}} >ACTUALIZAR EMAIL</button>
              </div>
            </div>
          </form>


          <div className="mt-5 pt-4 separacion_datos_acuatex border-bottom-0 border-right-0 border-left-0 bgg-danger">
            <h5 className="font-weight-bolder mt-5">Cambio de contraseña</h5>
              <h6>Si deseas cambiar la contraseña de acceso a tu cuenta proporciona la siguiente información:</h6>
              <p>Tu correo actual es <span className="font-weight-bold">{correo}</span></p>
          </div>
          <form className="needs-validation bgg-warning" onSubmit={actualizarClave} style={{width:"66%"}} noValidate>
            <div className="row form-group">
              <div className="col mt-3">
                <label htmlFor="txtClave">Contraseña Actual</label>
                <input type="password" className="form-control" id="txtClave" placeholderr="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-5 mr-4">
                
              </div>
            </div>


            <div className="row form-group mt-5 bgg-warning">
              <div className="col mt-3 bgg-success">
                <label htmlFor="nuevoClave">Nueva contraseña</label>
                <input type="password" className="form-control" id="nuevaClave" placeholderr="Nueva Contraseña" maxLength="10" required value={nuevaClave} onChange={e => setNuevaClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 ml-4 pl-4 pr-0 bgg-info">
                <label htmlFor="repetirClave">Repetir contraseña</label>
                <input type="password" className="form-control" id="repetirClave" placeholderr="Repetir Contraseña" maxLength="10" required value={repetirClave} onChange={e => setRepetirClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>

            <div className="row form-group mt-3">
              <div className="col">
                <button type="submit" className="btn py-2 mt-4 btn-dark" style={{width:233}}>ACTUALIZAR CONTRASEÑA</button>
              </div>
            </div>

            <br /><br />

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



export default DatosAcceso;