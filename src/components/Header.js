import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import autenticacionServices from "../services/AutenticacionServices"; 



/**
 * Funcion que permite renderizar el header en cada pantalla
 * @param props Recibe como parametros el height y el fondo del header
 */
function Header(props)
{
  const [isLogeado, setLogueado] = useState(false);
  const [nombreCliente, setNombreCliente] = React.useState("");



  useEffect(() =>
	{
    console.log("Header");
		try
		{
      let token = autenticacionServices.getToken();

      if(token)
      {
        setLogueado(true);
        // setNombreCliente(cliente.nombres.split(" ")[0]);
        setNombreCliente("Cuenta");
      }
		}
		catch(error)
		{
			setLogueado(false);
		}
  }, [])


  let headerStyle =
  {
    height: props.height,
    backgroundImage: (undefined === props.fondo || "" === props.fondo ? "" : "url(" + require("../assets/"+ props.fondo + ".png") + ")")
  }


  return (
    <nav className="navbar navbar-expand-sm align-items-start py-4 bgg-dark" style={headerStyle}>
      <ul className="navbar-nav mr-auto bgg-success">
        <li className="mr-3">
          <Link to="/articulos" className="nav-link text-secondary font_size_navbar_acuatex">Articulos</Link>
        </li>
        <li className="mr-3">
          <Link to="/estilos" className="nav-link text-secondary font_size_navbar_acuatex">Estilos</Link>
        </li>
      </ul>

      <h2 className="navbar-nav mr-auto justify-content-center text-white-505 bgg-info">
        {props.titulo}
      </h2>

      <div className="bgg-danger">
          <Link to={isLogeado ? "/ajustes" : "/login"} className="nav-link text-secondary font_size_navbar_acuatex">{isLogeado ? nombreCliente : "Iniciar Sesión"}</Link>
      </div>

      {
        isLogeado ? 
        <div className="bgg-info">
            <Link to="/pedidos" className="nav-link text-secondary font_size_navbar_acuatex">Mis Pedidos</Link>
        </div>
        :
        null
      }

      <div className="mr-3 bgg-dark">
          <Link to="/carrito" className="nav-link text-secondary pt-0 font_size_navbar_acuatex">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="badge badge-pill badge-danger">{0 === JSON.parse(localStorage.getItem("@cantidadBadge")) ? null : JSON.parse(localStorage.getItem("@cantidadBadge"))}</span>
          </Link>
      </div>


      <div className="mr-3 bgg-warning">
        <img src={require("../assets/11.png")} alt="Logo" style={{width: 46}} />
      </div>
    </nav>
  );
}

export default Header;
