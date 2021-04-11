import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";

import autenticacionServices from "../../services/AutenticacionServices";
import Constantes from "../../Constantes";



/**
 * Componente funcion que permite enviar las instrucciones al correo electronico para restaurar la clave del cliente
 */
function RestaurarClave()
{
  const [isTokenValido] = useState(autenticacionServices.getToken());
  const [correo, setCorreo] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");




  /**
   * Función que permite enviar las instrucciones de recuperación de clave al correo electronico del cliente a traves de API-REST
   * @param event Evento que se genera al enviar el formulario
   */
  const validarFormulario = async (event) =>
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity())
    {
      let {status} = await autenticacionServices.restaurarClave(correo);

      switch (status)
      {
        case Constantes.STATUS_OK:
          //El correo y clave no son validos
          setMensajePopup("Se ha recibido correctamente la solicitud.\nValida tu correo y sigue las instrucciones.");
          setMostrarPopup(true);
          break;

        default:
          //Valida si hubo un error en el api-rest
          setMensajePopup("En el momento no es posible recupear tu\ncontraseña, favor intentarlo más tarde.");
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
      
      <div className="d-flex justify-content-center bgg-secondary mb-3">
        <div className="d-flex flex-column bgg-danger">
          <h2 className="mt-5 bgg-info">HAZ OLVIDADO TU CONTRASEÑA ?</h2>

          <form className="needs-validation mt-4 bgg-info" onSubmit={validarFormulario} noValidate>
            <div className="form-group">
              <label>Si has olvidado tu contraseña, proporciona tu correo electrónico</label>
              <br />
              <label>y te enviaremos un email con instrucciones de cómo recuperarla.</label>
            </div>

            <div className="form-group mt-4">
              <label htmlFor="correo">E-mail:</label>
              <input type="correo" className="form-control" id="correo" placeholder="E-mail" name="correo" required value={correo} onChange={e => setCorreo(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>

            <button type="submit" className="btn btn-lg mt-4 btn-dark">RECUPERAR CONTRASEÑA</button>
          </form>
        </div>
      </div>

      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"SOLICITUD REALIZADA"} />
      }
    </div>
  );
}

export default RestaurarClave;
