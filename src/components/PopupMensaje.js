import React from "react";


/**
 * Componente popup de mensajes
 * @param props parametros enviados al componente [Titulo, Mensaje, Metodo Cerrar]
 */
function PopupMensaje(props)
{

  return (
    <div className="popup-box" id="myModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3" style={{width:"80%"}}>

          <div className="modal-header border-0">
            <h4 className="modal-title"><small className="font-weight-bold">{props.titulo}</small></h4>
            <button type="button" className="close" onClick={props.togglePopup}>&times;</button>
          </div>

          <div className="modal-body">
            <small>

            <pre className="bgg-warning">
              {props.mensaje}
            </pre>
            </small>
          </div>
          
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-dark btn-block" onClick={props.togglePopup}>CERRAR</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
 
export default PopupMensaje;