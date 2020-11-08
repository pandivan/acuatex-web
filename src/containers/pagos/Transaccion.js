import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// import Header from "../../components/Header";



function Transaccion(props) 
{
  const [mensajes] = useState("");
  
  let location = useLocation();

  // console.log(mensaje);


  return (
    
      <div>
        <h1>Transaccion {location.state.mensaje} {mensajes}</h1>
      </div>
    
  );
}

export default Transaccion;