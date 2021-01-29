import * as React from "react";

import { Link, useHistory } from "react-router-dom";

import Header from "../../components/Header";
import autenticacionServices from "../../services/AutenticacionServices"; 




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function Ajustes()
{
  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory();



  const desconectar = () =>
  {
    autenticacionServices.logout();
    history.push("/");

    // TODO: Limpiar history
  }



  return (
    <div className="bgg-info">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="d-flex justify-content-center p-0 mt-5 bgg-warning">
        <div>
          <h3 className="font-weight-bolder">MI CUENTA</h3>

          <div className="mt-5 bgg-danger">
            <Link to="/pedidos" className="text-dark"><h5 className="font-weight-bolder m-0">Mis Pedidos</h5></Link>
            <small>Consulta la información y el estado de tus pedidos online. También puedes cancelar el pedido o solicitar una devolución.</small>
          </div>

          <div className="mt-5 bgg-danger">
            <Link to="/usuario/informacion-personal" className="text-dark"><h5 className="font-weight-bolder m-0">Datos personales</h5></Link>
            <small>Podrás acceder y modificar tus datos personales (nombre, dirección de facturación, teléfono,...) para facilitar tus futuras compras y notificarnos cambios en tus datos de contacto.</small>
          </div>

          <div className="mt-5 bgg-danger">
            <Link to="/usuario/cuenta/datos-acceso" className="text-dark"><h5 className="font-weight-bolder m-0">Datos de acceso</h5></Link>
            <small>Podrás cambiar tus datos de acceso (correo y contraseña). Recuerda que la seguridad de tus datos personales es importante, debes utilizar una contraseña segura y cambiarla periódicamente.</small>
          </div>

          <div className="mt-5 bgg-danger">
            <button type="button" className="btn btn-link font_color_link_acuatex p-0 m-0" onClick={desconectar}><h5 className="font-weight-bolder m-0">Cerrar Sesión</h5></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajustes;