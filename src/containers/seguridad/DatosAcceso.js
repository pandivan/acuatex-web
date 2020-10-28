import React, { useState } from "react";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";

import clienteServices from "../../services/ClienteServices"; 
import Constantes from "../../Constantes";





/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function DatosAcceso() 
{
  const [nuevoCorreo, setNuevoCorreo] = useState("ivan@gmail.com");
  const [repetirCorreo, setRepetirCorreo] = useState("ivan@gmail.com");
  const [clave, setClave] = useState("12345");
  const [nuevaClave, setNuevaClave] = useState("");
  const [repetirClave, setRepetirClave] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [cliente, setCliente] = useState(JSON.parse(localStorage.getItem("@cliente")));


  
  console.log("DatosAcceso...")



  /**
   * Función que permite cambiar el correo del cliente
   * @param event Evento que se genera al enviar el formulario
   */
  const actualizarCorreo = async (event) => 
  {
    let mensaje = "Las cuenta de correo no coinciden.";

    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      if(nuevoCorreo === repetirCorreo)
      {
        cliente.claveIngresada = clave;
        cliente.nuevoCorreo = nuevoCorreo;
        
        let { status, clienteBD } = await clienteServices.actualizarCliente(cliente);

        if(Constantes.STATUS_OK === status)
        {
          if("" === clienteBD)
          {
            //Fallo validando la contraseña actual digitada
            mensaje = "La contraseña actual no es correcta. Es necesario\nque indiques tu contraseña actual para poder\ncambiar la cuenta de correo.";
          }
          else
          {
            //El cliente se actualizo exitosamente y se guarda token en AsyncStorage
            localStorage.setItem("@cliente", JSON.stringify(clienteBD));
            mensaje = "La cuenta de correo fue actualizada correctamente.";

            setCliente(clienteBD);
          }
        }
        else
        {
          //Valida si hubo un error en el api-rest al validar el cliente
          mensaje = "No es posible en el momento actualizar la cuenta de correo,\nfavor intentarlo más tarde.";
        }
      }
      
      setMensajePopup(mensaje);
      setMostrarPopup(true);
    }
  };



  /**
   * Función que permite cambiar el clave del cliente
   * @param event Evento que se genera al enviar el formulario
   */
  const actualizarClave = async (event) => 
  {
    let mensaje = "Las contraseñas de correo no coinciden.";

    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      if(nuevaClave === repetirClave)
      {
        cliente.claveIngresada = clave;
        cliente.nuevaClave = nuevaClave;

        let { status, clienteBD } = await clienteServices.actualizarCliente(cliente);

        if(Constantes.STATUS_OK === status)
        {
          if("" === clienteBD)
          {
            //Fallo validando la contraseña actual digitada
            mensaje = "La contraseña actual no es correcta. Es necesario\nque indiques tu contraseña actual para poder\ncambiarla por una nueva.";
          }
          else
          {
            //El cliente se actualizo exitosamente y se guarda token en AsyncStorage
            localStorage.setItem("@cliente", JSON.stringify(clienteBD));
            mensaje = "Contraseña actualizada correctamente";
          }
        }
        else
        {
          //Valida si hubo un error en el api-rest al validar el cliente
          mensaje = "En el momento no es posible actualizar la contraseña,\nfavor intentarlo más tarde.";
        }
      }

      setMensajePopup(mensaje);
      setMostrarPopup(true);
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
    <div className="bgg-info">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="d-flex justify-content-center p-0 mt-5 bgg-warning">
        <div>
          <h3 className="font-weight-bolder">DATOS DE ACCESO</h3>

          <div className="mt-5 bgg-warning">
            <h5 className="font-weight-bolder">Cambio de dirección de correo electrónico</h5>
              <h6>Si deseas cambiar la dirección de correo electrónico asociada a tu cuenta rellena los campos siguientes. Se solicita tu contraseña por motivos de seguridad.</h6>
              
              <p>Tu correo actual es <span className="font-weight-bold">{cliente.correo}</span></p>
          </div>

          <form className="needs-validation pb-5 bgg-warning" onSubmit={actualizarCorreo} style={{width:"66%"}} noValidate>
            <div className="row form-group">
              <div className="col mt-3">
                <label htmlFor="pwd">Contraseña Actual</label>
                <input type="password" className="form-control" id="pwd" placeholderr="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
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
                <input type="correo" className="form-control" id="nuevoCorreo" placeholderr="Nuevo correo" required value={nuevoCorreo} onChange={e => setNuevoCorreo(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 ml-4 pl-4 pr-0 bgg-info">
                <label htmlFor="repetirCorreo">Repetir correo</label>
                <input type="correo" className="form-control" id="repetirCorreo" placeholderr="Repetir correo" required value={repetirCorreo} onChange={e => setRepetirCorreo(e.target.value)} />
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
              <p>Tu correo actual es <span className="font-weight-bold">{cliente.correo}</span></p>    
          </div>
          <form className="needs-validation bgg-warning" onSubmit={actualizarClave} style={{width:"66%"}} noValidate>
            <div className="row form-group">
              <div className="col mt-3">
                <label htmlFor="pwd">Contraseña Actual</label>
                <input type="password" className="form-control" id="pwd" placeholderr="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
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
                <input type="password" className="form-control" id="nuevaClave" placeholderr="Nueva Contraseña" required value={nuevaClave} onChange={e => setNuevaClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3 ml-4 pl-4 pr-0 bgg-info">
                <label htmlFor="repetirClave">Repetir contraseña</label>
                <input type="password" className="form-control" id="repetirClave" placeholderr="Repetir Contraseña" required value={repetirClave} onChange={e => setRepetirClave(e.target.value)} />
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
  );
}



export default DatosAcceso;